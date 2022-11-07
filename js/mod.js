let modInfo = {
	name: "The Nullbox Tree",
	id: "nbx",
	author: "NepleDev",

	modFiles: ["layers/row01/word.js", "layers/row02/message.js", "layers/row02/emoji.js", "tree.js"],
	langFiles: ["en-US", "ko-KR"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(2), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1-Dev Build 13",
	name: "Developing...",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1-Dev</h3><br>
		- Just Dev Version.<br>`

let winText = `Congratulation! You finally win NORAN MINUS`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	let isDev = false;

	if(!canGenPoints())
		return new Decimal(0)

	if(!hasUpgrade('w', 11))
		return new Decimal(0)

	let gain = new Decimal(1)

	// Multiply
	let mult = new Decimal(1)
	// Multiply - Layer Effect
	if(player.e.unlocked) gain = gain.times(tmp.e.thinkingEff)
	// Multiply - Upgrade
	if(hasUpgrade('w', 12)) gain = gain.times(2) // Fast Typing
	if(hasUpgrade('w', 14)) gain = gain.times(upgradeEffect('w', 14)); // Autocomplete
	if(hasUpgrade('m', 11)) gain = gain.times(upgradeEffect('m', 11)); // Hello!
	if(hasUpgrade('w', 23)) gain = gain.times(upgradeEffect('w', 23)); // Typing Practice
	if(hasUpgrade('w', 24)) gain = gain.times(upgradeEffect('w', 24)); // Selfmade Disaster

	// Exponent
	let exp = new Decimal(1)
	if(hasUpgrade('w', 33)) exp = exp.times(1.2)

	if(isDev) mult = mult.times(100);

	return gain.times(mult).pow(exp)
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}