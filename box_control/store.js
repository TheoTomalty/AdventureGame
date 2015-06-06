function ShowStore(){
	var player = localStorage.getObj("player");

	InitializeBox("You are in " + box.store.name);

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
	PrintBox();
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
