var Environment = Inherits(Mapable, function(world){
  //Hidden
  this.class = "Environment";
  this.skipped = false;
  this.parent = world;
  this.positions = [];

  //Properties
  this.name = "";
  this.symbol = "";

  //Containers
  //this.Stores = new Container(Store);
  //this.NPCs = new Container(NPC);
  //this.Chests = new Container(Chest);

  this.GetPropertyList = function(){
    return new PropertyList(this, ["name", "symbol"]);
  }

  this.GetContainerList = function(){
    return new ContainerList(this, ["Stores", "NPCs", "Chests"]);
  }

  this.GetInteraction = function(){
    return new Interaction(this.name, this, "View");
  }

  this.SetPosition = function(x, y){
    var position = new Position(x, y);
    this.positions.push(position);
  }

  this.PositionSetter = function(){
    var new_box = new Box(this.name);
    new_box.interactions = [new Interaction("Save", this, "Save"), new Interaction("Skip", this, "Skip")];
    develop_manager.box_manager.DisplayBox(new_box);

    develop_manager.map_manager.OnClickSession("SetPosition", this);
  }

  this.Skip = function(){
    this.skipped = true;
    develop_manager.Display(this);
  }

  this.Save = function(){
    develop_manager.Display(this);
  }

  this.View = function(){
    if (!this.skipped && this.positions !== 'undefined'){
      this.PositionSetter();
    }
    else{
      develop_manager.Display(env);
    }
  }

  this.Display = function(){
    develop_manager.map_manager.Display(this);
  }
});
