function createListFrom(json) {
	
	console.log(json);

	var listDiv = document.getElementById("list-result");
	listDiv.innerHTML = "";
	var ul = document.createElement("ul");
	
	for (var i = 0; i < json.data.questions.length; ++i) {
		var li = document.createElement("li");
		li.innerHTML = json.data.questions[i].questionId + " | " + json.data.questions[i].title + " | " + json.data.questions[i].link + " | " + json.data.questions[i].score;
		ul.appendChild(li);                                 
	}
	listDiv.appendChild(ul);
}

function createTableFrom(json) {

	var tableDiv = document.getElementById("list-result");
	tableDiv.innerHTML = "";

	var table = document.createElement("table");
	var tr = document.createElement("tr");

	var td = document.createElement("td");
	td.className = "td-header";
	td.innerHTML = "Id";
	tr.appendChild(td);

	var td = document.createElement("td");
	td.className = "td-header";
	td.innerHTML = "Título";
	tr.appendChild(td);

	var td = document.createElement("td");
	td.className = "td-header";
	td.innerHTML = "Link";
	tr.appendChild(td);

	var td = document.createElement("td");
	td.className = "td-header";
	td.innerHTML = "Votos";
	tr.appendChild(td);

	table.appendChild(tr);

	for (var i = 0; i < json.data.questions.length; ++i) {
		
		var tr = document.createElement("tr");

		var td = document.createElement("td");
		td.innerHTML = json.data.questions[i].questionId;
		tr.appendChild(td);

		var td = document.createElement("td");
		td.innerHTML = json.data.questions[i].title;
		tr.appendChild(td);

		var td = document.createElement("td");
		var a = document.createElement("a");
		var linkText = document.createTextNode("link");
		a.appendChild(linkText);
		a.title = "link";
		a.href = json.data.questions[i].link;
		a.target = "_blank";
		td.appendChild(a);
		tr.appendChild(td);

		var td = document.createElement("td");
		td.innerHTML = json.data.questions[i].score;
		tr.appendChild(td);

		table.appendChild(tr);
	}

	var spinner = document.getElementsByClassName("spinner")[0];
	spinner.style.display = "none";
	tableDiv.appendChild(table);
}

function checkValueDefaut(value, defaultValue) {
	if (value == "") {
		return defaultValue;
	}

	return value;
}

function query() {

	console.log("Query");
	
	var spinner = document.getElementsByClassName("spinner")[0];
	spinner.style.display = "block";

	var form = document.getElementsByClassName("form-search")[0];

	var tag = checkValueDefaut(form["tag"].value, "javascript");
	var limit = checkValueDefaut(form["limit"].value, 2);
	var score = checkValueDefaut(form["score"].value, 0);
	var sort = checkValueDefaut(form["sort"].value, "activity");

	//if (tag.toLowerCase() != "javascript") {
	//	tag += ", javascript";
	//}

	var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == xhr.DONE && xhr.status == 200) {
			// createListFrom(xhr.response);
			createTableFrom(xhr.response);
		}
	};
	xhr.onerror = function() {
		console.log("onerror - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
	};
        
	var query = 
	`{ questions(tag: "${tag}", limit: ${limit}, score: ${score}, sort: "${sort}") {
            questionId,
            title,
            link,
            score
        }
	}`;
	
    xhr.send(JSON.stringify({query: query}));
}

function validateForm(form) {
	
	console.log("Validate");

	var tag = form["tag"].value;
	if (tag == "") {
		var input = form["tag"];
		input.style.border = "2px solid red";

		return false;
	}

	return true;
}