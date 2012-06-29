var colors = ["#FFC0CB", "#FF91A4", "#E0115F", "#FF0000", "#ED1C24", 
				"#C40233", "#B31B1B", "#990000", "#800000"];
/*
var data = ({
			"David Guetta": {
							"Album": "Nothing But the Beat",
							"Num Tracks": "32"
							},
			"Michael Jackson":{
							"Album": "Bad",
							"Num Tracks": "10"
							},
			"Skrillex":{
							"Album": "Scary Monsters and nice Spirits",
							"Num Tracks": "9"
							},
			"Sum 41":{
							"Album": "Chuck",
							"Num Tracks": "13"
							},
			"Seal":{
							"Album": "Soul",
							"Num Tracks": "12"
							},
			"Justin Timberlake":{
							"Album": "What Goes Around... Comes Around",
							"Num Tracks": "5"
							},
			"Red Hot Chilli Peppers":{
							"Album": "Stadium Arcadium",
							"Num Tracks": "28"
							},
			"Bruno Mars":{
							"Album": "Doo-Wops and Hooligans",
							"Num Tracks": "10"
							},
			"Jason Mraz":{
							"Album": "We Sing. We Dance. We Steal Things.",
							"Num Tracks": "12"
							}
			});
*/

function getArr(obj) {
	var arr = new Array();

	for(var key in obj) {
		arr.push(obj[key]);
	}
					
	return arr;
}

function Matrix(arr, height, width) {
	this.width = width;
	this.height = height;
	this.matrix = arr;
	this.left = function(e) {
		var res = e-1;
		if(res < 0 || res >= arr.length || e%3 == 0) return -1;
		return res;
	}
	this.right = function(e) {
		var res = e+1;
		if(res < 0 || res >= arr.length || res%3 == 0) return -1;
		return res;
	}
	this.up = function(e) {
		var res = e-height;
		if(res < 0 || res >= arr.length) return -1;
		return res;
	}
	this.down = function(e) {
		var res = e+height;
		if(res < 0 || res >= arr.length) return -1;
		return res;
	}
}

function convert(arr) {
	var res = new Array();
	var i = 0;

	while(i < arr.length) {
		var grid = {"panel": arr[i], "seen": false};
		res.push(grid);
		i++;
	}

	return res;
}

var d = {0: "right", 1: "down", 2: "left", 3: "up"};

function color(node, color, odata) {

	node.style.backgroundColor = color;
	node.style.border = "1px solid black";
	
	console.log(odata);
	
	for(var key in odata) {
		console.log(""+key+": "+odata[key]+"");
		var p = document.createElement('div');
		var text = document.createTextNode(""+key+": "+odata[key]+"");
		p.appendChild(text);
		p.setAttribute("class", "details");
		node.appendChild(p);
	}
}

function check(m, curr) {
	var left = m.left(curr);
	var right = m.right(curr);
	var up = m.up(curr);
	var down = m.down(curr);

	var bLeft = true;
	var bRight = true;
	var bUp = true;
	var bDown = true;

	if(left != -1) bLeft = m.matrix[left]["seen"];
	if(right != -1) bRight = m.matrix[right]["seen"];
	if(up != -1) bUp = m.matrix[up]["seen"];
	if(down != -1) bDown = m.matrix[down]["seen"];

	console.log(bRight);

	return (bLeft && bRight && bUp && bDown);
}
/*
 * m is the matrix of grids
 * curr is the current index in the matrix m
 * col is the index corresponding to the color array
 */

function spiral(m, direction, curr, col, arrData) {

	console.log(curr+","+direction);

	if(check(m, curr)) return;

	var move;

	switch(direction%4)
	{
		case(0):
			move = m.right(curr);
			console.log("Moving right");
			break;
		case(1):
			move = m.down(curr);
			console.log("Moving down");
			break;
		case(2):
			move = m.left(curr);
			console.log("Moving left");
			break;
		case(3):
			move = m.up(curr);
			console.log("Moving up");
			break;
		default:
			console.log("Invalid direction");
			return;
	}
	
	if(move == -1) {
		console.log("Pane doesn't exist at "+curr);
		direction++;
		spiral(m, direction, curr, col, arrData);
		return;
	}

	if(!m.matrix[move]["seen"]) {
		console.log(curr+" not seen");
		if (arrData[col] == undefined) return;
		color(m.matrix[move]["panel"], colors[col], arrData[col]);
		col++;
		m.matrix[move]["seen"] = true;
		spiral(m, direction, move, col, arrData);
	}

	else if(m.matrix[move]["seen"]) {
		console.log(curr+" seen");
		direction++;
		spiral(m, direction, move, col, arrData);
	}
}

function execute(arrData) {
	var panes = document.getElementsByClassName('data');
	refresh();

	//clear previous children
	for(var i = 0; i < panes.length; i++) {
		panes[i].innerHTML = "";
	}

	var modPanes = convert(panes);
	var mid = parseInt(modPanes.length/2);

	var grid = new Matrix(modPanes, 3, 3);

	color(panes[mid], colors[0], arrData[0]);
	spiral(grid, 0, mid, 1, arrData);
}

function ascending(arrData) {
	var panes = document.getElementsByClassName('data');
	refresh();

	//clear previous children
	for(var i = 0; i < panes.length; i++) {
		if(arrData[i] == undefined) return;
		color(panes[i], colors[i], arrData[i]);
	}
}

function refresh() {
	var panes = document.getElementsByClassName('data');

	for(var i = 0; i < panes.length; i++) {
		panes[i].innerHTML = "";
		panes[i].style.backgroundColor = "#FFFFFF";
		panes[i].style.border = "0px";
	}
}