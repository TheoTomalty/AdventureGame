function GetGlobe(){
  var player = localStorage.getObj("player");
  return "<tt style=\"letter-spacing: 10px;\">" + TemplReplGlobe(player.last_save.globe_loc, "@") + "</tt>";
}

function GetEnvironment(position){
  for (var i = 0; i < global_environments.length; ++i){
    if (global_environments[i].globe_loc.x == position.x && global_environments[i].globe_loc.y == position.y){
      return global_environments[i];
    }
  }
}

function ReplaceGlobe(position, ch){
	global_map = global_map.replaceAt(GetGlobeElement(position.x, position.y), ch);
}

function TemplReplGlobe(position, ch) {
	var new_map = global_map.replaceAt(GetGlobeElement(position.x, position.y), ch);
	return new_map;
}

function GetGlobeElement(x, y){
	return 18*y + x;
}
