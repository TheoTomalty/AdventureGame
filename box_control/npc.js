var NPC = function(env){
	this.class = "NPC";
  DecoratedContainer.call(this);
  MapEmbedded.call(this, env);

	this.Open = function(){
    this.SetObject();
		this.DisplayBox();
	}
}

function ShowNPC(){
	if (box.current_interaction.type == "npc"){
		if (box.current_interaction.use == "enemy"){
			InitializeTitle(box.current_interaction.name + " (level " + box.current_interaction.level + ")");
		}
		else {
			InitializeTitle(box.current_interaction.name);
		}

		if (box.current_interaction.use == "questgiver"){
			NewListElement("Help", EngageQuestgiver);
		}
		else if (box.current_interaction.use == "enemy"){
			NewListElement("Fight", EngageEnemy);
		}

		PrintBox();
	}
}

function EngageQuestgiver(){
	var player = localStorage.getObj("player");
	var npc = box.current_interaction;

	InitializeTitle("Available Quests");

	for (var i = 0; i < npc.quests.length; ++i){
		NewListElement(npc.quests[i].name, partial(ViewQuest, npc.quests[i]), ContainsObject(npc.quests[i], player.quests), false); // Pass Argument
	}

	PrintBox();
}
