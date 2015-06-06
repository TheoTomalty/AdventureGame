function GenerateStore(store){
	environment.stores.push(store);
	for (var i = 0; i < store.entrances.length; ++i){
		ReplaceMap(store.entrances[i], "/");
	}
}

function GenerateNPC(npc){
	environment.NPCs.push(npc);
	if (npc.type == "questgiver"){
		ReplaceMap(npc.position, "Q");
	}
}