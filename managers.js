function DevelopManager(){
  this.activated = false;
  this.map_manager = new MapManager();
  this.box_manager = new BoxManager();
  this.creation_manager = new CreationManager();
  this. object_manager = new ObjectManager();


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
  this.name = "";
  this.current_map = null;

  this.SetCurrentMap = function(obj){
    this.current_map = obj;
  }

  this.mapHTML = function(element_list){
    var map_repr = "<tt>";
    for (var i = 0; i < element_list.length; ++i){
      for (var j = 0; j < element_list[i].length; ++j){
        map_repr += element_list[i][j];
      }
      map_repr += "<br>";
    }
    map_repr += "</tt>";
    return map_repr;
  }

  this.Display = function(obj){
		this.SetCurrentMap(obj.GetMap());
    document.getElementById("map").innerHTML = this.mapHTML(this.current_map.map);
  }

  this.Refresh = function(){
    document.getElementById("map").innerHTML = this.mapHTML();
  }

  this.OnClickSession = function(funct_string, obj){
    if (obj !== null){
      develop_manager.object_manager.SetObject(obj);
    }
    this.Display(develop_manager.object_manager.current_object.parent);
    develop_manager.map_manager.SetOnClick(funct_string);
  }

  this.SetOnClick = function(funct_string){
    var new_list = [];
    for (var i = 0; i < this.current_map.size; ++i){
      var new_row = [];
      for (var j = 0; j < this.current_map.size; ++j){
        var position = this.current_map.GetPosition(i, j);
        var element = "<a href=\"#\" onclick=\"develop_manager.object_manager.current_object." + funct_string + position.GetString() + ";"
                      + " develop_manager.map_manager.OnClickSession(\'" + funct_string + "\', null);" + "\">" + this.current_map.map[i][j] + "</a>";
        new_row.push(element);
      }
      new_list.push(new_row);
    }
    document.getElementById("map").innerHTML = this.mapHTML(new_list);
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

  this.Refresh = function(){
		document.getElementById("box").innerHTML = this.boxHTML();
	}

  this.DisplayBox = function(box_obj){
    this.current_box = box_obj;
    this.Refresh();
  }
}

function CreationManager(){
  this.current_object = null;

  this.SetCurrentObj = function(obj){
    this.current_object = obj;
  }

  this.createHTML = function(){
    var html = "New " + this.current_object.class + "<br><ul>";
    var property_list = this.current_object.GetPropertyList();
    for (var i = 0; i < property_list.Size(); ++i){
      var property = property_list.GetProperty(i);
      html += "<li>" + property.name;
      html += "<input type=\"text\" name=\"" + property.name + "\" id=\"" + property.name + "\">";
      html += "</li>";
    }
    html += "</ul><input type=\"submit\" value=\"Create\" onclick=\"develop_manager.creation_manager.Save()\">";
    return html;
  }

  this.Create = function(obj){
    this.SetCurrentObj(obj);
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
      property.SetValue(document.getElementById(property.name).value);
    }

    this.current_object.parent.Add(this.current_object);
    this.Exit();
  }
}

function ObjectManager(){
  this.current_object = null;

  this.SetObject = function(obj){
    this.current_object = obj;
  }
}
