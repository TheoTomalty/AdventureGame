var box;
var previous_symbol = "";

function InitializeBox(title){
	box.name = title + "<br><ol>";
}

function NewListElement(title, is_blue, is_grey){
	is_grey = is_grey || false;
	is_blue = is_blue || false;
	
	box.name += "<li";
	if (is_blue){
		box.name += " style=\"color:blue;\"";
	}
	else if (is_grey){
		box.name += " style=\"color:grey;\"";
	}
	box.name += ">" + title + "</li>";
}

function PrintBox(){
	box.name += "</ol>";
	document.getElementById("box").innerHTML = box.name;
}

function GenerateBox(){
	var symbol = GetMapElement(interact_place);
	
	if (previous_symbol != "." && symbol == "."){ // Moving around
		PLayerBox();
	}
	else if (symbol == "/"){ // Entering a store
		box = {name:"", store:null, functs:BuyItem};

		for (var i = 0; i < environment.stores.length; ++i){
			for (var j = 0; j < environment.stores[i].entrances.length; ++j){
				if (environment.stores[i].entrances[j].x == interact_place.x && environment.stores[i].entrances[j].y == interact_place.y){
					box.store = environment.stores[i];
				}
			}
		}
		if (box.store){
			ShowStore();
		}
	}
	else if (symbol == " "){ // Inside previous element
		if (box.store){
			ShowStore();
		}	
	}
	else if (ElementAtPlace(interact_place, ["Q", "E"])){ // Going over an NPC
		box = {name:"", npc:null, functs:NullFunction};
		
		for (var i = 0; i < environment.NPCs.length; ++i){
			if (environment.NPCs[i].position.x == interact_place.x && environment.NPCs[i].position.y == interact_place.y){
				box.npc = environment.NPCs[i];
			}
		}
		if (box.npc){
			ShowNPC();
		}
	}
	
	previous_symbol = symbol;
}

function BrowsePlayer(num){
	var player = localStorage.getObj("player");
	
	if (num == 0){
		box = {name:"", functs:NullFunction};
		InitializeBox("Your Inventory");
		NewListElement("Gold: " + player.gold);
		for(var i = 0; i < player.items.length; ++i){
			box.name += "<li>" + player.items[i].name + "</li>";
		}
		PrintBox();
	}
	else if (num == 1){
		box = {name:"", functs:LevelStat};
		InitializeBox("You are level " + player.level + "<br>" + "Strength: " + player.strength + " Speed: "  + player.speed);
		NewListElement("Level Strength");
		NewListElement("Level Speed");
		PrintBox();
	}
}

function LevelStat(num){
	var player = localStorage.getObj("player");
	if (num == 0 && GetFreePoints()){
		player.strength += 1;
	}
	else if (num == 1 && GetFreePoints()){
		player.speed += 1;
	}
	localStorage.setObj("player", player);
	BrowsePlayer(1);
}

function GetFreePoints(){
	var player = localStorage.getObj("player"); 
	return player.level - player.strength - player.speed;
}