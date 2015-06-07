function BrowsePlayer(num){
	var player = localStorage.getObj("player");

	if (num == 0){
		box = {name:"", functs:EquipItem};
		InitializeBox("Your Inventory");
		NewListElement("Gold: " + player.gold);
		for(var i = 0; i < player.items.length; ++i){
			box.name += "<li>" + player.items[i].name + "</li>";
		}
		PrintBox();
	}
	else if (num == 1){
		box = {name:"", functs:LevelStat};
		InitializeBox("You are level " + player.level + "<br>" + "Strength: " + player.strength + " Speed: "  + player.speed);
		NewListElement("Level Strength");
		NewListElement("Level Speed");
		PrintBox();
	}
}

function LevelStat(num){
	var player = localStorage.getObj("player");
	if (num == 0 && GetFreePoints()){
		player.strength += 1;
	}
	else if (num == 1 && GetFreePoints()){
		player.speed += 1;
	}
	localStorage.setObj("player", player);
	BrowsePlayer(1);
}

function EquipItem(num){
	var player = localStorage.getObj("player");
	if (player.items[num - 1]){
		player.weapon = player.items[num - 1];
	}
	localStorage.setObj("player", player);
}

function GetFreePoints(){
	var player = localStorage.getObj("player"); 
	return player.level - player.strength - player.speed;
}
