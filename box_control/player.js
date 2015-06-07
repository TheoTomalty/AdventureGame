function PLayerBox(){
	box = {name:"", functs:BrowsePlayer};
	var player = localStorage.getObj("player"); 
	
	InitializeBox("You are in " + environment.name + " (" + player.health + ")");
	NewListElement("Inventory");
	box.name += "<li>Stats"
	if (GetFreePoints()){
		box.name += " (" + GetFreePoints() + ")";
	}
	box.name += "</li>";
	NewListElement("Equipment");
	NewListElement("Quest Log");
	PrintBox();
}

function BrowsePlayer(num){
	var player = localStorage.getObj("player");

	if (num == 0){
		box = {name:"", functs:ViewItem};
		InitializeBox("Your Inventory (" + player.gold + "g)");
		for(var i = 0; i < player.items.length; ++i){
			NewListElement(player.items[i].name);
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
	else if (num == 2){
		var weapon = player.weapon || default_weapon;
		var armour = player.armour || default_armour;
		InitializeBox("Your Equipment");
		box.functs = ViewEquipped;
		NewListElement("Weapon: " + weapon.name);
		NewListElement("Armour: " + armour.name);
		PrintBox()
	}
	else if (num == 3){
		InitializeBox("Active Quests");
		box.functs = ViewActiveQuest;
		for (var i = 0; i < player.quests.length; ++i){
			NewListElement(player.quests[i].name);
		}
		PrintBox();
	}
}

function ViewItem(num){
	var player = localStorage.getObj("player");
	if (player.items[num]){
		InitializeBox(player.items[num].name);
		box.item = num;
		box.functs = UseItem;
		NewListElement("Equip");
		NewListElement("Destroy");
		PrintBox();
	}
}

function UseItem(num){
	var player = localStorage.getObj("player");
	if (num == 0){
		if (player.items[box.item].use == "weapon"){
			if (player.weapon){
				player.items.push(player.weapon);
			}
			player.weapon = player.items[box.item];
			player.items.splice(box.item, 1);
		}
		else if (player.items[box.item].use == "armour"){
			if (player.armour){
				player.items.push(player.armour);
			}
			player.armour = player.items[box.item];
			player.items.splice(box.item, 1);
		}
	}
	else if (num == 1){
		player.items.splice(box.item, 1);
	}
	localStorage.setObj("player", player);
	BrowsePlayer(0);
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

function ViewEquipped(num) {
	var player = localStorage.getObj("player");
	box.item = false;
	if (num == 0 && player.weapon){
		box.item = player.weapon;
	}
	else if (num == 1 && player.armour){
		box.item = player.armour;
	}
	
	if (box.item){
		InitializeBox(box.item.name);
		box.functs = UseEquipped;
		NewListElement("Unequip");
		PrintBox();
	}
}

function UseEquipped(num){
	var player = localStorage.getObj("player");
	if (num == 0){
		if (box.item.use == "weapon"){
			player.items.push(box.item);
			player.weapon = null;
		}
		else if (box.item.use == "armour"){
			player.items.push(box.item);
			player.armour = null;
		}
		localStorage.setObj("player", player);
		BrowsePlayer(2);
	}
}

function ViewActiveQuest(num){
	var player = localStorage.getObj("player");
	if (player.quests[num]){
		box.quest = num;
		InitializeBox(player.quests[num].description);
		box.functs = UseQuest;
		NewListElement("Abandon");
		PrintBox();
	}
}

function UseQuest(num){
	var player = localStorage.getObj("player");
	if (num == 0){
		player.quests.splice(box.quest, 1);
		localStorage.setObj("player", player);
		BrowsePlayer(3);
	}
}




