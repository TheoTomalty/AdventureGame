var move_speed = 70;
var character = {x:null, y:null};

// Movement Variables
var move = {up:null, left:null, right:null, down:null};
var move_direction = {up:false, left:false, right:false, down:false};

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