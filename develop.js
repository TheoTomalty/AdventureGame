function Develop(){
  develop_manager.Activate();
  //develop_mode = true;
  //document.getElementById("myNav").style.width = "100%";
  var new_world = new World("Test");
  new_world.Display();
  develop_manager.box_manager.Display(new_world);
}

function ExitDevelop(){
  develop_mode = false;
  document.getElementById("myNav").style.width = "0%";
}
