function Environment(world){
  this.class = "environment";
  this.parent = world;
  this.name = "";
  this.ch = "";
  this.positions = [];
  this.skipped = false;
  this.stores = [];
  this.NPCs = [];
  this.chests = [];
  this.gates = [];

  this.GetPropertyList = function(){
    return new PropertyList(this, ["name", "ch"]);
  }

  this.GetInteraction = function(){
    return new Interaction(this.name, partial(this.FirstCLick, this));
  }

  this.SetPosition = function(x, y){
    var position = new Position(x, y);
    this.positions.push(position);
    this.DisplayPositionLinks();
  }

  this.SetPositions = function(){
    var new_box = new Box(this.name);
    new_box.interactions = [new Interaction("Save", partial(this.Save, this)), new Interaction("Skip", partial(this.Skip, this))];
    develop_manager.box_manager.DisplayBox(new_box);

    this.DisplayPositionLinks();
  }

  this.Skip = function(env){
    env.skipped = true;
    develop_manager.Display(env);
  }

  this.Save = function(env){
    develop_manager.Display(env);
  }

  this.FirstCLick = function(env){
    if (!env.skipped && env.positions !== 'undefined'){
      env.SetPositions();
    }
    else{
      develop_manager.Display(env);
    }
  }

  this.DisplayPositionLinks = function(){
    this.parent.Display();
    develop_manager.object_manager.SetObject(this);
    develop_manager.map_manager.SetOnClick("develop_manager.object_manager.current_object.SetPosition");
  }

  this.Display = function(){
    develop_manager.map_manager.Display(this);
  }
}
