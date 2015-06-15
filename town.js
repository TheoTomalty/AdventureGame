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
	"#..#    #.....#######.#<br>" +
	"#...####..............#<br>" +
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
	var armoury = {name:"The Armory", type:"store", items:[], positions:[{x:4, y:8}, {x:5, y:8}]};
		armoury.items.push({name:"Leather Armor", resistance:4, price:20, type:"item", use:"armour"});
		armoury.items.push({name:"Mail Armor", resistance:8, price:50, type:"item", use:"armour"});
		armoury.items.push({name:"Plate Armor", resistance:12, price:100, type:"item", use:"armour"});
	GenerateStore(armoury);
	
	var weaponsmith = {name:"The Weapon Store", type:"store", positions:[{x:15, y:13}], items:[]};
		weaponsmith.items.push({name:"Dagger", damage:25, price:5, type:"item", use:"weapon"});
		weaponsmith.items.push({name:"Simple Bow", damage:25, price:5, type:"item", use:"weapon"});
		weaponsmith.items.push({name:"Wand", damage:25, price:5, type:"item", use:"weapon"});
	GenerateStore(weaponsmith);
	
	var general = {name:"The General Store", type:"store", positions:[{x:13, y:5}, {x:16, y:7}], items:[]};
		general.items.push({name:"Ham", price:1, type:"instant", use:"heal"});
		general.items.push({name:"Steak", price:2, type:"instant", use:"heal"});
		general.items.push({name:"Health Potion", restoration:50, price:5, type:"consumable", use:"heal"});
	GenerateStore(general);
	
	var old_man = {name:"Old Man", type:"npc", use:"questgiver", quests:[], positions:[{x:3, y:12}]};
		var quest1 = {name:"Into the Woods", description:""};
		quest1.description = "Hello Traveller, darkness encrouches on our town and the beasts of the night run wild. If you dare, venture into the woods and slay 3 of these foul predators.";
		old_man.quests.push(quest1);
	GenerateNPC(old_man);
	
	var woods_gate = {name:"Woods", type:"random", positions:[{x:10, y:-1}, {x:11, y:-1}]};
	GenerateGate(woods_gate);
	
	
	PrintMap();
}