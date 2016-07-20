// Key Presses
document.onkeydown = function(evt) {
	evt = evt || window.event;

	//Move Character
	if (!develop_manager.activated && game_started && can_move){
		if (evt.keyCode == 87 && !move_direction.up){
			StepCharacter("up");
			move.up = setInterval(function(){StepCharacter("up")}, move_speed);
			move_direction.up = true;
		}
		else if (evt.keyCode == 65 && !move_direction.left){
			StepCharacter("left");
			move.left = setInterval(function(){StepCharacter("left")}, move_speed);
			move_direction.left = true;
		}
		else if (evt.keyCode == 68 && !move_direction.right){
			StepCharacter("right");
			move.right = setInterval(function(){StepCharacter("right")}, move_speed);
			move_direction.right = true;
		}
		else if (evt.keyCode == 83 && !move_direction.down){
			StepCharacter("down");
			move.down = setInterval(function(){StepCharacter("down")}, move_speed);
			move_direction.down = true;
		}
		else if (evt.keyCode == 81){ // Quit Box
			previous_symbol = "";
			interact_place = character;
			GenerateBox();
		}
	}
	if (evt.keyCode >= 49 && evt.keyCode <= 57){ // Activate Box Function
		var i = evt.keyCode - 49;
		if (game_started && box.list[i]){
			box.list[i].funct();
		}
		else if (develop_manager.activated){
			develop_manager.box_manager.current_box.ProcessNumber(i);
		}
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

	// Hinder movement if necessary
	var symbol = GetMapElement(next_character);
	if (ElementAtPlace(next_character, [".", "/", " ", "C"])){
		character = next_character;
		interact_place = character;
		PrintMap();
	}
	else if (!ElementAtPlace(next_character, ["#", "-", "|"])){
		interact_place = next_character;
		PrintMap();
	}

}

function ElementAtPlace(position, array){
	for (var i = 0; i < array.length; ++i){
		if (GetMapElement(position) == array[i]){
			return true;
		}
	}
	return false;
}
