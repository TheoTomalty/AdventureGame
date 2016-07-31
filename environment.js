var Environment = function(world){
  this.class = "Environment";
  DecoratedContainer.call(this);

  //Map Functionality
  MapEmbedded.call(this, world);
  Mapable.call(this);

  //Properties
  this.AddContainer("Store", Store);//Store, NPC, Chest

  this.Open = function(){
    this.Display();
    this.DisplayBox();
  }
}
