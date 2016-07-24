function PropertyList(){
	this.properties = [];

  this.AddProperty = function(key, type){
    this.properties.push(new Property(key, type));
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

  this.GetPropertyByName = function(prop_name){
    for (var i = 0; i < this.Size(); ++i){
      if (this.GetProperty(i).GetName() == prop_name){
  		    return this.GetProperty(i);
      }
    }
	}

  this.SetPropertyByName = function(prop_name, val){
    this.GetPropertyByName(prop_name).SetValue(val);
  }

}

function Property(name, type){
	this.name = name;
	this.type = type;
  this.value = null;

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
}

function ContainerList(){
	this.containers = [];

  for (var i = 0; i < arguments.length; ++i){
    this.containers.push(new Container(arguments[i]));
  }

	this.Size = function(){
		return this.containers.length;
	}

	this.GetContainer = function(i){
		return this.containers[i];
	}

  this.GetContainerByClass = function(class_name){
    for (var i = 0; i < this.Size(); ++i){
      if (IsClass(this.GetContainer(i).GetConstructor(), class_name)){
  		    return this.GetContainer(i);
      }
    }
	}
}

function Container(Constructor){
  this.Constructor = Constructor;
  this.elements = [];

  this.Size = function(){
    return this.elements.length;
  }

  this.Add = function(obj){
    this.elements.push(obj);
  }

  this.GetElement = function(i){
    return this.elements[i];
  }

  this.GetConstructor = function(){
    return this.Constructor;
  }
}


var DecoratedContainer = function(){
  this.property_list = null;
  this.container_list = null;

  this.GetPropertyList = function(){
    return this.property_list;
  }

  this.GetContainerList = function(){
    return this.container_list;
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
      new_array.push(new Interaction("New " + GetClass(container.GetConstructor()), this, "New", container.GetConstructor()));
      for (var j = 0; j < container.Size(); ++j){
        var element = container.GetElement(j);
        new_array.push(element.GetInteraction());
      }
    }
    new_box.interactions = new_array;
    return new_box;
  }

  this.DisplayBox = function(){
    develop_manager.DisplayBox(this);
  }

  this.GetProperty = function(key){
    return this.GetPropertyList().GetPropertyByName(key);
  }

  this.AddProperty = function(key, type){
    this.GetPropertyList().AddProperty(key, type);
  }

  this.SetPropertyValue = function(key, val){
    return this.GetProperty(key).SetValue(val);
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
}
