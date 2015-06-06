var box;

function GenerateBox(){
	var symbol = GetMapElement(character);
	
	if (symbol == "."){
		box = {name:"", functs:ShowPage};

		box.name = "You are in " + environment.name + "<br><ol>";
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

		for (var i = 0; i < environment.stores.length; ++i){
			for (var j = 0; j < environment.stores[i].entrances.length; ++j){
				if (environment.stores[i].entrances[j].x == character.x && environment.stores[i].entrances[j].y == character.y){
					box.store = environment.stores[i];
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
	var player = localStorage.getObj("player");
	
	box.name = "You are in " + box.store.name + "<br><ol>";
	
	for (var i = 0; i < box.store.items.length; ++i){
		box.name += "<li";
		if (ContainsObject(box.store.items[i], player.items)){
			box.name += " style=\"color:blue;\"";
		}
		else if (box.store.items[i].price > player.gold){
			box.name += " style=\"color:grey;\"";
		}
		box.name += ">" + box.store.items[i].name + " (" + box.store.items[i].price + "g) </li>";
	}
	box.name += "</ol>";
	document.getElementById("box").innerHTML = box.name;
}

function ShowPage(i){
	var player = localStorage.getObj("player");
	
	if (i == 0){
		box = {name:"", functs:NullFunction};
		box.name = "Your Inventory<br><ol>";
		box.name += "<li>Gold: " + player.gold + "</li>";
		for(var j = 0; j < player.items.length; ++j){
			box.name += "<li>" + player.items[j].name + "</li>";
		}
		box.name += "</ol>";
		document.getElementById("box").innerHTML = box.name;
	}
	else if (i == 1){
		box = {name:"", functs:LevelStat};
		box.name = "You are level " + player.level + "<br>";
		box.name += "Attack: " + player.attack + " Defence: "  + player.defence + "<br><ol>";
		box.name += "<li>Level Attack</li>";
		box.name += "<li>Level Defence</li></ol>";
		document.getElementById("box").innerHTML = box.name;
	}
}

function BuyItem(i){
	var player = localStorage.getObj("player"); 
	
	var item = box.store.items[i];
	var after_gold = player.gold - box.store.items[i].price;
	if (after_gold >= 0 && !(item.type == "item" && ContainsObject(item, player.items))){
		if (item.type == "item"){
			player.gold = after_gold;
			player.items.push(item);
		}
		else if (item.type == "instant"){
			player.gold = after_gold;
		}
	}
	localStorage.setObj("player", player);
	GenerateBox();
}

function LevelStat(i){
	var player = localStorage.getObj("player");
	if (i == 0 && GetFreePoints()){
		player.attack += 1;
	}
	else if (i == 1 && GetFreePoints()){
		player.defence += 1;
	}
	localStorage.setObj("player", player);
	ShowPage(1);
}

function GetFreePoints(){
	var player = localStorage.getObj("player"); 
	return player.level - player.attack - player.defence;
}