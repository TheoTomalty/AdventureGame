//World prototype
var World = Inherits(Mapable, function(name) {
  this.name = name;
  this.size = 20;
  this.environments = [];

  this.GetContainerList = function(){
    return new ContainerList(this, ["environments"], [Environment]);
  }

  this.GetEnvironment = function(position) {
		for (var i = 0; i < this.environments.length; ++i){
			for (var j = 0; j < this.environments[i].positions.length; ++j){
				var env_pos = this.environments[i].positions[j];
				if (position.x == env_pos.x && position.y == env_pos.y){
					return this.environments[i];
				}
			}
		}
		return null;
	}

  this.NewEnvironment = function(){
    develop_manager.creation_manager.Create(new Environment(this));
  }

  this.Add = function(env){
    this.environments.push(env);
  }

  this.Display = function(){
    develop_manager.map_manager.Display(this);
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
