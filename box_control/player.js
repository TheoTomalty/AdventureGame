function PLayerBox(){
	var player = localStorage.getObj("player"); 
	
	InitializeTitle("You are in " + environment.name + " (" + player.health + ")");
	NewListElement("Inventory", ShowInventory);
	if (GetFreePoints()){
		NewListElement("Stats (" + GetFreePoints() + ")", ShowStats);
	}
	else {
		NewListElement("Stats", ShowStats);
	}
	NewListElement("Equipment", ShowEquipment);
	NewListElement("Quest Log", ShowQuests);
	PrintBox();
}

function ShowInventory(){
	var player = localStorage.getObj("player");
	
	InitializeTitle("Your Inventory (" + player.gold + "g)");
	for(var i = 0; i < player.items.length; ++i){
		NewListElement(player.items[i].name, partial(ViewItem, player.items[i])); // Pass Argument
	}
	PrintBox();
}

function ShowStats(){
	var player = localStorage.getObj("player");
	
	InitializeTitle("You are level " + player.level + "<br>" + "Strength: " + player.strength + " Speed: "  + player.speed);
	NewListElement("Level Strength", LevelStrength);
	NewListElement("Level Speed", LevelSpeed);
	PrintBox();
}

function ShowEquipment(){
	var player = localStorage.getObj("player");
	
	var weapon = player.weapon || default_weapon;
	var armour = player.armour || default_armour;
	InitializeTitle("Your Equipment");
	NewListElement("Weapon: " + weapon.name, partial(ViewItem, weapon)); // Pass Argument
	NewListElement("Armour: " + armour.name, partial(ViewItem, armour)); // Pass Argument
	PrintBox()
}

function ShowQuests(){
	var player = localStorage.getObj("player");
	
	InitializeTitle("Active Quests");
	for (var i = 0; i < player.quests.length; ++i){
		NewListElement(player.quests[i].name, partial(ViewQuest, player.quests[i])); // Pass Argument
	}
	PrintBox();
}

function LevelStrength(){
	var player = localStorage.getObj("player");
	
	if (GetFreePoints()){
		player.strength += 1;
		localStorage.setObj("player", player);
		ShowStats();
	}
}

function LevelSpeed(){
	var player = localStorage.getObj("player");

	if (GetFreePoints()){
		player.speed += 1;
		localStorage.setObj("player", player);
		ShowStats();
	}
}

function GetFreePoints(){
	var player = localStorage.getObj("player"); 
	return player.level - player.strength - player.speed;
}


