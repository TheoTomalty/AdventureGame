Storage.prototype.setObj = function(key, obj) {

	var o = obj || 'Null';
	return this.setItem(key, JSON.stringify(o))
}

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
}

var game_started = false; //Should not change after made true
localStorage.clear();
if (localStorage.getObj("player") === null){
	var player = {level:3, gold:10, attack:0, defence:0, items:[]};
	localStorage.setObj("player", player);
}
// Temporary objects (Change depending on situation)
var map;
var box;
var actions;
ClearActions(); // Initialize actions
var character = {x:null, y:null};

// Movement Variables
var move_speed = 70;
var move = {up:null, left:null, right:null, down:null};
var move_direction = {up:false, left:false, right:false, down:false};

//Reloads Screen with updated variables
function PrintMap(){
	new_map = ReplMap(character, "@")
	document.getElementById("map").innerHTML = new_map;
	GenerateBox();
}

// Use when loading new environment
function ClearActions(){
	actions = {name:"", stores:[], enemies:[], gates:[]};
}

// Key Presses
document.onkeydown = function(evt) {
	evt = evt || window.event;
	if (!game_started){
		game_started = true;
		GenerateTown();		
	}
	
	//Move Character
	if (evt.keyCode == 87 && !move_direction.up){
		move.up = setInterval(function(){StepCharacter("up")}, move_speed);
		move_direction.up = true;
	}
	else if (evt.keyCode == 65 && !move_direction.left){
		move.left = setInterval(function(){StepCharacter("left")}, move_speed);
		move_direction.left = true;
	}
	else if (evt.keyCode == 68 && !move_direction.right){
		move.right = setInterval(function(){StepCharacter("right")}, move_speed);
		move_direction.right = true;
	}
	else if (evt.keyCode == 83 && !move_direction.down){
		move.down = setInterval(function(){StepCharacter("down")}, move_speed);
		move_direction.down = true;
	}
	else if (evt.keyCode >= 49 && evt.keyCode <= 57){
		var i = evt.keyCode - 49;
			box.functs(i);
	}
	else if (evt.keyCode == 81){
		GenerateBox();
	}
}

document.onkeyup = function(evt) {
	evt = evt || window.event;

	//Stop Character
	if (evt.keyCode == 87){
		clearInterval(move.up);
		move_direction.up = false;
	}
	else if (evt.keyCode == 65){
		clearInterval(move.left);
		move_direction.left = false;
	}
	else if (evt.keyCode == 68){
		clearInterval(move.right);
		move_direction.right = false;
	}
	else if (evt.keyCode == 83){
		clearInterval(move.down);
		move_direction.down = false;
	}

}


String.prototype.replaceAt=function(index, ch) {
	return this.substr(0, index) + ch + this.substr(index+ch.length);
}

function ReplMap(position, ch) {
	var new_map = map.replaceAt(GetElement(position.x, position.y), ch);
	return new_map;
}

function ReplaceMap(position, ch){
	map = map.replaceAt(GetElement(position.x, position.y), ch);
}

function GetElement(x, y){
	return 4 + 27 + 27 * y + (x + 1);
	// <tt>, top line, lines above, sideways characters
}

function GetMapElement(position){
	return map.charAt(GetElement(position.x, position.y));
	// <tt>, top line, lines above, sideways characters
}

function StepCharacter(direction){
	
	var next_character = {x:character.x, y:character.y};
	if (direction == "up"){
		next_character.y -= 1;
	}
	else if (direction == "left"){
		next_character.x -= 1;
	}
	else if (direction == "right"){
		next_character.x += 1;
	}
	else if (direction == "down"){
		next_character.y += 1;
	}
	
	var symbol = GetMapElement(next_character); 
	if (symbol == "." || symbol == "/" || symbol == " "){
		character = next_character;
		PrintMap();
	}
	
}

function GenerateStore(store){
	actions.stores.push(store);
	for (var i = 0; i < store.entrances.length; ++i){
		ReplaceMap(store.entrances[i], "/");
	}
	/*
	for (var i = 0; i < store.items.length; ++i){
		if (store.items[i].type == "item" && localStorage.getItem(ItemToLocal(store.items[i])) === null){
			localStorage.setItem(ItemToLocal(store.items[i]), 0);
		}
	}
	*/
}

function ItemToLocal(item){
	return item.type + ":" + item.kind + ":" + item.name;
}

function LocalStringElement(local_string, i){
	var list = local_string.split(":");
	return list[i];
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