function GenerateTown(){
	ClearActions();
	actions.name = "Town";
	map = "<tt>" +
	"##########+++##########<br>" +
	"#.....................#<br>" + 
	"#.#######.....#######.#<br>" +
	"#.#Armor#.....#Gen  #.#<br>" +
	"#.#-----#.....#Store#.#<br>" +
	"#.#     #.....#-----#.#<br>" +
	"#.#     #...../     #.#<br>" +
	"#.#######.....#     #.#<br>" +
	"#.............###/###.#<br>" +
	"#.....................#<br>" +
	"#.....................+<br>" +
	"#.#/#/#/##............+<br>" +
	"#.#      #............+<br>" +
	"#.#      /............#<br>" +
	"#.#      #..#########.#<br>" +
	"#.#      /..#       #.#<br>" +
	"#.#------#..#       #.#<br>" +
	"#.#Park  #..#-------#.#<br>" +
	"#.########..#Weapons#.#<br>" +
	"#...........#########.#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#######################<br>" + "</tt>";
	character = {x:10, y:10};

	
	// Generate Armory
	var armory = {name:"The Armory", items:[], entrances:[{x:7, y:4}]};
		armory.items.push({name:"Shield", price:"10"});
		armory.items.push({name:"Cloth Armor", price:"20"});
		armory.items.push({name:"Leather Armor", price:"30"});
	GenerateStore(armory);
	
	var weaponsmith = {name:"The Weaponsmith", entrances:[{x:15, y:13}], items:[]};
		weaponsmith.items.push({name:"Dagger", price:5});
		weaponsmith.items.push({name:"Simple Bow", price:5});
		weaponsmith.items.push({name:"Wand", price:5});
	GenerateStore(weaponsmith);
	
	PrintMap();
}