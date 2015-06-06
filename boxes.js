function GenerateBox(){
	var symbol = GetMapElement(character);
	
	if (symbol == "."){
		box = {name:"", functs:ShowPage};

		box.name = "You are in " + actions.name + "<br><ol>";
		box.name += "<li>Inventory</li>";
		box.name += "<li>Stats"
		if (GetFreePoints()){
			box.name += " (" + GetFreePoints() + ")";
		}
		box.name += "</li>";
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
			ShowStoreBox();
		}
	}
	else if (symbol == " "){
		if (box.store){
			ShowStoreBox();
		}	
	}
}

function ShowStoreBox(){
	box.name = "You are in " + box.store.name + "<br><ol>";
	
	for (var i = 0; i < box.store.items.length; ++i){
		box.name += "<li";
		if (localStorage.getItem(ItemToLocal(box.store.items[i])) == 1){
			box.name += " style=\"color:blue;\"";
		}
		else if (box.store.items[i].price > localStorage.getItem("player:gold")){
			box.name += " style=\"color:grey;\"";
		}
		box.name += ">" + box.store.items[i].name + " (" + box.store.items[i].price + "g) </li>";
	}
	box.name += "</ol>";
	document.getElementById("box").innerHTML = box.name;
}

function ShowPage(i){
	if (i == 0){
		box = {name:"", functs:NullFunction};
		box.name = "Your Inventory<br><ol>";
		box.name += "<li>Gold: " + localStorage.getItem("player:gold") + "</li>";
		for(var i in window.localStorage){
			if (LocalStringElement(i, 0) == "item" && localStorage.getItem(i) == 1){
				box.name += "<li>" + LocalStringElement(i, 2) + "</li>";
			}
		}
		box.name += "</ol>";
		document.getElementById("box").innerHTML = box.name;
	}
	else if (i == 1){
		box = {name:"", functs:NullFunction};
		box.name = "You are level " + localStorage.getItem("player:level") + "<br>";
		box.name += "Attack: " + localStorage.getItem("player:attack") + " Defence: "  + localStorage.getItem("player:defence") + "<br><ol>";
		box.name += "<li>Level Attack</li>";
		box.name += "<li>Level Defence</li></ol>";
		document.getElementById("box").innerHTML = box.name;
	}
}

function BuyItem(i){
	var item = box.store.items[i];
	var after_gold = localStorage.getItem("player:gold") - box.store.items[i].price;
	if (after_gold >= 0 && !(item.type == "item" && localStorage.getItem(ItemToLocal(item)) == 1)){
		if (item.type == "item"){
			localStorage.setItem("player:gold", after_gold);
			localStorage.setItem(ItemToLocal(item), 1);
		}
		else if (item.type == "instant"){
			localStorage.setItem("player:gold", after_gold);
		}
	}
	GenerateBox();
}

function GetFreePoints(){
	return localStorage.getItem("player:level") - localStorage.getItem("player:attack") - localStorage.getItem("player:defence");
}