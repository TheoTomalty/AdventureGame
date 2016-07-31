//World prototype
var World = function(name) {
  this.class = "World";
  DecoratedContainer.call(this);
  Mapable.call(this);

  this.AddContainer("Env", Environment);
  this.SetPropertyValue("Name", name);
  this.SetPropertyValue("Size", 20);

  this.Open = function(){
    this.SetObject();
    this.DisplayMap();
    this.DisplayBox();
  }
}

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
