//To read the html timetable
function readTable(table, targetPath){
	window.alert(data.rows.length);
	$(".".concat(table)).load(targetPath);
	var data = document.getElementsByClassName(table);
	document.getElementById("test").innerHTML = "boo "+data.rows.length+" rows in the table"
}
