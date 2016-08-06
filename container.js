function PropertyList(){
	this.properties = [];

  this.AddProperty = function(name, type){
    this.properties.push(new Property(name, type));
  }

  for (var i = 0; i < arguments.length; ++i){
    this.AddProperty(arguments[i][0], arguments[i][1]);
  }

	this.Size = function(){
		return this.properties.length;
	}

	this.GetProperty = function(i){
		return this.properties[i];
	}

  this.GetPropertyByName = function(key){
    for (var i = 0; i < this.Size(); ++i){
      if (this.GetProperty(i).GetName() == key){
  		    return this.GetProperty(i);
      }
    }
	}

	this.HasProperty = function(key){
		for (var i = 0; i < this.Size(); ++i){
      if (this.GetProperty(i).GetName() == key){
  		    return true;
      }
    }
		return false;
	}

  this.SetPropertyByName = function(key, val){
    this.GetPropertyByName(prop_name).SetValue(val);
  }

	this.GetDict = function(){
		var dict = {};
		for (var i = 0; i < this.Size(); ++i){
			var property = this.GetProperty(i);
			dict[property.GetName()] = property.GetDict();
		}
		return dict;
	}

	this.LoadDict = function(dict){
		for (key in dict){
			//this.AddProperty(key);
			this.GetPropertyByName(key).LoadDict(dict[key]);
		}
	}
}

function Property(name){
	this.name = name;
	this.type = "";
  this.value = null;

	if (arguments.length >= 2){
		this.type = arguments[1];
	}

	if (arguments.length >= 3){
		this.value = arguments[2];
	}

	this.GetValue = function(){
		return this.value;
	}

  this.SetValue = function(val){
		 this.value = val;
	}

  this.GetName = function(){
    return this.name;
  }

	this.GetType = function(){
		return this.type;
	}

	this.GetDict = function(){
		return {type:this.type, value:this.value};
	}

	this.LoadDict = function(dict){
		this.type = dict.type;
		this.value = dict.value;
	}

	//this.IsHidden = function(){
	//	return (this.GetType() == "hidden");
	//}
}

function ContainerList(){
	this.containers = [];

	this.AddContainer = function(name, Class){
		this.containers.push(new Container(name, Class));
	}

  for (var i = 0; i < arguments.length; ++i){
    this.AddContainer(arguments[i]);
  }

	this.Size = function(){
		return this.containers.length;
	}

	this.GetContainer = function(i){
		return this.containers[i];
	}

	this.GetContainerByName = function(cont_name){
    for (var i = 0; i < this.Size(); ++i){
      if (this.GetContainer(i).GetName() == cont_name){
  		    return this.GetContainer(i);
      }
    }
	}

  this.GetContainerByClass = function(class_name){
    for (var i = 0; i < this.Size(); ++i){
      if (IsClass(this.GetContainer(i).GetConstructor(), class_name)){
  		    return this.GetContainer(i);
      }
    }
	}

	this.GetDict = function(){
		var dict = {};
		for (var i = 0; i < this.Size(); ++i){
			var container = this.GetContainer(i);
			dict[container.GetName()] = container.GetDict();
		}
		return dict;
	}

	this.LoadDict = function(dict, obj){
		for (key in dict){
			//alert(key + ":" + JSON.stringify(dict[key]));
			//alert(this.GetContainerByName(key).GetName());
			//this.AddContainer(key, GetConstructor(dict[key].class));
			this.GetContainerByName(key).LoadDict(dict[key], obj);
		}
	}
}

function Container(name, Constructor){
	this.name = name;
	this.parent = null;
  this.Constructor = Constructor || null;
  this.elements = [];

	//if (arguments.length >= 2){
	//	this.Constructor = arguments[1];
	//}

  this.Size = function(){
    return this.elements.length;
  }

  this.Add = function(obj){
    this.elements.push(obj);
  }

	this.GetName = function(){
		return this.name;
	}

  this.GetElement = function(i){
    return this.elements[i];
  }

	//this.IsHidden = function(){
	//	if (typeof Constructor === "string" && Constructor == "hidden"){
	//		return true;
	//	}
	//	return false;
	//}

  this.GetConstructor = function(){
		//if (!this.IsHidden()){
		//	return this.Constructor;
		//}
    //alert("Attempting to Construct Hidden Object");
		return this.Constructor;
  }

	this.GetBox = function(){
		var new_box = new Box(this.GetName());
		var new_array = [];
		new_array.push(new Interaction("New " + GetClass(this.GetConstructor()), this.parent, "New", this.GetConstructor()));
		for (var j = 0; j < this.Size(); ++j){
			var element = this.GetElement(j);
			new_array.push(element.GetInteraction());
		}
		new_box.interactions = new_array;
    return new_box;
	}

	this.View = function(parent){
		this.parent = parent;
		develop_manager.DisplayBox(this);
	}

	this.GetDict = function(){
		var new_list = [];
		for (var i = 0; i < this.Size(); ++i){
			new_list.push(this.GetElement(i).GetDict());
		}
		return {class:GetClass(this.Constructor), elements:new_list};
	}

	this.LoadDict = function(dict, obj){
		for (var i = 0; i < dict.elements.length; ++i){
			var new_element = new this.Constructor(obj);
			new_element.LoadDict(dict.elements[i]);
			this.Add(new_element);
		}
	}
}


var DecoratedContainer = function(){
  this.property_list = new PropertyList(["Name", "text"]);
  this.container_list = new ContainerList();
	this.keys = ["property_list", "container_list"];

  this.GetPropertyList = function(){
    return this.property_list;
  }

  this.GetContainerList = function(){
    return this.container_list;
  }

	this.GetKey = function(i){
		return this.keys[i];
	}

	this.NumKeys = function(){
		return this.keys.length;
	}

	this.AddKey = function(key){
		this.keys.push(key);
	}

  this.SetPropertyList = function(obj){
    this.property_list = obj;
  }

  this.SetContainerList = function(obj){
    this.container_list = obj;
  }

  this.GetBox = function(){
    var new_box = new Box(this.GetName());
    var new_array = [];
    var container_list = this.GetContainerList();
    for (var i = 0; i < container_list.Size(); ++i){
      var container = container_list.GetContainer(i);
			new_array.push(new Interaction(container.GetName(), container, "View", this));
    }
    new_box.interactions = new_array;
    return new_box;
  }

  this.DisplayBox = function(){
    develop_manager.DisplayBox(this);
  }

	this.SetObject = function(){
		develop_manager.object_manager.SetCurrentObj(this);
	}

  this.GetProperty = function(key){
    return this.GetPropertyList().GetPropertyByName(key);
  }

	this.GetContainer = function(key){
    return this.GetContainerList().GetContainerByName(key);
  }

  this.AddProperty = function(name, type){
    this.GetPropertyList().AddProperty(name, type);
  }

	this.AddContainer = function(name, Class){
    this.GetContainerList().AddContainer(name, Class);
  }

  this.SetPropertyValue = function(key, val){
    this.GetProperty(key).SetValue(val);
  }

  this.GetPropertyValue = function(key){
    return this.GetProperty(key).GetValue();
  }

  this.GetName = function(){
    return this.GetPropertyValue("Name");
  }

  this.New = function(Constructor){
    develop_manager.object_manager.Create(new Constructor(this));
  }

  this.Add = function(obj){
    this.GetContainerList().GetContainerByClass(obj.class).Add(obj);
  }

	this.GetDict = function(){
		var dict = {};
		for (var i = 0; i < this.NumKeys(); ++i){
			dict[this.GetKey(i)] = this[this.GetKey(i)].GetDict();
		}

		return dict;
	}

	this.LoadDict = function(dict){
		for (key in dict){
			this[key].LoadDict(dict[key], this);
		}
	}
}
