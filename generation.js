function GenerateCharacter(position){
	character = position;
	interact_place = position;
}

function GenerateStore(store){
	environment.stores.push(store);
	for (var i = 0; i < store.positions.length; ++i){
		ReplaceMap(store.positions[i], "/");
	}
}

function GenerateNPC(npc){
	environment.NPCs.push(npc);
	if (npc.use == "questgiver"){
		ReplaceMap(npc.positions[0], "Q");
	}
	else if (npc.use == "enemy"){
		ReplaceMap(npc.positions[0], "E");
	}
}

function GenerateChest(chest){
	environment.chests.push(chest);
	ReplaceMap(chest.positions[0], "C");
}