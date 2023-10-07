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
