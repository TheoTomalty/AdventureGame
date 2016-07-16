function RandomMap() {
		ClearEnvironment();
		environment.name = "Woods";

		map = "<tt>" +
		"#######################<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#.....................#<br>" +
		"#######################<br>" + "</tt>";


		GenerateCharacter(RandomPosition());

		var num_trees = 50;
		var num_enemies = 8;

		for (var i = 0; i < num_trees; ++ i){
			ReplaceMap(RandomPosition(), "#");
		}

		var bandit = {name:"Bandit", type:"npc", use:"enemy", health:max_health, level:1, strength:1, speed:0, equipment:default_equipment, loot:[{name:"Bag of Coins", gold:3, type:"container", use:"gold"}], positions:[RandomPosition()]};
		GenerateNPC(bandit);
		var wolf = {name:"Giant Rat", type:"npc", use:"enemy", health:max_health, level:1, strength:1, speed:0, equipment:default_equipment, loot:[], positions:[RandomPosition()]};
		GenerateNPC(wolf);
		var hooligan = {name:"Hooligan", type:"npc", use:"enemy", health:max_health, level:1, strength:1, speed:0, equipment:default_equipment, loot:[{name:"Bag of Coins", gold:2, type:"container", use:"gold"}], positions:[RandomPosition()]};
		GenerateNPC(hooligan);

		var town_gate = {name:"Town", next:GenerateTown, positions:[{x:9, y:21}, {x:10, y:21}, {x:11, y:21}]};
		GenerateGate(town_gate);


		PrintMap();
}

function RandomPosition(){
	var position = {x:Math.floor(Math.random() * 21), y:Math.floor(Math.random() * 21)}
	return position;
}
