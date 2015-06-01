function GenerateBox(object){
	box = "You are in " + object.name + "<br><ol>";
	for (var i = 0; i < object.options.length; ++i){
		box += "<li>" + object.options[i].name + "</li>";
	}
	box += "</ol>";
	document.getElementById("box").innerHTML = box;
}