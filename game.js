// Setting up game global variables
var game_started = false; // Should not change after made true
var can_move = true;
var develop_mode = false;
//localStorage.clear();

var default_equipment = {weapon:{name:"Fists", use:"weapon", damage:10}, armour:{name:"Cloth", use:"armour", resistance:1}};
var max_health = 200;

var environment;
ClearEnvironment(); // Initialize environment

var world_environments = [];
var world_map = "" +

"^^^^^^^^^^^^^^<br>" +
"^#######~~~~~~<br>" +
"^#..###~~~~~~~<br>" +
"^#...##~~~~~~~<br>" +
"^....###~~~~~~<br>" +
"^........~~~~~<br>" +
"^.........~~~~<br>" +
"^..........~~~<br>" +
"^........../~~<br>" +
"^###....///.~~<br>" +
"^#####//.....~<br>";

var map;

var move_speed = 100;
var character = {x:null, y:null};
var interact_place = {x:null, y:null};

// Movement Variables
var move = {up:null, left:null, right:null, down:null};
var move_direction = {up:false, left:false, right:false, down:false};

var box = {title:"", list:[], body:"", current_interaction:null};
var previous_symbol = "";


//Basic Game Functions
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

if (localStorage.getObj("player") === null){
	var player = {health:max_health, level:3, strength:0, speed:0, gold:10, items:[], equipment:default_equipment, quests:[], discovered:[], last_save:{world_loc:{x:2, y:2}, loc:{x:10, y:10}}};
	localStorage.setObj("player", player);
}

// Use when loading new environment
function EmptyEnv(){
	return {name:"", map:"", world_loc:null, ch:"", stores:[], NPCs:[], chests:[], gates:[]};
}

function ClearEnvironment(){
	environment = EmptyEnv();
}

String.prototype.replaceAt=function(index, ch) {
	return this.substr(0, index) + ch + this.substr(index+ch.length);
}

function NullFunction(){}
