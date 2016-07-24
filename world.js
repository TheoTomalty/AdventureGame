//World prototype
var World = Inherits(DecoratedContainer, function(name) {
  this.class = "World";
  Mapable.apply(this)

  this.SetPropertyList(new PropertyList(["Name", "text"], ["Size", "int"]));
  this.SetContainerList(new ContainerList(Environment));
  this.SetPropertyValue("Name", name);
  this.SetPropertyValue("Size", 20);

  this.GetHiddenNames = function(){
    return ["class"];
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
