function GenerateBox(){
	var symbol = GetMapElement(character);
	
	if (symbol == "."){
		box = {name:"", functs:ShowPage};

		box.name = "You are in " + actions.name + "<br><ol>";
		box.name += "<li>Inventory</li>";
		//box.functs.push(ShowInventory);
		box.name += "</ol>";
		document.getElementById("box").innerHTML = box.name;
	}
	else if (symbol == "/"){
		box = {name:"", store:null, functs:BuyItem};

		for (var i = 0; i < actions.stores.length; ++i){
			for (var j = 0; j < actions.stores[i].entrances.length; ++j){
				if (actions.stores[i].entrances[j].x == character.x && actions.stores[i].entrances[j].y == character.y){
					box.store = actions.stores[i];
				}
			}
		}
		if (box.store){
			box.name = "You are in " + box.store.name + "<br><ol>";

			for (var i = 0; i < box.store.items.length; ++i){
				box.name += "<li>" + box.store.items[i].name + " (" + box.store.items[i].price + "g) </li>";
				//box.functs.push(BuyItem);
			}
			box.name += "</ol>";
			document.getElementById("box").innerHTML = box.name;
		}
	}
}

function ShowPage(i){
	document.getElementById("box").innerHTML = "worked";
}

function BuyItem(i){
	document.getElementById("box").innerHTML = i;
}