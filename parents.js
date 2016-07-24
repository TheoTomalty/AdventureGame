function Inherits(Parent, Child){
  Child.prototype = new Parent();
  return Child;
}

var DecoratedContainer = function(){
  this.property_list = null;
  this.container_list = null;

  this.GetPropertyList = function(){
    return this.property_list;
  }

  this.GetContainerList = function(){
    return this.container_list;
  }

  this.SetPropertyList = function(obj){
    this.property_list = obj;
  }

  this.SetContainerList = function(obj){
    this.container_list = obj;
  }

  this.GetBox = function(){
    var new_box = new Box(this.GetName());
    var new_array = [];
    var container_list = this.GetContainerList();
    for (var i = 0; i < container_list.Size(); ++i){
      var container = container_list.GetContainer(i);
      new_array.push(new Interaction("New " + GetClass(container.GetConstructor()), this, "New", container.GetConstructor()));
      for (var j = 0; j < container.Size(); ++j){
        var element = container.GetElement(j);
        new_array.push(element.GetInteraction());
      }
    }
    new_box.interactions = new_array;
    return new_box;
  }

  this.DisplayBox = function(){
    develop_manager.DisplayBox(this);
  }

  this.GetProperty = function(key){
    return this.GetPropertyList().GetPropertyByName(key);
  }

  this.AddProperty = function(key, type){
    this.GetPropertyList().AddProperty(key, type);
  }

  this.SetPropertyValue = function(key, val){
    return this.GetProperty(key).SetValue(val);
  }

  this.GetPropertyValue = function(key){
    return this.GetProperty(key).GetValue();
  }

  this.GetName = function(){
    return this.GetPropertyValue("Name");
  }


  this.New = function(Constructor){
    develop_manager.object_manager.Create(new Constructor(this));
  }

  this.Add = function(obj){
    this.GetContainerList().GetContainerByClass(obj.class).Add(obj);
  }
}

var Mapable = Inherits(DecoratedContainer, function(){
  this.GetSize = function(){
    return this.GetPropertyValue("Size");
  }

  this.GetMap = function() {
    var new_map = new Map(this.GetSize());
    var container_list = this.GetContainerList();
    for (var i = 0; i < container_list.Size(); ++i){
      var container = container_list.GetContainer(i);
      for (var j = 0; j < container.Size(); ++j){
        var element = container.GetElement(j);
        for (var k = 0; k < element.positions.length; ++k){
          new_map.SetChar(element.positions[k], element.GetPropertyValue("Symbol"));
        }
      }
    }
    return new_map;
  }

  this.Display = function(){
    develop_manager.Display(this);
  }
});

var MapEmbedded = function(embed){
  this.parent = embed;
  this.skipped = false;
  this.positions = [];

  this.SetPosition = function(x, y){
    var position = new Position(x, y);
    this.positions.push(position);
  }

  this.GetPositions = function(){
    return this.positions;
  }

  this.IsInitialized = function(){
    return (!this.skipped && !this.positions.length);
  }

  this.PositionSetter = function(){
    var new_box = new Box(this.GetName());
    new_box.interactions = [new Interaction("Save", this, "Save"), new Interaction("Skip", this, "Skip")];
    develop_manager.box_manager.DisplayBox(new_box);

    develop_manager.map_manager.OnClickSession("SetPosition", this);
  }

  this.Skip = function(){
    this.skipped = true;
    this.View();
  }

  this.Save = function(){
    this.View();
  }

  this.GetInteraction = function(){
    return new Interaction(this.GetName(), this, "View");
  }

  this.View = function(){
    if (this.IsInitialized()){
      this.PositionSetter();
    }
    else{
      this.Open();
    }
  }
}
