var map;

//Reloads Screen with updated variables
function PrintMap(){
	new_map = TempReplMap(character, "@")
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

function GenerateStore(store){
	environment.stores.push(store);
	for (var i = 0; i < store.entrances.length; ++i){
		ReplaceMap(store.entrances[i], "/");
	}
}
