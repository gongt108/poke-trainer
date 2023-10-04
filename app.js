// Get variables
const gameContainer = document.querySelector('#game-container');
const gameTitle = document.querySelector('#game-title');
const startBtn = document.querySelector('#start-btn');
const dialogueBox = document.querySelector('#dialogue-box');
const question = document.querySelector('#question');
const dialogueList = document.querySelector('#dialogue-list');

const trainerImg = document.createElement('img');

const clickedAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/387');

let enemyPokemonType;

const typeWeakness = {
	ghost: {
		'no effect': ['normal', 'fighting'],
		'not very effective': ['bug', 'poison'],
		'super effective': ['ghost'],
	},
	bug: {
		'no effect': [],
		'not very effective': ['fight', 'grass', 'ground'],
		'super effective': ['fire', 'fighting', 'poison', 'rock'],
	},
	water: {
		'no effect': [],
		'not very effective': ['fire', 'ice', 'water'],
		'super effective': ['electric', 'grass'],
	},
	electric: {
		'no effect': [],
		'not very effective': ['electric', 'flying'],
		'super effective': ['ground'],
	},
	normal: {
		'no effect': ['ghost'],
		'not very effective': [],
		'super effective': ['fighting'],
	},
	poison: {
		'no effect': [],
		'not very effective': ['fight', 'grass', 'poison'],
		'super effective': ['ground', 'bug', 'psychic'],
	},
};

// Start Game
startBtn.addEventListener('click', function () {
	clickedAudio.play();
	startGame();
});

function startGame() {
	startBtn.style.display = 'none';
	gameTitle.style.margin = '25px';
	gameTitle.style.fontSize = '20px';

	loadPokemon(selectEnemyPokemon(), 'enemy-pokemon');
	loadTrainer();
}

function selectEnemyPokemon() {
	let selectedPokemonIndex = Math.floor(Math.random() * enemyPokemon.length);

	return enemyPokemon[selectedPokemonIndex];
}

// Retrieve Pokemon
const myPokemonNames = [
	'charmander',
	'squirtle',
	'bulbasaur',
	'pikachu',
	'pidgey',
	'machop',
];
const enemyPokemonNames = [
	'meowth',
	'ekans',
	'poliwag',
	'haunter',
	'voltorb',
	'caterpie',
];

function fetchPokemon(pokemon, pokemonArray) {
	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			const newPokemon = new Pokemon(
				data.name,
				data.sprites.other['official-artwork'].front_default,
				data.moves.splice(0, 4),
				data.types[0].type.name
			);

			pokemonArray.push(newPokemon);
		})
		.catch((error) => {
			console.log('error fetching data', error);
		});
}

class Pokemon {
	constructor(name, artwork, moves, type) {
		this.name = name;
		this.artwork = artwork;
		this.moves = moves;
		this.type = type;
	}
}

const myPokemon = [];
const enemyPokemon = [];

myPokemonNames.forEach((pokemon) => {
	fetchPokemon(pokemon, myPokemon);
});

enemyPokemonNames.forEach((pokemon) => {
	fetchPokemon(pokemon, enemyPokemon);
});

// Load Initial Battle Screen
function loadPokemon(selectedPokemon, pokemonClass) {
	const pokemonContainer = document.createElement('div');
	pokemonContainer.setAttribute('class', `pokemon-container ${pokemonClass}`);

	// Pokemon Image
	const pokemonImg = document.createElement('img');
	pokemonImg.setAttribute('class', 'pokemon-img');
	pokemonImg.src = selectedPokemon.artwork;

	//Pokemon Stats
	const pokemonStats = document.createElement('div');
	pokemonStats.setAttribute('class', 'pokemon-stats');

	const pokemonName = document.createElement('p');
	pokemonName.setAttribute('class', 'pokemon-name');

	pokemonName.textContent =
		selectedPokemon.name.slice(0, 1).toUpperCase() +
		selectedPokemon.name.slice(1, selectedPokemon.name.length);

	const pokemonType = document.createElement('p');
	pokemonType.setAttribute('class', 'pokemon-type');
	pokemonType.textContent = selectedPokemon.type;
	if (pokemonClass === 'enemy-pokemon') {
		enemyPokemonType = selectedPokemon.type;
	}

	let pokemonTypeColor = 'palegoldrenrod';

	switch (selectedPokemon.type) {
		case 'poison':
			pokemonTypeColor = 'lavender';
			break;
		case 'ghost':
			pokemonTypeColor = 'purple';
			break;
		case 'normal':
			pokemonTypeColor = 'grey';
			break;
		case 'electric':
			pokemonTypeColor = 'palegoldrenrod';
			break;
		case 'water':
			pokemonTypeColor = 'lightskyblue';
			break;
		case 'fire':
			pokemonTypeColor = 'orangered';
			break;
		case 'grass':
			pokemonTypeColor = 'greenyellow';
			break;
		case 'flying':
			pokemonTypeColor = 'skyblue';
			break;
		case 'fighting':
			pokemonTypeColor = 'brown';
			break;
		case 'bug':
			pokemonTypeColor = 'olive';
			break;
		default:
			pokemonTypeColor = 'grey';
	}

	pokemonType.style.backgroundColor = pokemonTypeColor;

	const healthBarContainer = document.createElement('div');
	healthBarContainer.setAttribute('class', 'health-bar-container');
	const hpSpan = document.createElement('span');
	hpSpan.textContent = 'HP';
	const healthBar = document.createElement('div');
	healthBar.setAttribute('class', 'health-bar');

	healthBarContainer.append(hpSpan, healthBar);

	pokemonStats.append(pokemonName, pokemonType, healthBarContainer);
	pokemonContainer.append(pokemonImg, pokemonStats);

	gameContainer.append(pokemonContainer);
}

// Load Trainer
function loadTrainer() {
	trainerImg.src = './images/trainer_sprite_0.png';
	trainerImg.setAttribute('class', 'trainer-img');
	gameContainer.append(trainerImg);

	myPokemon.forEach((pokemon) => {
		const pokemonOption = document.createElement('li');
		pokemonOption.textContent =
			pokemon.name.slice(0, 1).toUpperCase() +
			pokemon.name.slice(1, pokemon.name.length);

		dialogueList.append(pokemonOption);
	});

	setTimeout(() => {
		dialogueBox.style.display = 'flex';
	}, 1000);

	dialogueList.addEventListener('click', function pokemonSelection(event) {
		let selectedPokemon = myPokemon.filter((option) => {
			return option.name === event.target.textContent.toLowerCase();
		});

		loadMyPokemon(selectedPokemon[0]);
		dialogueList.removeEventListener('click', pokemonSelection);
		console.log('still running');
	});
}

// Load my pokemon
let imageIndex = 0;

function loadMyPokemon(selectedPokemon) {
	setTimeout(() => {
		trainerImg.src = `./images/trainer_sprite_${imageIndex}.png`;

		if (imageIndex < 4) {
			loadMyPokemon(selectedPokemon);
			imageIndex++;
		} else {
			trainerImg.style.display = 'none';
			loadPokemon(selectedPokemon, 'my-pokemon');

			dialogueBox.style.height = '80px';
			dialogueBox.style.bottom = '100px';
			question.textContent = 'What move will you pick?';
			dialogueList.style.marginTop = '15px';
			dialogueList.textContent = '';
			selectedPokemon.moves.forEach((move) => {
				console.log(move);
				const moveName = document.createElement('li');
				moveName.textContent = move.move.name;
				dialogueList.append(moveName);
			});

			dialogueList.addEventListener('click', function moveSelection(event) {
				console.log(event.target.textContent);
				getMoveType();
			});
		}
	}, 500);
}

// Attack
function getMoveType() {
	fetch(`https://pokeapi.co/api/v2/move/scratch`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			console.log(data.type.name);
			let moveType = data.type.name;
			attack(moveType);
		})
		.catch((error) => {
			console.log('error fetching data', error);
		});
}

function attack(moveType) {
	console.log(enemyPokemonType);
	if (typeWeakness[enemyPokemonType]['super effective'].includes(moveType)) {
		console.log('found');
	} else if (
		typeWeakness[enemyPokemonType]['not very effective'].includes(moveType)
	) {
		console.log('boo');
	} else if (typeWeakness[enemyPokemonType]['no effect'].includes(moveType)) {
		console.log('try again');
	} else {
		console.log('ehh');
	}
}
