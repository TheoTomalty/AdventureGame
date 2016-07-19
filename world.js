//World prototype
function World(name) {
  this.name = name;
  this.size = 20;
  this.environments = [];

  this.GetChar = function(x, y) {
    for (var i = 0; i < this.environments.length; ++i){
      for (var j = 0; j < this.environments[i].positions.length; ++j){
        var position = this.environments[i].positions[j];
        if (position.x == x && position.y == y){
          return this.environments[i].ch;
        }
      }
    }
    return ".";
  }

  this.Map = function() {
    var new_map = [];
    for (var i = 0; i < this.size; ++i){
      var row = [];
      for (var j = 0; j < this.size; ++j){
        row.push(this.GetChar(i, j));
      }
      new_map.push(row);
    }
    return new_map;
  }

  this.mapHTML = function(){
    var new_map = this.Map();
    var map_repr = "<tt>";
    for (var i = 0; i < this.size; ++i){
      for (var j = 0; j < this.size; ++j){
        map_repr += new_map[i][j];
      }
      map_repr += "<br>";
    }
    map_repr += "</tt>";
    return map_repr;
  }

  this.Display = function(){
    document.getElementById("map").innerHTML = this.mapHTML();
  }

  this.GetBox = function(){
    var new_box = new Box();
    var new_array = [];
    for (var i = 0; i < this.environments.length; ++i){
      new_array.push(environments[i].interaction);
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
