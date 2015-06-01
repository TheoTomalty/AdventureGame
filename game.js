var game_started = false; //Should not change after made true
var map;
var actions;
var character = {x:null, y:null};

// Movement Variables
var move_speed = 50;
var move = {up:null, left:null, right:null, down:null};
var move_direction = {up:false, left:false, right:false, down:false};

function PrintMap(){
	document.getElementById("map").innerHTML = map;
}

document.getElementById("map").style.letterSpacing = "10px";

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


String.prototype.replaceAt=function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
}

function GetElement(x, y){
	return 4 + 27 + 27 * y + (x + 1)
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
	
	if (map.charAt(GetElement(next_character.x, next_character.y)) == "."){
		map = map.replaceAt(GetElement(character.x, character.y), ".");
		character = next_character;
		map = map.replaceAt(GetElement(character.x, character.y), "@");
		PrintMap();
	}
	
}

function GenCharacter(x1, y1){
	map = map.replaceAt(GetElement(x1, y1), "@");
	character = {x:x1, y:y1}
}