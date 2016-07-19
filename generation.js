function GenerateEnvironment(env){
	ReplaceWorld(env.world_loc, env.ch);
	world_environments.push(env);
}

function SetupEnvironment(){
	var player = localStorage.getObj("player");
	var env = GetEnvironment(player.last_save.world_loc);

	ClearEnvironment();
	environment.name = env.name;
	map = env.map;
	GenerateCharacter(player.last_save.loc);

	for (var i = 0; i < env.stores.length; ++i){
		GenerateStore(env.stores[i]);
	}

	for (var i = 0; i < env.NPCs.length; ++i){
		GenerateNPC(env.NPCs[i]);
	}

	PrintMap();
}

function GenerateCharacter(position){
	character = position;
	interact_place = position;
	PLayerBox();
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

function GenerateGate(gate){
	environment.gates.push(gate);
	for (var i = 0; i < gate.positions.length; ++i){
		ReplaceMap(gate.positions[i], "+");
	}
}
