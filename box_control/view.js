// VIEW ITEM
function ViewItem(item){
	var player = localStorage.getObj("player");
	
	var quality = "";
	if (item.use == "weapon"){
		quality = " (" + item.damage + " damage)";
	}
	else if (item.use == "armour"){
		quality = " (" + item.resistance + " resistance)";
	}
	
	InitializeTitle(item.name + quality);
	if (box.current_interaction && box.current_interaction.type == "store" && GetIndexOfObject(item, box.current_interaction.items) != null){
		NewListElement("Buy Item", partial(BuyItem, item), false, (player.gold < item.price || ContainsObject(item, player.items))); //pass argument
	}
	else if (GetIndexOfObject(item, player.items) != null){
		NewListElement("Equip", partial(EquipItem, GetIndexOfObject(item, player.items))); //pass argument as index
		NewListElement("Destroy", partial(DestroyItem, GetIndexOfObject(item, player.items))); //pass argument as index
	}
	else if ((player.weapon && item.name == player.weapon.name) || (player.armour && item.name == player.armour.name)){
		NewListElement("Unequip", partial(UnequipItem, item)); //pass argument
		NewListElement("Destroy", partial(DestroyEquipment, item)); //pass argument
	}
	PrintBox();
}

// USE ITEM
function EquipItem(index) {
	var player = localStorage.getObj("player");
	
	if (player.items[index].use == "weapon"){
		if (player.weapon){
			player.items.push(player.weapon);
		}
		player.weapon = player.items[index];
		player.items.splice(index, 1);
	}
	else if (player.items[index].use == "armour"){
		if (player.armour){
			player.items.push(player.armour);
		}
		player.armour = player.items[index];
		player.items.splice(index, 1);
	}
	
	localStorage.setObj("player", player);
	ShowInventory();
}

function DestroyItem(index) {
	var player = localStorage.getObj("player");
	player.items.splice(index, 1);
	localStorage.setObj("player", player);
	ShowInventory();
}

function UnequipItem(item){
	var player = localStorage.getObj("player");
	
	if (item.use == "weapon"){
		player.items.push(item);
		player.weapon = null;
	}
	else if (item.use == "armour"){
		player.items.push(item);
		player.armour = null;
	}
	
	localStorage.setObj("player", player);
	ShowEquipment();
}

function DestroyEquipment(item){
	var player = localStorage.getObj("player");
	
	if (item.use == "weapon"){
		player.weapon = null;
	}
	else if (item.use == "armour"){
		player.armour = null;
	}
	
	localStorage.setObj("player", player);
	ShowEquipment();
}

function BuyItem(item) {
	var player = localStorage.getObj("player"); 
	var after_gold = player.gold - item.price;
	
	if (after_gold >= 0 && !(item.type == "item" && ContainsObject(item, player.items))){
		if (item.type == "item"){
			player.gold = after_gold;
			player.items.push(item);
		}
		else if (item.type == "instant"){
			player.gold = after_gold;
		}
	}
	localStorage.setObj("player", player);
	GenerateBox();
}

// VIEW QUESTS
function ViewQuest(quest) {
	var player = localStorage.getObj("player");
	
	InitializeTitle(quest.description);
	if (GetIndexOfObject(quest, player.quests) != null){
		NewListElement("Abandon", partial(AbandonQuest, GetIndexOfObject(quest, player.quests))); // Pass argument as index
	}
	else if (box.current_interaction && box.current_interaction.use == "questgiver" && GetIndexOfObject(quest, box.current_interaction.quests) != null){
		NewListElement("Accept", partial(AcceptQuest, quest)); // Pass argument
		NewListElement("Decline", EngageQuestgiver); // Pass argument
	}
	PrintBox();
}

// USE QUESTS
function AcceptQuest(quest) {
	var player = localStorage.getObj("player");
	
	player.quests.push(quest);
	localStorage.setObj("player", player);
	
	EngageQuestgiver();
}

function AbandonQuest(index) {
	var player = localStorage.getObj("player");
	
	player.quests.splice(index, 1);
	localStorage.setObj("player", player);
	ShowQuests();
}
