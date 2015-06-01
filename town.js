function GenerateTown(){
	ClearActions();
	actions.name = "Town";
	map = "<tt>" +
	"##########+++##########<br>" +
	"#.....................#<br>" + 
	"#.#######.....#######.#<br>" +
	"#.#Armor#.....#Gen  #.#<br>" +
	"#.#     #.....#Store#.#<br>" +
	"#.#     #...../     #.#<br>" +
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

	
	// Generate Armory
	var armory = {name:"Armory", items:[], entrances:[]};
		var entrance = {x:7, y:4};
		armory.entrances.push(entrance);
		var dagger = {name:"Dagger", cost:1};
		armory.items.push(dagger);
		var bow = {name:"Simple Bow", cost:1};
		armory.items.push(bow);
		var wand = {name:"Wand", cost:1};
		armory.items.push(wand);
	GenerateStore(armory);
	GenCharacter({x:10, y:10});
	
	PrintMap();
}