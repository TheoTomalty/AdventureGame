function Environment(){
  this.class = "environment";
  this.name = "";
  this.ch = "";
  this.positions = [];
  this.stores = [];
  this.NPCs = [];
  this.chests = [];
  this.gates = [];

  this.GetPropertyList = function(){
    return new PropertyList(this, ["name", "ch"]);
  }

  this.GetInteraction = function(){
    return new Interaction(this.name, this, function(){return null;})
  }
}
