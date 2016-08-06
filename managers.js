function DevelopManager(){
  this.activated = false;
  this.wold = null;
  this.get_input = true;
  this.map_manager = new MapManager();
  this.box_manager = new BoxManager();
  this.object_manager = new ObjectManager();


  this.Activate = function(){
    game_started = false;
    this.activated = true;
  }

  this.Deactivate = function(){
    this.activated = false;
  }

  this.GetObject = function(){
    return this.object_manager.GetObject();
  }

  this.Archive = function(){
    this.map_manager.ArchiveMap();
    this.box_manager.ArchiveBox();
    this.object_manager.ArchiveObject();
  }

  this.DisplayMap = function(obj){
    this.Archive();
    this.box_manager.Refresh();
    this.map_manager.Display(obj);
  }

  this.DisplayBox = function(obj){
    this.Archive();
    this.map_manager.Refresh();
    this.box_manager.Display(obj);
  }

  this.DisplayBoth = function(obj){
    this.Archive();
    this.box_manager.Display(obj);
    this.map_manager.Display(obj);
  }

  this.Refresh = function(){
    this.box_manager.Refresh();
    this.map_manager.Refresh();
  }

  this.InitializeWorld = function(world){
    this.world = world;
    this.LoadWorld(this.world.GetName());
    this.world.Open();
  }

  this.SaveWorld = function(){
    localStorage.setObj(this.world.GetName(), this.world.GetDict());
  }

  this.LoadWorld = function(world_name){
    var dict = localStorage.getObj(world_name) || null;
    if (dict !== null){
      this.world = new World(world_name);
      this.world.LoadDict(dict);
    }
  }

  this.ProcessNumber = function(i){
    if (this.get_input){
      this.box_manager.GetBox().ProcessNumber(i);
    }
  }

  this.Back = function(){
    if (this.get_input){
      if (this.map_manager.ResetOveride() || this.box_manager.ResetOveride()){
        this.box_manager.ResetOveride()
        this.Refresh();
      }
      else {
        this.map_manager.Back();
        this.box_manager.Back();
        this.object_manager.Back();
      }
    }
  }
}

function MapManager(){
  this.name = "";
  this.map_list = [];
  this.current_map = null;
  this.map_overide = null;

  this.GetMap = function(){
    if (this.map_overide === null){
      return this.current_map.GetMap();
    }
    return this.map_overide;
  }

  this.ResetOveride = function(){
    if (this.map_overide === null){
      return false;
    }
    this.map_overide = null;
    return true;
  }

  this.SetCurrentMap = function(obj){
    this.ResetOveride();
    this.current_map = obj;
  }

  this.ArchiveMap = function(){
    this.map_list.push(this.current_map);
    //this.current_map = null;
  }

  this.Back = function(){
    var index = this.map_list.length - 1;
    if (!index){
      return;
    }
    this.SetCurrentMap(this.map_list[index]);
    this.map_list.splice(index, 1)
    if (this.current_map !== null){
      this.Refresh();
    }
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
		this.SetCurrentMap(obj);
    document.getElementById("map").innerHTML = this.mapHTML(this.GetMap().map);
  }

  this.Refresh = function(){
    document.getElementById("map").innerHTML = this.mapHTML(this.GetMap().map);
  }

  this.DisplayMap = function(map){
    this.map_overide = map;
    document.getElementById("map").innerHTML = this.mapHTML(map.map);
  }

  this.OnClickSession = function(funct_string, obj){
    if (obj !== null){
      develop_manager.object_manager.SetCurrentObj(obj);
    }
    this.Display(develop_manager.object_manager.current_object.parent);
    develop_manager.map_manager.SetOnClick(funct_string);
  }

  this.SetOnClick = function(funct_string){
    var new_list = [];
    for (var i = 0; i < this.GetMap().size; ++i){
      var new_row = [];
      for (var j = 0; j < this.GetMap().size; ++j){
        var position = this.GetMap().GetPosition(i, j);
        var element = "<a href=\"#\" onclick=\"develop_manager.object_manager.current_object." + funct_string + position.GetString() + ";"
                      + " develop_manager.map_manager.OnClickSession(\'" + funct_string + "\', null);" + "\">" + this.GetMap().map[i][j] + "</a>";
        new_row.push(element);
      }
      new_list.push(new_row);
    }
    var new_map = new Map(this.GetMap().size);
    new_map.map = new_list;
    this.DisplayMap(new_map);
  }
}

function BoxManager(){
  this.box_list = [];
  this.current_box = null;
  this.box_overide = null;

  this.GetBox = function(){
    if (this.box_overide === null){
      return this.current_box.GetBox();
    }
    return this.box_overide;
  }

  this.ResetOveride = function(){
    if (this.box_overide === null){
      return false;
    }
    this.box_overide = null;
    return true;
  }

  this.SetCurrentBox = function(obj){
    this.ResetOveride();
    this.current_box = obj;
  }

  this.ArchiveBox = function(){
    this.box_list.push(this.current_box);
    //this.current_box = null;
  }

  this.Back = function(){
    var index = this.box_list.length - 1;
    if (!index){
      return;
    }
    this.SetCurrentBox(this.box_list[index]);
    this.box_list.splice(index, 1)
    if (this.current_box !== null){
      this.Refresh();
    }
  }

	this.boxHTML = function(box_obj){
		var html = box_obj.head + "<br>";
		var exists_something = false;
		if (box_obj.body != ""){
			exists_something = true;
			html += "<p>" + box_obj.body + "</p>";
		}
		if (this.GetBox().interactions.length != 0){
			exists_something = true;
			html += "<ol>";
			for (var i = 0; i < box_obj.interactions.length; ++i){
				html += "<li>" + box_obj.interactions[i].name + "</li>";
			}
			html += "</ol>";
		}
		if (!exists_something) {
			html += "<br><-- Nothing Here -->";
		}

		return html;
	}

  this.DisplayBox = function(box_obj){
    this.box_overide = box_obj;
    document.getElementById("box").innerHTML = this.boxHTML(box_obj);
  }

	this.Display = function(obj){
		this.SetCurrentBox(obj);
		document.getElementById("box").innerHTML = this.boxHTML(this.GetBox());
	}

  this.Refresh = function(){
		document.getElementById("box").innerHTML = this.boxHTML(this.GetBox());
	}
}

function ObjectManager(){
  this.object_list = [];
  this.current_object = null;

  this.SetCurrentObj = function(obj){
    this.current_object = obj;
  }

  this.GetObject = function(){
    return this.current_object;
  }

  this.ArchiveObject = function(){
    this.object_list.push(this.current_object);
    //this.current_box = null;
  }

  this.Back = function(){
    var index = this.object_list.length - 1;
    if (!index){
      return;
    }
    this.SetCurrentObj(this.object_list[index]);
    this.object_list.splice(index, 1)
  }

  this.createHTML = function(){
    var html = "New " + this.GetObject().class + "<br><ul>";
    var property_list = this.GetObject().GetPropertyList();
    for (var i = 0; i < property_list.Size(); ++i){
      var property = property_list.GetProperty(i);
      //if (!property.IsHidden()){
      html += "<li>" + property.name;
      html += "<input type=\"text\" name=\"" + property.name + "\" id=\"" + property.name + "\">";
      html += "</li>";
      //}
    }
    html += "</ul>"
    html += "<input type=\"submit\" value=\"Create\" onclick=\"develop_manager.object_manager.Save()\">";
    html += "<input type=\"submit\" value=\"Cancel\" onclick=\"develop_manager.object_manager.Exit()\">";
    return html;
  }

  this.Create = function(obj){
    this.SetCurrentObj(obj);
    develop_manager.get_input = false;
    document.getElementById("myNav").style.width = "100%";
    document.getElementById("create").innerHTML = this.createHTML();
  }

  this.Exit = function(){
    document.getElementById("create").innerHTML = "";
    document.getElementById("myNav").style.width = "0%";

    this.SetCurrentObj(this.GetObject().parent);
    develop_manager.Refresh();
    develop_manager.get_input = true;
  }

  this.Save = function(){
    var property_list = this.GetObject().GetPropertyList();
    for (var i = 0; i < property_list.Size(); ++i){
      var property = property_list.GetProperty(i);
      //if (!property.IsHidden()){
      property.SetValue(document.getElementById(property.name).value);
      //}
    }
    //alert(this.GetObject().class);
    this.GetObject().parent.Add(this.GetObject());
    develop_manager.SaveWorld();
    this.Exit();
  }
}
