function GenerateBox(){
	var symbol = GetMapElement(character);
	
	if (symbol == "."){
		box = "You are in " + actions.name + "<br><ol>";
		box += "<li>Inventory</li>";
		box += "</ol>";
		document.getElementById("box").innerHTML = box;
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
			box = "You are in " + store.name + "<br><ol>";
			for (var i = 0; i < store.items.length; ++i){
				box += "<li>" + store.items[i].name + " (" + store.items[i].price + "g) </li>";
			}
			box += "</ol>";
			document.getElementById("box").innerHTML = box;
		}
	}
}