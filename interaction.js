function Interaction(name, obj, exec){
  this.name = name;
  this.parent = obj;
  this.executable = exec

  this.Process = function(){
    obj[this.executable]();
  }
}

function PropertyList(obj, keys){
	this.keys = keys;
	this.obj = obj;

	this.Size = function(){
		return this.keys.length;
	}

	this.GetProperty = function(i){
		return new Property(obj, keys[i]);
	}
}

function Property(obj, key){
	this.key = key;
	this.obj = obj;
	this.value = function(){
		return obj[key];
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
		return new Container(obj, keys[i]);
	}
}

function Container(obj, key){
	this.key = key;
	this.obj = obj;
}
