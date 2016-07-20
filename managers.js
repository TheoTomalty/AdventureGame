function DevelopManager(){
  this.activated = false;
  this.map_manager = new MapManager();
  this.box_manager = new BoxManager();

  this.Activate = function(){
    game_started = false;
    this.activated = true;
  }

  this.Deactivate = function(){
    this.activated = false;
  }
}

function MapManager(){
  //Take some of the methods from World(), like BoxManager deos to Box()
  //Generalizes world and environment into one manager, and any other future layers
  this.name = "";
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
