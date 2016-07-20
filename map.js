function Map(size) {
	this.size = size;
	this.map = FixedArray([size, size], ".");

	this.SetChar = function(position, char){
		this.map[position.x, position.y] = char;
	}

	this.GetChar = function(position) {
		return this.map[position.x][position.y];
	}
}

FixedArray = function(dims, element){
	var new_array = [];
	var object_pushed = element
	for (var i = 0; i < dims.length; ++i){
		for (var j = 0; j < dims[i]; ++j){
			new_array.push(object_pushed);
		}
		object_pushed = new_array;
		new_array = [];
	}
	return object_pushed;
}

// Reloads Screen with updated variables
function PrintMap(){
	new_map = TempReplMap(character, "@");

	// Print Screen
	document.getElementById("map").innerHTML = new_map;
	GenerateBox();
}

function TempReplMap(position, ch) {
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
