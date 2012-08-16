function toggleIn() {
	$('.pane').animate({width: 'toggle'});
				
	var min = document.getElementsByClassName('minPane')[0];
	min.style.visibility="visible";
}

function toggleOut() {
	$('.pane').animate({width: 'toggle'});
				
	var min = document.getElementsByClassName('minPane')[0];
	min.style.visibility="hidden";
}

function jsonpart(json_id) {
	var n = document.getElementById(json_id);
	//var d = getJSONP(n.value, function(data){return data;})
	var url = n.value;
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send();

	var d = request.responseText;

	return d;
}

function getData() {
	
	var data = jsonpart('jsondata');
	
	if(data == undefined) {
		alert("Please input valid JSON data");
		return;
	}

	var arrData = getArr(JSON.parse(data));

	var n = document.getElementsByName('arrangement');

	if(n[0].value == "spiral" && n[0].checked) execute(arrData);

	else if(n[1].value == "ascending" && n[1].checked) ascending(arrData);

	else alert("No arrangement chosen!");
}

function getJSONP(url, success) {

    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;
               console.log(ud);

    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };

    script.src = url.replace('callback=?', 'callback=' + ud);
    head.appendChild(script);
}