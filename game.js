Storage.prototype.setObj = function(key, obj) {

	var o = obj || 'Null';
	return this.setItem(key, JSON.stringify(o))
}

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
}

// Setting up game
var game_started = false; // Should not change after made true
var can_move = true;
localStorage.clear();
if (localStorage.getObj("player") === null){
	var player = {health:200, level:3, strength:0, speed:0, gold:10, items:[], weapon:null, armour:null, quests:[]};
	localStorage.setObj("player", player);
}
var environment;
ClearEnvironment(); // Initialize environment

// Use when loading new environment
function ClearEnvironment(){
	environment = {name:"", stores:[], NPCs:[], gates:[]};
}

String.prototype.replaceAt=function(index, ch) {
	return this.substr(0, index) + ch + this.substr(index+ch.length);
}

function ContainsObject(obj, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].name === obj.name) {
			return true;
		}
	}
	return false;
}

function NullFunction(){}