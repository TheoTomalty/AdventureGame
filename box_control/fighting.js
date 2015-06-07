function FightEnemy(num, hits) {
	hits = hits || ["", ""];
	for (var i = 0; i < hits.length; ++i){
		if (hits[i] == "miss"){
			hits[i] = "<font style=\"color:blue;\">Miss</font>";
		}
		else if (typeof hits[i] === "number"){
			hits[i] = "<font style=\"color:red;\">" + hits[i] + "</font>";
		}
	}
	
	if (num == 0){
		can_move = false;
		var player = localStorage.getObj("player");
		InitializeBox("Your Health: " + player.health + " " + hits[1] + "<br>Enemy Health: " + box.npc.health + " " + hits[0]);
		box.functs = HitEnemy;
	
		NewListElement("Strong Attack");
		NewListElement("Swift Attack");
	
		PrintBox();
	}
}

function HitEnemy(num){
	var player = localStorage.getObj("player");
	var enemy = box.npc;
	var your_weapon = player.weapon || default_weapon;
	var your_armour = player.armour || default_armour;
	var enemy_weapon = enemy.weapon || default_weapon;
	var enemy_armour = enemy.armour || default_armour;
	
	var your_strength = 1 + player.strength;
	var your_speed = 1 + player.speed;
	var your_damage = your_weapon.damage;
	var your_resistance = your_armour.resistance;

	var enemy_strength = 1 + enemy.strength;
	var enemy_speed = 1 + enemy.speed;
	var enemy_damage = enemy_weapon.damage;
	var enemy_resistance = enemy_armour.resistance;
	
	if (num == 0){
		your_strength *= 2;
		your_speed /= 2;
	}
	else if (num == 1){
		your_speed *= 2;
		your_strength /= 2;
	}
	else {
		return;
	}
	
	var your_hit = "miss";
	var your_hit_chance = 0.5 * Math.sqrt(your_speed/enemy_speed);
	if (Math.random() < your_hit_chance){
		your_hit = your_damage * your_strength / enemy_resistance;
		enemy.health -= your_hit;
	}	
	
	var enemy_hit = "miss";
	var enemy_hit_chance = 0.5 * Math.sqrt(enemy_speed/your_speed);
	if (Math.random() < enemy_hit_chance){
		enemy_hit = enemy_damage * enemy_strength / your_resistance;
		player.health -= enemy_hit;
	}
	
	localStorage.setObj("player", player);
	
	if (player.health <= 0){
		Die();
	} 
	else if (enemy.health <= 0){
		KillEnemy();
		return;
	}
	else {
		FightEnemy(0, [your_hit, enemy_hit]);
	}
}

function Die(){
	var player = localStorage.getObj("player");
	player.health = 200;
	localStorage.setObj("player", player);
	
	can_move = true;
	GenerateTown();
}

function KillEnemy(){
	can_move = true;
	ReplaceMap(box.npc.position, ".");
	PrintMap();
}

