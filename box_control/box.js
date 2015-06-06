var box;

function InitializeBox(title){
	box.name = title + "<br><ol>";
}

function PrintBox(){
	box.name += "</ol>";
	document.getElementById("box").innerHTML = box.name;
}

function GenerateBox(){
	var symbol = GetMapElement(character);
	
	if (symbol == "."){ // Moving around
		box = {name:"", functs:BrowsePlayer};

		InitializeBox("You are in " + environment.name);
		box.name += "<li>Inventory</li>";
		box.name += "<li>Stats"
		if (GetFreePoints()){
			box.name += " (" + GetFreePoints() + ")";
		}
		box.name += "</li>";
		PrintBox();
	}
	else if (symbol == "/"){ // Entering a store
		box = {name:"", store:null, functs:BuyItem};

		for (var i = 0; i < environment.stores.length; ++i){
			for (var j = 0; j < environment.stores[i].entrances.length; ++j){
				if (environment.stores[i].entrances[j].x == character.x && environment.stores[i].entrances[j].y == character.y){
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
	else if (symbol == "Q"){ // Going over an NPC
		box = {name:"", npc:null, functs:NullFunction};
		
		for (var i = 0; i < environment.NPCs.length; ++i){
			if (environment.NPCs[i].position.x == character.x && environment.NPCs[i].position.y == character.y){
				box.npc = environment.NPCs[i];
			}
		}
		if (box.npc){
			ShowNPC();
		}
	}
}

function BrowsePlayer(num){
	var player = localStorage.getObj("player");
	
	if (num == 0){
		box = {name:"", functs:NullFunction};
		InitializeBox("Your Inventory");
		box.name += "<li>Gold: " + player.gold + "</li>";
		for(var i = 0; i < player.items.length; ++i){
			box.name += "<li>" + player.items[i].name + "</li>";
		}
		PrintBox();
	}
	else if (num == 1){
		box = {name:"", functs:LevelStat};
		InitializeBox("You are level " + player.level + "<br>" + "Attack: " + player.attack + " Defence: "  + player.defence);
		box.name += "<li>Level Attack</li>";
		box.name += "<li>Level Defence</li>";
		PrintBox();
	}
}

function LevelStat(num){
	var player = localStorage.getObj("player");
	if (num == 0 && GetFreePoints()){
		player.attack += 1;
	}
	else if (num == 1 && GetFreePoints()){
		player.defence += 1;
	}
	localStorage.setObj("player", player);
	BrowsePlayer(1);
}

function GetFreePoints(){
	var player = localStorage.getObj("player"); 
	return player.level - player.attack - player.defence;
}