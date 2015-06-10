function ShowChest(){
	if (box.current_interaction.type == "chest"){
		var player = localStorage.getObj("player");
		var chest = box.current_interaction;
		
		InitializeTitle(chest.name);
		for (var i = 0; i < chest.items.length; ++i){
			NewListElement(chest.items[i].name, partial(ViewItem, chest.items[i]));
		}
		PrintBox();
	}
}