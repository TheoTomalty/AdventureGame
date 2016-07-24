function Position(x, y){
	this.x = x;
	this.y = y;

	this.GetAbsIndex = function(size){
		return y*size + x;
	}

	this.GetString = function(){
		return "(" + this.x + ", " + this.y + ")";
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
