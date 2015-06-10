function ShowStore(){
	if (box.current_interaction.type == "store"){
		var player = localStorage.getObj("player");
		var store = box.current_interaction;

		InitializeTitle("You are in " + store.name + " (" + player.gold + "g)");

		for (var i = 0; i < box.current_interaction.items.length; ++i){
			NewListElement(store.items[i].name + " (" + store.items[i].price + "g)", partial(ViewItem, store.items[i]), HasItem(store.items[i]), store.items[i].price > player.gold); // Pass Argument
		}
		PrintBox();
	}
}

function HasItem(item){
	var player = localStorage.getObj("player");
	
	if (ContainsObject(item, player.items)){
		return true;
	}
	if (player.equipment[item.use] && player.equipment[item.use].name == item.name){
		return true;
	}
	return false;
}