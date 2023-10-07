// Get variables
const gameContainer = document.querySelector('#game-container');
const gameTitle = document.querySelector('#game-title');
const startBtn = document.querySelector('#start-btn');
const dialogueBox = document.querySelector('#dialogue-box');
const question = document.querySelector('#question');
const dialogueList = document.querySelector('#dialogue-list');
const chatBox = document.querySelector('#chat-box');

const trainerImg = document.createElement('img');
const slashImg = document.createElement('img');
slashImg.src = 'images/slash-removebg-preview.png';
slashImg.setAttribute('class', 'slash-effect');

const clickedAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/387');
const battleAudio = new Audio(
	'https://vgmsite.com/soundtracks/pokemon-ruby-sapphire-and-emerald-remastered-soundtrack-gba-gamerip-2002-2005/gkugozdqaf/79.%20Wild%20Battle.mp3'
);
const attackAudio = new Audio(
	'https://vgmsite.com/soundtracks/pokemon-sfx-gen-3-attack-moves-rse-fr-lg/bjxgpmfyyj/Comet%20Punch%201hit.mp3'
);

let myPokemon;
let enemyPokemon;
let enemyPokemonType;
const myPokemonList = [];
const enemyPokemonList = [];

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

myPokemonNames.forEach((pokemon) => {
	fetchPokemon(pokemon, myPokemonList);
});

enemyPokemonNames.forEach((pokemon) => {
	fetchPokemon(pokemon, enemyPokemonList);
});

// Start Game
startBtn.addEventListener('click', function () {
	clickedAudio.play();
	startGame();
});

function startGame() {
	startBtn.style.display = 'none';
	gameTitle.style.margin = '25px';
	gameTitle.style.fontSize = '20px';
	chatBox.style.display = 'flex';

	setTimeout(() => {
		battleAudio.play();
	}, 1000);
	loadPokemon(selectEnemyPokemon(), 'enemy-pokemon');
	loadTrainer();
}

function selectEnemyPokemon() {
	let selectedPokemonIndex = Math.floor(
		Math.random() * enemyPokemonList.length
	);

	return enemyPokemonList[selectedPokemonIndex];
}

class Pokemon {
	constructor(name, artwork, moves, type) {
		this.name = name;
		this.artwork = artwork;
		this.moves = moves;
		this.type = type;
	}
}

// Load Initial Battle Screen
function loadPokemon(selectedPokemon, pokemonClass) {
	const pokemonContainer = document.createElement('div');
	pokemonContainer.setAttribute('class', `pokemon-container ${pokemonClass}`);

	// Pokemon Image
	const pokemonImgContainer = document.createElement('div');
	pokemonImgContainer.setAttribute('class', 'pokemon-img-container');
	const pokemonImg = document.createElement('img');
	pokemonImg.setAttribute('class', 'pokemon-img');
	pokemonImg.src = selectedPokemon.artwork;
	pokemonImgContainer.append(pokemonImg);

	//Pokemon Stats
	const pokemonStats = document.createElement('div');
	pokemonStats.setAttribute('class', 'pokemon-stats');

	const pokemonName = document.createElement('p');
	pokemonName.setAttribute('class', 'pokemon-name');
	let name =
		selectedPokemon.name.slice(0, 1).toUpperCase() +
		selectedPokemon.name.slice(1, selectedPokemon.name.length);

	const pokemonType = document.createElement('p');
	pokemonType.setAttribute('class', 'pokemon-type');
	pokemonType.textContent = selectedPokemon.type;
	if (pokemonClass === 'enemy-pokemon') {
		enemyPokemonType = selectedPokemon.type;
		enemyPokemon = name;
		setTimeout(() => {
			question.textContent = `A wild ${enemyPokemon} has appeared`;
		}, 1000);
	} else {
		myPokemon = name;
	}

	pokemonName.textContent = name;

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
	pokemonContainer.append(pokemonImgContainer, pokemonStats);

	gameContainer.append(pokemonContainer);
}

// Load Trainer
function loadTrainer() {
	trainerImg.src = 'images/trainer_sprite_0.png';
	trainerImg.setAttribute('class', 'trainer-img');
	gameContainer.append(trainerImg);

	myPokemonList.forEach((pokemon) => {
		const pokemonOption = document.createElement('li');
		pokemonOption.textContent =
			pokemon.name.slice(0, 1).toUpperCase() +
			pokemon.name.slice(1, pokemon.name.length);

		dialogueList.append(pokemonOption);
	});

	setTimeout(() => {
		question.textContent = 'Which Pokemon will you choose?';
		dialogueBox.style.display = 'flex';
	}, 3000);

	dialogueList.addEventListener('click', function pokemonSelection(event) {
		let selectedPokemon = myPokemonList.filter((option) => {
			return option.name === event.target.textContent.toLowerCase();
		});

		if (selectedPokemon[0]) {
			loadMyPokemon(selectedPokemon[0]);
			dialogueList.removeEventListener('click', pokemonSelection);

			dialogueBox.style.display = 'none';
		}
	});
}

// Load my pokemon
let imageIndex = 0;

function loadMyPokemon(selectedPokemon) {
	setTimeout(() => {
		trainerImg.src = `images/trainer_sprite_${imageIndex}.png`;

		if (imageIndex < 4) {
			loadMyPokemon(selectedPokemon);
			question.textContent = `${selectedPokemon.name}, I choose you!`;

			imageIndex++;
		} else {
			trainerImg.style.display = 'none';
			loadPokemon(selectedPokemon, 'my-pokemon');
			dialogueBox.style.display = 'flex';

			dialogueBox.style.height = '80px';
			dialogueBox.style.bottom = '100px';
			question.textContent = 'What move will you pick?';
			dialogueList.style.marginTop = '15px';
			dialogueList.textContent = '';
			selectedPokemon.moves.forEach((move) => {
				const moveName = document.createElement('li');
				moveName.textContent = move.move.name.split('-').join(' ');
				moveName.className = move.move.name;
				dialogueList.append(moveName);
			});

			dialogueList.addEventListener('click', function moveSelection(event) {
				getMoveType(event.target.className, event.target.textContent);
			});
		}
	}, 500);
}

// Attack
function getMoveType(move, moveName) {
	fetch(`https://pokeapi.co/api/v2/move/${move}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let moveType = data.type.name;
			attack(moveType, moveName);
		})
		.catch((error) => {
			console.log('error fetching data', error);
		});
}

function attack(moveType, moveName) {
	dialogueBox.style.display = 'none';

	const enemyHealthBar = document
		.querySelector('.enemy-pokemon')
		.querySelector('.health-bar');

	const myHealthBar = document
		.querySelector('.my-pokemon')
		.querySelector('.health-bar');

	let damage;
	let enemyDamage = 20;
	let attackMessage = `${enemyPokemon} used SCRATCH.`;

	if (typeWeakness[enemyPokemonType]['super effective'].includes(moveType)) {
		damage = 30;
		question.textContent = `${myPokemon} used ${moveName}. It's super effective!`;
		addAttackAnimation('enemy-pokemon');
	} else if (
		typeWeakness[enemyPokemonType]['not very effective'].includes(moveType)
	) {
		damage = 10;
		enemyDamage = 30;
		question.textContent = `${myPokemon} used ${moveName}. It's not very effective`;
		attackMessage = `${attackMessage} It was a critical hit!`;
		addAttackAnimation('enemy-pokemon');
	} else if (moveName === 'swords dance') {
		damage = 0;
		enemyDamage = 20;
		question.textContent = `${myPokemon} used ${moveName}. ${myPokemon} was buffed.`;
	} else if (typeWeakness[enemyPokemonType]['no effect'].includes(moveType)) {
		damage = 0;
		enemyDamage = 39;
		question.textContent = `${myPokemon} used ${moveName}. It has no effect`;
	} else if (moveName === 'whirlwind') {
		alert('Oops. You blew the wild Pokemon away.');
		endGame();
		return;
	} else {
		damage = 20;
		question.textContent = `${myPokemon} used ${moveName}.`;
		addAttackAnimation('enemy-pokemon');
	}

	enemyHealthBar.style.width =
		enemyHealthBar.offsetWidth - damage > 0
			? `${enemyHealthBar.offsetWidth - damage}px`
			: 0;
	if (enemyHealthBar.offsetWidth <= 0) {
		enemyHealthBar.style.width = '0px';
		let faintedPokemon = document
			.querySelector('.enemy-pokemon')
			.querySelector('.pokemon-img-container')
			.querySelector('.pokemon-img');
		faintedPokemon.className += ' fainted';
		setTimeout(() => {
			alert(`${enemyPokemon} fainted! Good job!`);
			endGame();
			return;
		}, 4000);
	} else {
		setTimeout(() => {
			question.textContent = attackMessage;
			addAttackAnimation('my-pokemon');

			myHealthBar.style.width =
				myHealthBar.offsetWidth - enemyDamage > 0
					? `${myHealthBar.offsetWidth - enemyDamage}px`
					: 0;

			setTimeout(() => {
				if (myHealthBar.offsetWidth <= 0) {
					myHealthBar.style.width = '0px';

					alert(`${myPokemon} fainted! Maybe you should've picked better!`);
					endGame();
					return;
				} else {
					question.textContent = 'What move will you pick?';
					dialogueBox.style.display = 'flex';
				}
			}, 1000);
		}, 2000);
	}
}

function endGame() {
	alert('Play again?');
	location.reload();
}

// Attack animation
function addAttackAnimation(pokemon) {
	attackAudio.play();
	let healthBar = document
		.querySelector(`.${pokemon}`)
		.querySelector('.health-bar-container');
	let pokemonImage = document
		.querySelector(`.${pokemon}`)
		.querySelector('.pokemon-img');

	pokemonImage.parentNode.append(slashImg);
	slashImg.style.animation = 'slashed 1s';

	healthBar.style.animation = 'flicker 0.75s';
	healthBar.style.animationIterationCount = '2';

	pokemonImage.style.animation = 'flicker 0.5s';
	pokemonImage.style.animationIterationCount = '3';

	setTimeout(() => {
		pokemonImage.parentNode.removeChild(slashImg);
		slashImg.style.animation = '';
	}, 1000);
	setTimeout(() => {
		healthBar.style.animation = '';
		pokemonImage.style.animation = '';
	}, 2000);
}
