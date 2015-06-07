function FightEnemy(num) {
	if (num == 0){
		can_move = false;
		var player = localStorage.getObj("player");
		InitializeBox("Your Health: " + player.health + "<br>Enemy Health: " + box.npc.health);
		box.functs = HitEnemy;
	
		NewListElement("Strong Attack");
		NewListElement("Swift Attack");
	
		PrintBox();
	}
}

function HitEnemy(num){
	var player = localStorage.getObj("player");
	var enemy = box.npc;
	
	var your_strength = 1 + player.strength;
	var your_speed = 1 + player.speed;
	
	var your_damage;
	if (player.weapon){
		your_damage = player.weapon.damage;
	}
	else {
		your_damage = 10;
	}
	
	var your_resistance;
	if (player.armour){
		your_resistance = player.armour.resistance;
	}
	else {
		your_resistance = 1;
	}
	
	var enemy_strength = 1 + enemy.strength;
	var enemy_speed = 1 + enemy.speed;
	
	var enemy_damage;
	if (enemy.weapon){
		enemy_damage = enemy.weapon.damage;
	}
	else {
		enemy_damage = 10;
	}
	
	var enemy_resistance;
	if (enemy.armour){
		enemy_resistance = enemy.armour.resistance;
	}
	else {
		enemy_resistance = 1;
	}
	
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
	
	var your_hit_chance = 0.5 * Math.sqrt(your_speed/enemy_speed);
	if (Math.random() < your_hit_chance){
		var damage = your_damage * your_strength / enemy_resistance;
		enemy.health -= damage;
	}	
	
	var enemy_hit_chance = 0.5 * Math.sqrt(enemy_speed/your_speed);
	if (Math.random() < enemy_hit_chance){
		var damage = enemy_damage * enemy_strength / your_resistance;
		player.health -= damage;
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
		FightEnemy(0);
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

