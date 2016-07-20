function Interaction(name, exec){
  this.name = name;
  this.exectuable = exec;
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
