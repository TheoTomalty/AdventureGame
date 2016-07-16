Storage.prototype.setObj = function(key, obj) {

	var o = obj || 'Null';
	return this.setItem(key, JSON.stringify(o))
}

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
}

function partial(func /*, 0..n args */) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
	var allArguments = args.concat(Array.prototype.slice.call(arguments));
	return func.apply(this, allArguments);
  };
}

// Setting up game
var game_started = false; // Should not change after made true
var can_move = true;
//localStorage.clear();

var default_equipment = {weapon:{name:"Fists", use:"weapon", damage:10}, armour:{name:"Cloth", use:"armour", resistance:1}};
var max_health = 200;
if (localStorage.getObj("player") === null){
	var player = {health:max_health, level:3, strength:0, speed:0, gold:10, items:[], equipment:default_equipment, quests:[]};
	localStorage.setObj("player", player);
}

var environment;
ClearEnvironment(); // Initialize environment

// Use when loading new environment
function ClearEnvironment(){
	environment = {name:"", stores:[], NPCs:[], chests:[], gates:[]};
}

String.prototype.replaceAt=function(index, ch) {
	return this.substr(0, index) + ch + this.substr(index+ch.length);
}

function NullFunction(){}
