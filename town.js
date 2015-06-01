function GenerateTown(){
	map = "<tt>" +
	"##########+++##########<br>" +
	"#.....................#<br>" + 
	"#.#######.....#######.#<br>" +
	"#.#Armor#.....#Gen  #.#<br>" +
	"#.#     #.....#Store#.#<br>" +
	"#.#     /...../     #.#<br>" +
	"#.#     #.....#     #.#<br>" +
	"#.#######.....###/###.#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#.....................+<br>" +
	"#.#/#/#/##............+<br>" +
	"#.#Park  #............+<br>" +
	"#.#      /............#<br>" +
	"#.#      #..####/####.#<br>" +
	"#.#      /..#Weapons#.#<br>" +
	"#.#      #..#       #.#<br>" +
	"#.#      /..#       #.#<br>" +
	"#.########..#       #.#<br>" +
	"#...........#########.#<br>" +
	"#.....................#<br>" +
	"#.....................#<br>" +
	"#######################<br>" + "</tt>";

	actions = {stores:[]};
	
	// Generate Armory
	var armory = {name:"Armory", items:[], entrances:[{x:7, y:4}]};
		var dagger = {name:"Dagger", cost:1};
		armory.items.push(dagger);
		var bow = {name:"Simple Bow", cost:1};
		armory.items.push(bow);
		var wand = {name:"Wand", cost:1};
		armory.items.push(wand);
	actions.stores.push(armory);
	
	GenCharacter(10, 10);
	
	PrintMap();
}