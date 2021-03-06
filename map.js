function Map(size) {
	this.size = size;
	this.map = FixedArray([size, size], ".");

	this.SetChar = function(position, char){
		var index = this.GetIndex(position);
		this.map[index[0]][index[1]] = char;
	}

	this.GetChar = function(position) {
		var index = this.GetIndex(position);
		return this.map[index[0]][index[1]];
	}

	this.GetPosition = function(i, j){
		return new Position(j, i);
	}

	this.GetIndex = function(position){
		return [position.y, position.x];
	}
}

var MapEmbedded = function(embed){
	this.AddProperty("Symbol", "char");
	this.skipped = new Property("skipped", "bool", false); this.AddKey("skipped");
  this.positions = new Container("positions", Position); this.AddKey("positions");

  this.parent = embed;

	this.NumPositions = function(){
		return this.positions.Size();
	}

	this.GetPosition = function(i){
		return this.positions.GetElement(i);
	}

  this.AddPosition = function(x, y){
    this.positions.Add(new Position(x, y));
  }

  this.IsInitialized = function(){
    return (this.skipped.GetValue() || this.positions.Size());
  }

  this.PositionSetter = function(){
    var new_box = new Box(this.GetName());
    new_box.interactions = [new Interaction("Save", this, "Save"), new Interaction("Skip", this, "Skip")];

		develop_manager.box_manager.DisplayBox(new_box);
    develop_manager.map_manager.OnClickSession("AddPosition", this);
  }

  this.Skip = function(){
    this.skipped.SetValue(true);
    this.View();
  }

  this.Save = function(){
		//alert(JSON.stringify(develop_manager.world.GetDict()));
		develop_manager.SaveWorld();
    this.View();
  }

  this.GetInteraction = function(){
    return new Interaction(this.GetName(), this, "View");
  }

  this.View = function(){
    if (!this.IsInitialized()){
      this.PositionSetter();
    }
    else{
      this.Open();
    }
  }
}

var Mapable = function(){
  this.AddProperty("Size", "int");

  this.GetSize = function(){
    return this.GetPropertyValue("Size");
  }

  this.GetMap = function() {
    var new_map = new Map(this.GetSize());
    var container_list = this.GetContainerList();
    for (var i = 0; i < container_list.Size(); ++i){
      var container = container_list.GetContainer(i);
      for (var j = 0; j < container.Size(); ++j){
        var element = container.GetElement(j);
				if (element.hasOwnProperty("parent") && element.parent.GetName() == this.GetName()){
        	for (var k = 0; k < element.NumPositions(); ++k){
          	new_map.SetChar(element.GetPosition(k), element.GetPropertyValue("Symbol"));
        	}
				}
      }
    }
    return new_map;
  }

  this.DisplayMap = function(){
    develop_manager.DisplayMap(this);
  }

	this.DisplayBoth = function(){
    develop_manager.DisplayBoth(this);
  }
}

FixedArray = function(dims, element){
	var new_array = [];
	var object_pushed = element;
	for (var i = 0; i < dims.length; ++i){
		for (var j = 0; j < dims[i]; ++j){
			if (object_pushed == element){
				new_array.push(object_pushed);
			}
			else {
				var new_object = object_pushed.slice();
				new_array.push(new_object);
			}
		}
		object_pushed = new_array;
		new_array = [];
	}
	return object_pushed;
}

// Reloads Screen with updated variables
function PrintMap(){
	new_map = TempReplMap(character, "@");

	// Print Screen
	document.getElementById("map").innerHTML = new_map;
	GenerateBox();
}

function TempReplMap(position, ch) {
	var new_map = map.replaceAt(GetElement(position.x, position.y), ch);
	return new_map;
}

function ReplaceMap(position, ch){
	map = map.replaceAt(GetElement(position.x, position.y), ch);
}

function GetElement(x, y){
	return 4 + 27 + 27 * y + (x + 1);
	// <tt>, top line, lines above, sideways characters
}

function GetMapElement(position){
	return map.charAt(GetElement(position.x, position.y));
	// <tt>, top line, lines above, sideways characters
}
