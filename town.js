function GenerateTown(){
	ClearEnvironment();
	environment.name = "Town";
	map = "<tt>" +
	"#######################<br>" +
	"#.....................#<br>" + 
	"#.#######.....#######.#<br>" +
	"#.#Armor#.....#Gen  #.#<br>" +
	"#.#-----#.....#Store#.#<br>" +
	"#.#     #.....#-----#.#<br>" +
	"#.#     #.....#     #.#<br>" +
	"#.#     #.....#     #.#<br>" +
	"#.#     #.....#######.#<br>" +
	"#.#######.............#<br>" +
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
	character = {x:10, y:10};

	// Generate Armory
	var armory = {name:"The Armory", items:[], entrances:[{x:7, y:4}, {x:4, y:8}]};
		armory.items.push({name:"Shield", resistance:2, price:10, type:"item", use:"off_hand"});
		armory.items.push({name:"Cloth Armor", resistance:2, price:20, type:"item", use:"armor"});
		armory.items.push({name:"Leather Armor", resistance:4, price:30, type:"item", use:"armor"});
	GenerateStore(armory);
	
	var weaponsmith = {name:"The Weapon Store", entrances:[{x:15, y:13}], items:[]};
		weaponsmith.items.push({name:"Dagger", damage:25, price:5, type:"item", use:"weapon"});
		weaponsmith.items.push({name:"Simple Bow", damage:25, price:5, type:"item", use:"weapon"});
		weaponsmith.items.push({name:"Wand", damage:25, price:5, type:"item", use:"weapon"});
	GenerateStore(weaponsmith);
	
	var general = {name:"The General Store", entrances:[{x:13, y:5}, {x:16, y:7}], items:[]};
		general.items.push({name:"Ham", price:1, type:"instant", use:"consumable"});
		general.items.push({name:"Steak", price:2, type:"instant", use:"consumable"});
		general.items.push({name:"Health Potion", restoration:50, price:5, type:"item", use:"consumable"});
	GenerateStore(general);
	
	var old_man = {name:"Old Man", type:"questgiver", quests:[], position:{x:3, y:12}};
		var quest1 = {name:"Into the Woods", description:""};
		quest1.description = "Hello Traveller, darkness encrouches on our town and the beast of the night run wild. If you dare, venture into the woods and slay 3 of these foul predators.";
		old_man.quests.push(quest1);
	GenerateNPC(old_man);
	
	var test_enemy = {name:"Enemy", type:"enemy", health:200, level:1, strength:1, speed:0, weapon:null, armour:null, position:{x:4, y:16}};
	GenerateNPC(test_enemy);
	
	PrintMap();
}