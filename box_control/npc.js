function ShowNPC(){
	if (box.npc.type == "enemy"){
		InitializeBox(box.npc.name + " (level " + box.npc.level + ")");
	}
	else {
		InitializeBox(box.npc.name);
	}
	var engage;

	if (box.npc.type == "questgiver"){
		engage = "Help";
		box.functs = EngageQuestgiver;
	}
	
	if (box.npc.type == "enemy"){
		engage = "Fight";
		box.functs = FightEnemy;
	}
	
	NewListElement(engage);
	PrintBox();
}

function EngageQuestgiver(num){
	var player = localStorage.getObj("player");

	if (num == 0){
		InitializeBox("Available Quests");
		box.functs = ViewQuest;

		for (var i = 0; i < box.npc.quests.length; ++i){
			NewListElement(box.npc.quests[i].name, ContainsObject(box.npc.quests[i], player.quests), false);
		}
		
		PrintBox();
	}
}

function ViewQuest(num){
	var player = localStorage.getObj("player");
	if (box.npc.quests.length > num && !ContainsObject(box.npc.quests[num], player.quests)){
		InitializeBox(box.npc.quests[num].description);
		box.functs = AcceptQuest;

		NewListElement("Accept");
		NewListElement("Decline");

		PrintBox();
	}
}

function AcceptQuest(num){
	if (num == 0){
		var player = localStorage.getObj("player");
		player.quests.push(box.npc.quests[num]);
		localStorage.setObj("player", player);
		EngageQuestgiver(0);
	}
	else if (num == 1){
		EngageQuestgiver(0);
	}
}
