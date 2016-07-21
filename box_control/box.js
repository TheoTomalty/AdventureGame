//Box prototype
function Box(head){
	this.head = head;
	this.body = "";
	this.interactions = [];

	this.ProcessNumber = function(num){
		if (num < this.interactions.length){
			this.interactions[num].exectuable();
		}
	}
}

function ClearInteraction(){
	interact_place = character;
	box.current_interaction = null;
}

function InitializeTitle(title){
	box.list = [];
	box.body = "";
	box.title = title;
}

function SetBodyText(text){
	box.body = text;
}

function NewListElement(title, fnc, is_blue, is_grey){
	is_grey = is_grey || false;
	is_blue = is_blue || false;

	var list_text = "<li";
	if (is_blue){
		list_text += " style=\"color:blue;\"";
	}
	else if (is_grey){
		list_text += " style=\"color:grey;\"";
	}
	list_text += ">" + title + "</li>";

	box.list.push({text:list_text, funct:fnc})
}

function PrintBox(){
	var html = box.title + "<br>";
	var exists_something = false;
	if (box.body != ""){
		exists_something = true;
		html += "<p>" + box.body + "</p>";
	}
	if (box.list.length != 0){
		exists_something = true;
		html += "<ol>";
		for (var i = 0; i < box.list.length; ++i){
			html += box.list[i].text;
		}
		html += "</ol>";
	}
	if (!exists_something) {
		html += "<br><-- Nothing Here -->";
	}
	document.getElementById("box").innerHTML = html;
}

function ContainsObject(obj, list) {
	for (var i = 0; i < list.length; i++) {
		if (list[i].name === obj.name) {
			return true;
		}
	}
	return false;
}

function GetIndexOfObject(object, array){
	for (var i = 0; i < array.length; ++i){
		if (object.name == array[i].name){
			return i;
		}
	}
	return null;
}

function GetObjectFromPosition(position, array){
	for (var i = 0; i < array.length; ++i){
		for (var j = 0; j < array[i].positions.length; ++j){
			if (position.x == array[i].positions[j].x && position.y == array[i].positions[j].y){
				return array[i];
			}
		}
	}
	return null;
}

function GenerateBox(){
	var symbol = GetMapElement(interact_place);

	if (previous_symbol != "." && symbol == "."){ // Moving around
		ClearInteraction();
		PLayerBox();
	}
	else if (symbol == "/"){ // Entering a store
		box.current_interaction = GetObjectFromPosition(interact_place, environment.stores);
		ShowStore();
	}
	else if (symbol == " "){ // Inside previous element
		ShowStore();
	}
	else if (ElementAtPlace(interact_place, ["Q", "E"])){ // Going over an NPC
		box.current_interaction = GetObjectFromPosition(interact_place, environment.NPCs);
		ShowNPC();
	}
	else if (symbol == "C"){
		box.current_interaction = GetObjectFromPosition(interact_place, environment.chests);
		ShowChest();
	}
	else if (symbol == "+"){
		box.current_interaction = GetObjectFromPosition(interact_place, environment.gates);
		Travel();
	}

	previous_symbol = symbol;
}
