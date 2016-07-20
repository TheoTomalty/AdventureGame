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
    develop_manager.creation_manager.Create(new Environment(), this.obj);
  }

  this.Add = function(env){
    this.environments.push(env);
  }

  this.GetMap = function() {
    var new_map = new Map(this.size);
    for (var i = 0; i < this.environments.length; ++i){
      for (var j = 0; j < this.environments[i].positions.length; ++j){
        new_map.SetChar(this.environments[i].positions[j], this.environments[i].ch);
      }
    }
    return new_map;
  }

  this.GetBox = function(){
    var new_box = new Box();
    var new_array = [];
    new_array.push(new Interaction("New Env", this, this.NewEnvironment));
    for (var i = 0; i < this.environments.length; ++i){
      new_array.push(this.environments[i].GetInteraction());
    }
    new_box.head = this.name;
    new_box.interactions = new_array;
    return new_box;
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

function ReplaceWorld(position, ch){
	world_map = world_map.replaceAt(GetWorldElement(position.x, position.y), ch);
}

function TemplReplWorld(position, ch) {
	var new_map = world_map.replaceAt(GetWorldElement(position.x, position.y), ch);
	return new_map;
}

function GetWorldElement(x, y){
	return 18*y + x;
}
