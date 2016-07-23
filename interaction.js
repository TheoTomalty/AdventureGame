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

function PropertyList(obj, keys){
	this.keys = keys;
	this.obj = obj;

	this.Size = function(){
		return this.keys.length;
	}

	this.GetProperty = function(i){
		return new Property(this.obj, this.keys[i]);
	}
}

function Property(obj, key){
	this.key = key;
	this.obj = obj;

	this.value = function(){
		return this.obj[this.key];
	}
	this.type = function(){
		return typeof this.value;
	}
}

function ContainerList(obj, keys){
	this.keys = keys;
	this.obj = obj;

	this.Size = function(){
		return this.keys.length;
	}

	this.GetContainer = function(i){
		return this.obj[this.keys[i]];
	}

  this.GetContainerByClass = function(class_name){
    for (var i = 0; i < this.keys.length; ++i){
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
