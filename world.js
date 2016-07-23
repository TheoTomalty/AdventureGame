//World prototype
function World(name) {
  this.name = name;
  this.size = 20;
  this.environments = [];

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

  this.GetMap = function() {
    var new_map = new Map(this.size);
    for (var i = 0; i < this.environments.length; ++i){
      for (var j = 0; j < this.environments[i].positions.length; ++j){
        new_map.SetChar(this.environments[i].positions[j], this.environments[i].symbol);
      }
    }
    return new_map;
  }

  this.GetBox = function(){
    var new_box = new Box(this.name);
    var new_array = [];
    new_array.push(new Interaction("New Env", this, "NewEnvironment"));
    for (var i = 0; i < this.environments.length; ++i){
      new_array.push(this.environments[i].GetInteraction());
    }
    new_box.interactions = new_array;
    return new_box;
  }

  this.Display = function(){
    develop_manager.map_manager.Display(this);
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
