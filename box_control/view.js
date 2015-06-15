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
		NewListElement("Buy Item" + " (" + item.price + "g)", partial(BuyItem, item), false, (player.gold < item.price || HasItem(item))); //pass argument
	}
	else if (box.current_interaction && box.current_interaction.type == "chest" && ContainsObject(item, box.current_interaction.items)){
		NewListElement("Take Item", partial(TakeItem, item)); //pass argument
	}
	else if (ContainsObject(item, player.items)){
		if (CanEquip(item)){
			NewListElement("Equip", partial(EquipItem, GetIndexOfObject(item, player.items))); //pass argument as index
		}
		else if (item.type == "consumable"){
			NewListElement("Consume", partial(ConsumeItem, GetIndexOfObject(item, player.items))); //pass argument as index
		}
		else if (item.type == "container"){
			NewListElement("Open", partial(OpenItem, GetIndexOfObject(item, player.items))); //pass argument as index
		}
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

function ConsumeItem(index){
	var player = localStorage.getObj("player");
	var item = player.items[index];
	
	if (item.use == "heal" && player.health != max_health){
		player.items.splice(index, 1);
		localStorage.setObj("player", player);
		Heal(item.restoration);
	}
	
	ShowInventory();
}

function OpenItem(index) {
	var player = localStorage.getObj("player");
	var item = player.items[index];
	
	if (item.use == "gold"){
		player.gold += item.gold;
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
		GenerateBox();
	}
}

function TakeItem(item){
	var chest_index = GetIndexOfObject(box.current_interaction, environment.chests);
	environment.chests[chest_index].items.splice(GetIndexOfObject(item, environment.chests[chest_index].items), 1);
	GetItem(item); 
	GenerateBox();
}

function GetItem(item) {
	var player = localStorage.getObj("player"); 

	if (item.type != "instant"){
		if (CanEquip(item) && player.equipment[item.use].name == default_equipment[item.use].name){		
			player.equipment[item.use] = item;
		}
		else {
			player.items.push(item);
		}
	}
	else {
	}

	localStorage.setObj("player", player);
}

// VIEW QUESTS
function ViewQuest(quest) {
	var player = localStorage.getObj("player");
	
	InitializeTitle("<p style=\"width: 200px;\">" + quest.description + "</p>");
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

//Item Actions
function Heal(restoration){
	var player = localStorage.getObj("player");
	var new_health = player.health + restoration;
	
	if (new_health < max_health){
		player.health = new_health;
	}
	else {
		player.health = max_health;
	}
	
	localStorage.setObj("player", player);
}
