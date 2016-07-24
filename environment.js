var Environment = Inherits(Mapable, function(world){
  //Hidden
  this.class = "Environment";
  MapEmbedded.call(this, world);

  //Properties
  this.SetPropertyList(new PropertyList(["Name", "text"], ["Size", "int"], ["Symbol", "char"]));
  this.SetContainerList(new ContainerList(Store));//Store, NPC, Chest


  this.GetHiddenNames = function(){
    return ["class", "skipped"];
  }

  this.Open = function(){
    this.Display();
    this.DisplayBox();
  }
});
