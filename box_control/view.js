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
	if (box.current_interaction && box.current_interaction.type == "store" && ContainsObject(item, box.current_interaction.items)){
		NewListElement("Buy Item", partial(BuyItem, item), false, (player.gold < item.price || HasItem(item))); //pass argument
	}
	else if (box.current_interaction && box.current_interaction.type == "chest" && ContainsObject(item, box.current_interaction.items)){
		NewListElement("Take Item", partial(TakeItem, item)); //pass argument
	}
	else if (ContainsObject(item, player.items)){
		NewListElement("Equip", partial(EquipItem, GetIndexOfObject(item, player.items))); //pass argument as index
		NewListElement("Destroy", partial(DestroyItem, GetIndexOfObject(item, player.items))); //pass argument as index
	}
	else if (player.equipment[item.use] && player.equipment[item.use].name == item.name && player.equipment[item.use].name != default_equipment[item.use].name){
		NewListElement("Unequip", partial(UnequipItem, item)); //pass argument
		NewListElement("Destroy", partial(DestroyEquipment, item)); //pass argument
	}
	PrintBox();
}

// USE ITEM
function EquipItem(index) {
	var player = localStorage.getObj("player");
	
	var item = player.items[index];
	
	if (CanEquip(item)){
		if (player.equipment[item.use].name != default_equipment[item.use].name){
			player.items.push(player.equipment[item.use]);
		}
		player.equipment[item.use] = item;
		player.items.splice(index, 1);
	}
	
	localStorage.setObj("player", player);
	ShowInventory();
}

function CanEquip(item){
	var player = localStorage.getObj("player");
	
	if (player.equipment[item.use]){
		return true;
	}
	return false;
}

function DestroyItem(index) {
	var player = localStorage.getObj("player");
	player.items.splice(index, 1);
	localStorage.setObj("player", player);
	ShowInventory();
}

function UnequipItem(item){
	var player = localStorage.getObj("player");
	
	player.items.push(item);
	player.equipment[item.use] = default_equipment[item.use];
	
	localStorage.setObj("player", player);
	ShowEquipment();
}

function DestroyEquipment(item){
	var player = localStorage.getObj("player");
	
	player.equipment[item.use] = default_equipment[item.use];
	
	localStorage.setObj("player", player);
	ShowEquipment();
}

function BuyItem(item) {
	var player = localStorage.getObj("player"); 
	var after_gold = player.gold - item.price;
	
	if (after_gold >= 0 && !(item.type == "item" && HasItem(item))){
		player.gold = after_gold;
		var player = localStorage.setObj("player", player);
		GetItem(item);
	}
}

function TakeItem(item){
	var chest_index = GetIndexOfObject(box.current_interaction, environment.chests);
	environment.chests[chest_index].items.splice(GetIndexOfObject(item, environment.chests[chest_index].items), 1);
	GetItem(item); 
}

function GetItem(item) {
	var player = localStorage.getObj("player"); 

	if (item.type == "item"){
		if (CanEquip(item) && player.equipment[item.use].name == default_equipment[item.use].name){		
			player.equipment[item.use] = item;
		}
		else {
			player.items.push(item);
		}
	}
	else if (item.type == "instant"){
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
