function GenerateBox(){
	var symbol = GetMapElement(character);
	
	box = {name:"", functs:[]};
	
	if (symbol == "."){
		box.name = "You are in " + actions.name + "<br><ol>";
			box.name += "<li>Inventory</li>";
		box.functs.push(function(){ShowInventory()});
		box.name += "</ol>";
		document.getElementById("box").innerHTML = box.name;
	}
	else if (symbol == "/"){
		
		var store;
		for (var i = 0; i < actions.stores.length; ++i){
			for (var j = 0; j < actions.stores[i].entrances.length; ++j){
				if (actions.stores[i].entrances[j].x == character.x && actions.stores[i].entrances[j].y == character.y){
					store = actions.stores[i];
				}
			}
		}
		if (store){
			box.name = "You are in " + store.name + "<br><ol>";
			for (var i = 0; i < store.items.length; ++i){
				box.name += "<li>" + store.items[i].name + " (" + store.items[i].price + "g) </li>";
			}
			box.name += "</ol>";
			document.getElementById("box").innerHTML = box.name;
		}
	}
}

function ShowInventory(){
	document.getElementById("box").innerHTML = "worked";
}