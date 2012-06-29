var colors = ["#FFC0CB", "#FF91A4", "#E0115F", "#FF0000", "#ED1C24", 
				"#C40233", "#B31B1B", "#990000", "#800000"];

var data = ({
			"David Guetta": {
							"Album": "Nothing But the Beat",
							"Num Tracks": "32"
							},
			"Michael Jackson":{
							"Album": "Bad",
							"Num Tracks": "10"
							}
			});

var arrData = (function(obj) {
					var arr = new Array();

					for(var key in obj) {
						var d = {key: obj[key]};
						arr.push(d);
					}
					
					return arr;
				})(data);

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

function color(node, color, data) {
	node.style.backgroundColor = color;
	for(var key in data) {
		var text = createTextNode(""+key+": "+data[key]"");
		node.appendChild(text);
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

function spiral(m, direction, curr, col) {

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
		spiral(m, direction, curr, col);
		return;
	}

	if(!m.matrix[move]["seen"]) {
		console.log(curr+" not seen");
		color(m.matrix[move]["panel"], colors[col]);
		col++;
		m.matrix[move]["seen"] = true;
		spiral(m, direction, move, col);
	}

	else if(m.matrix[move]["seen"]) {
		console.log(curr+" seen");
		direction++;
		spiral(m, direction, move, col);
	}
}

function execute() {
	var panes = document.getElementsByClassName('data');
	var modPanes = convert(panes);
	var mid = parseInt(modPanes.length/2);

	var grid = new Matrix(modPanes, 3, 3);

	color(panes[mid], colors[0]);
	spiral(grid, 0, mid, 1);
}

function ascending() {
	var panes = document.getElementsByClassName('data');
	for(var i in panes) {
		color(panes[i], colors[i]);
	}
}