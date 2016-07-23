function Inherits(Parent, Child){
  Child.prototype = new Parent();
  return Child;
}

var DecoratedContainer = function(){
  this.GetBox = function(){
    var new_box = new Box(this.name);
    var new_array = [];
    var container_list = this.GetContainerList();
    for (var i = 0; i < container_list.Size(); ++i){
      var container = container_list.GetContainer(i);
      new_array.push(new Interaction("New " + container.GetType(), this, "New" + container.GetType()));
      for (var j = 0; j < container.Size(); ++j){
        var element = container.GetElement(j);
        new_array.push(element.GetInteraction());
      }
    }
    new_box.interactions = new_array;
    return new_box;
  }

  this.New = function(Class){
    develop_manager.creation_manager.Create(new Class(this));
  }
}

var Mapable = Inherits(DecoratedContainer, function(){
  this.GetMap = function() {
    var new_map = new Map(this.size);
    var container_list = this.GetContainerList();
    for (var i = 0; i < container_list.Size(); ++i){
      var container = container_list.GetContainer(i);
      for (var j = 0; j < container.Size(); ++j){
        var element = container.GetElement(j);
        for (var k = 0; k < element.positions.length; ++k){
          new_map.SetChar(element.positions[k], element.symbol);
        }
      }
    }
    return new_map;
  }
});
