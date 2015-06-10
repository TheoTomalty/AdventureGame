function GenerateTown(){
	ClearEnvironment();
	environment.name = "Town";
	map = "<tt>" +
	"#######################<br>" +
	"#.....................#<br>" + 
	"#.########....#######.#<br>" +
	"#.#Armour#....#Gen  #.#<br>" +
	"#.#------#....#Store#.#<br>" +
	"#.#      #....#-----#.#<br>" +
	"#.#      #....#     #.#<br>" +
	"#.#      #....#     #.#<br>" +
	"#.#      #....#######.#<br>" +
	"#.########............#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#...........#########.#<br>" +
	"#...........#       #.#<br>" +
	"#...........#       #.#<br>" +
	"#...........#-------#.#<br>" +
	"#...........#Weapons#.#<br>" +
	"#...........#########.#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#######################<br>" + "</tt>";
	GenerateCharacter({x:10, y:10});

	// Generate Armory
	var armoury = {name:"The Armory", type:"store", items:[], positions:[{x:8, y:4}, {x:4, y:8}]};
		armoury.items.push({name:"Shield", resistance:2, price:10, type:"item", use:"armour"});
		armoury.items.push({name:"Cloth Armor", resistance:2, price:20, type:"item", use:"armour"});
		armoury.items.push({name:"Leather Armor", resistance:4, price:30, type:"item", use:"armour"});
	GenerateStore(armoury);
	
	var weaponsmith = {name:"The Weapon Store", type:"store", positions:[{x:15, y:13}], items:[]};
		weaponsmith.items.push({name:"Dagger", damage:25, price:5, type:"item", use:"weapon"});
		weaponsmith.items.push({name:"Simple Bow", damage:25, price:5, type:"item", use:"weapon"});
		weaponsmith.items.push({name:"Wand", damage:25, price:5, type:"item", use:"weapon"});
	GenerateStore(weaponsmith);
	
	var general = {name:"The General Store", type:"store", positions:[{x:13, y:5}, {x:16, y:7}], items:[]};
		general.items.push({name:"Ham", price:1, type:"instant", use:"heal"});
		general.items.push({name:"Steak", price:2, type:"instant", use:"heal"});
		general.items.push({name:"Health Potion", restoration:50, price:5, type:"item", use:"consumable"});
	GenerateStore(general);
	
	var old_man = {name:"Old Man", type:"npc", use:"questgiver", quests:[], positions:[{x:3, y:12}]};
		var quest1 = {name:"Into the Woods", description:""};
		quest1.description = "Hello Traveller, darkness encrouches on our town and the beasts of the night run wild. If you dare, venture into the woods and slay 3 of these foul predators.";
		old_man.quests.push(quest1);
	GenerateNPC(old_man);
	
	var test_enemy = {name:"Enemy", type:"npc", use:"enemy", health:200, level:1, strength:1, speed:0, equipment:default_equipment, loot:[{name:"Health Potion", restoration:50, price:5, type:"item", use:"consumable"}], positions:[{x:4, y:16}]};
	GenerateNPC(test_enemy);
	
	PrintMap();
}