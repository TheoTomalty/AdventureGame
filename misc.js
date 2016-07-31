function Position(x, y){
  this.class = "Position";
	this.x = x;
	this.y = y;

	this.GetAbsIndex = function(size){
		return y*size + x;
	}

	this.GetString = function(){
		return "(" + this.x + ", " + this.y + ")";
	}

	this.GetDict = function(){
		return {x:this.x, y:this.y};
	}

	this.LoadDict = function(dict){
		this.x = dict.x;
		this.y = dict.y;
	}
}

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
