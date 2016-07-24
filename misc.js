function Interaction(name, obj, exec){
  this.name = name;
  this.obj = obj;
  this.executable = exec;
  this.arg = Array.prototype.slice.call(arguments)[3] || null;

  this.Process = function(){
    if (this.arg === null){
      this.obj[this.executable]();
    }
    else {
      this.obj[this.executable](this.arg);
    }
  }
}

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
