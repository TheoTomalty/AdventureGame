function Develop(){
  //develop_mode = true;
  //document.getElementById("myNav").style.width = "100%";
  var new_world = new World("Test");
  var box_manager = new BoxManager();
  new_world.Display();
  box_manager.Display(new_world);
}

function ExitDevelop(){
  develop_mode = false;
  document.getElementById("myNav").style.width = "0%";
}
