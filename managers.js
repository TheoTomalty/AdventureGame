function DevelopManager(){
  this.activated = false;
  this.map_manager = new MapManager();
  this.box_manager = new BoxManager();
  this.creation_manager = new CreationManager();

  this.current_display = null;

  this.SetCurrentDisplay = function(obj){
    this.current_display = obj;
  }

  this.Activate = function(){
    game_started = false;
    this.activated = true;
  }

  this.Deactivate = function(){
    this.activated = false;
  }

  this.Refresh = function(){
    this.map_manager.Display(this.current_display);
    this.box_manager.Display(this.current_display);
  }

  this.Display = function(obj){
    this.SetCurrentDisplay(obj);
    this.Refresh();
  }

}

function MapManager(){
  //Take some of the methods from World(), like BoxManager does to Box()
  //Generalizes world and environment into one manager, and any other future layers
  this.name = "";
  this.current_map = null;

  this.SetCurrentMap = function(obj){
    this.current_map = obj;
  }

  this.mapHTML = function(){
    var map_repr = "<tt>";
    for (var i = 0; i < this.current_map.size; ++i){
      for (var j = 0; j < this.current_map.size; ++j){
        map_repr += this.current_map.map[i][j];
      }
      map_repr += "<br>";
    }
    map_repr += "</tt>";
    return map_repr;
  }

  this.Display = function(obj){
		this.SetCurrentMap(obj.GetMap());
    document.getElementById("map").innerHTML = this.mapHTML();
  }
}

function BoxManager(){
  this.current_box = null;

  this.SetCurrentBox = function(obj){
    this.current_box = obj;
  }

	this.boxHTML = function(){
		var html = this.current_box.head + "<br>";
		var exists_something = false;
		if (this.current_box.body != ""){
			exists_something = true;
			html += "<p>" + this.current_box.body + "</p>";
		}
		if (this.current_box.interactions.length != 0){
			exists_something = true;
			html += "<ol>";
			for (var i = 0; i < this.current_box.interactions.length; ++i){
				html += "<li>" + this.current_box.interactions[i].name + "</li>";
			}
			html += "</ol>";
		}
		if (!exists_something) {
			html += "<br><-- Nothing Here -->";
		}

		return html;
	}

	this.Display = function(obj){
		this.SetCurrentBox(obj.GetBox());
		document.getElementById("box").innerHTML = this.boxHTML();
	}
}

function CreationManager(){
  this.current_object = null;
  this.current_parent = null;

  this.SetCurrentObj = function(obj, parent){
    this.current_object = obj;
    this.current_parent = parent;
  }

  this.createHTML = function(){
    var html = "New " + this.current_object.class.capFirst() + "<br><ul>";
    var property_list = this.current_object.GetPropertyList();
    for (var i = 0; i < property_list.Size(); ++i){
      var property = property_list.GetProperty(i);
      html += "<li>" + property.key;
      html += "<input type=\"text\" name=\"" + property.key + "\" id=\"" + property.key + "\">";
      html += "</li>";
    }
    html += "</ul><input type=\"submit\" value=\"Create\" onclick=\"develop_manager.creation_manager.Save()\">";
    return html;
  }

  this.Create = function(obj, parent){
    this.SetCurrentObj(obj, parent);
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("create").innerHTML = this.createHTML();
  }

  this.Exit = function(){
    document.getElementById("create").innerHTML = "";
    document.getElementById("myNav").style.width = "0%";

    develop_manager.Refresh();
  }

  this.Save = function(){
    var property_list = this.current_object.GetPropertyList();
    for (var i = 0; i < property_list.Size(); ++i){
      var property = property_list.GetProperty(i);
      property.obj[property.key] = document.getElementById(property.key).value;
    }

    this.current_parent.Add(this.current_object);
    this.Exit();
  }
}
