// Get variables
const gameContainer = document.querySelector('#game-container');
const gameTitle = document.querySelector('#game-title');
const startBtn = document.querySelector('#start-btn');
const dialogueBox = document.querySelector('#dialogue-box');
const pokemonList = document.querySelector('#pokemon-list');

const clickedAudio = new Audio('https://www.fesliyanstudios.com/play-mp3/387');

// Start Game
startBtn.addEventListener('click', function () {
	clickedAudio.play();
	startGame();
});

function startGame() {
	startBtn.style.display = 'none';
	gameTitle.style.margin = '25px';
	gameTitle.style.fontSize = '20px';

	loadPokemon(enemyPokemon, 'enemy-pokemon');
	loadTrainer();
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
			// console.log(data);

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

// console.log(enemyPokemon);

// Load Initial Battle Screen
function loadPokemon(pokemonArray, pokemonClass) {
	let selectedPokemonIndex = Math.floor(Math.random() * pokemonArray.length);

	let selectedPokemon = pokemonArray[selectedPokemonIndex];

	//
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

	console.log(selectedPokemon.name);
	pokemonName.textContent =
		selectedPokemon.name.slice(0, 1).toUpperCase() +
		selectedPokemon.name.slice(1, selectedPokemon.name.length);

	const pokemonType = document.createElement('p');
	pokemonType.setAttribute('class', 'pokemon-type');
	pokemonType.textContent = selectedPokemon.type;

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
		default:
			pokemonTypeColor = 'grey';
	}

	console.log(pokemonTypeColor);
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

	console.log(pokemonContainer);
	gameContainer.append(pokemonContainer);
}

// Load Trainer
function loadTrainer() {
	const trainerImg = document.createElement('img');
	trainerImg.src = './images/trainer_sprite_0.png';
	trainerImg.setAttribute('class', 'trainer-img');
	gameContainer.append(trainerImg);

	console.log(trainerImg);

	myPokemon.forEach((pokemon) => {
		const pokemonOption = document.createElement('li');
		pokemonOption.textContent =
			pokemon.name.slice(0, 1).toUpperCase() +
			pokemon.name.slice(1, pokemon.name.length);

		pokemonList.append(pokemonOption);
	});

	setTimeout(() => {
		dialogueBox.style.display = 'flex';
	}, 1000);
}
