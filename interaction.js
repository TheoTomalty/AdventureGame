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

function ContainerList(obj, keys, types){
	this.keys = keys;
	this.obj = obj;
  this.types = types;

	this.Size = function(){
		return this.keys.length;
	}

	this.GetContainer = function(i){
		return new Container(this.obj, this.keys[i], this.types[i]);
	}
}

function Container(obj, key, constructor){
	this.key = key;
	this.obj = obj;
  this.constructor = constructor;

  this.Size = function(){
    return this.obj[this.key].length;
  }

  this.GetElement = function(i){
    return this.obj[this.key][i];
  }

  this.GetObject = function(){
    return this.obj;
  }

  this.GetConstructor = function(){
    return this.constructor;
  }
}
