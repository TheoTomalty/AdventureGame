var Environment = function(world){
  this.class = "Environment";
  DecoratedContainer.call(this);

  //Map Functionality
  MapEmbedded.call(this, world);
  Mapable.call(this);

  //Properties: Wall, Store, NPC, Chest
  this.AddContainer("Wall", Wall);
  this.AddContainer("Store", Store);
  this.AddContainer("NPC", NPC);

  this.Open = function(){
    this.SetObject();
    this.DisplayBoth();
  }
}

var Wall = function(env){
  this.class = "Wall";
  DecoratedContainer.call(this);
  MapEmbedded.call(this, env);

  this.Open = function(){
    this.SetObject();
    this.DisplayBox();
  }
}
