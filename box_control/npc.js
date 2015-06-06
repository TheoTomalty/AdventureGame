function ShowNPC(){
	InitializeBox(box.npc.name);
	var engage;

	if (box.npc.type == "questgiver"){
		engage = "Help";
		box.functs = EngageQuestgiver;
	}

	box.name += "<li>" + engage + "</li>";
	PrintBox();
}

function EngageQuestgiver(num){
	var player = localStorage.getObj("player");

	if (num == 0){
		InitializeBox("Available Quests");
		box.functs = ViewQuest;

		for (var i = 0; i < box.npc.quests.length; ++i){
			box.name += "<li"
			if (ContainsObject(box.npc.quests[i], player.quests)){
				box.name += " style=\"color:grey;\"";
			}
			box.name += ">" + box.npc.quests[i].name + "</li>";
		}
		
		PrintBox();
	}
}

function ViewQuest(num){
	var player = localStorage.getObj("player");
	if (box.npc.quests.length > num && !ContainsObject(box.npc.quests[num], player.quests)){
		InitializeBox(box.npc.quests[num].description);
		box.functs = AcceptQuest;

		box.name += "<li>Accept</li>";
		box.name += "<li>Decline</li>";

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
