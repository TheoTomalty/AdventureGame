//World prototype
var World = Inherits(Mapable, function(name) {
  this.name = name;
  this.size = 20;
  this.Environments = new Container(Environment);

  this.GetContainerList = function(){
    return new ContainerList(this, ["Environments"]);
  }
});

function GetWorld(){
  var player = localStorage.getObj("player");
  return "<tt style=\"letter-spacing: 10px;\">" + TemplReplWorld(player.last_save.world_loc, "@") + "</tt>";
}

function GetEnvironment(position){
  for (var i = 0; i < world_environments.length; ++i){
    if (world_environments[i].world_loc.x == position.x && world_environments[i].world_loc.y == position.y){
      return world_environments[i];
    }
  }
}

function ReplaceWorld(position, symbol){
	world_map = world_map.replaceAt(GetWorldElement(position.x, position.y), symbol);
}

function TemplReplWorld(position, symbol) {
	var new_map = world_map.replaceAt(GetWorldElement(position.x, position.y), symbol);
	return new_map;
}

function GetWorldElement(x, y){
	return 18*y + x;
}
