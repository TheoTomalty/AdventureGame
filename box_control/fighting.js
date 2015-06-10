function EngageEnemy(hits) {
	hits = hits || ["", ""];
	for (var i = 0; i < hits.length; ++i){
		if (hits[i] == "miss"){
			hits[i] = "<font style=\"color:blue;\">Miss</font>";
		}
		else if (typeof hits[i] === "number"){
			hits[i] = "<font style=\"color:red;\">" + hits[i] + "</font>";
		}
	}
	
	can_move = false;
	var player = localStorage.getObj("player");
	
	InitializeTitle("Your Health: " + player.health + " " + hits[1] + "<br>Enemy Health: " + box.current_interaction.health + " " + hits[0]);	
	NewListElement("Strong Attack", StrongAttack);
	NewListElement("Swift Attack", SwiftAttack);	
	PrintBox();
}

function StrongAttack() {
	HitEnemy("strong");
}

function SwiftAttack() {
	HitEnemy("swift");
}

function HitEnemy(attack){
	var player = localStorage.getObj("player");
	var enemy = box.current_interaction;
	
	var your_strength = 1 + player.strength;
	var your_speed = 1 + player.speed;
	var your_damage = player.equipment.weapon.damage;
	var your_resistance = player.equipment.armour.resistance;

	var enemy_strength = 1 + enemy.strength;
	var enemy_speed = 1 + enemy.speed;
	var enemy_damage = enemy.equipment.weapon.damage;
	var enemy_resistance = enemy.equipment.armour.resistance;
	
	if (attack == "strong"){
		your_strength *= 2;
		your_speed /= 2;
	}
	else if (attack == "swift"){
		your_speed *= 2;
		your_strength /= 2;
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
		return 0;
	}
	else {
		EngageEnemy([your_hit, enemy_hit]);
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

	var corpse_name = "Corpse of " + box.current_interaction.name;
	GenerateChest({name:corpse_name, type:"chest", items:box.current_interaction.loot, positions:box.current_interaction.positions});
	ClearInteraction(); // No longer interacting with place the chest dropped
	PrintMap();
}

