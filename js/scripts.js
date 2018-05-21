function createListFrom(json) {
	
	console.log(json);

	var listDiv = document.getElementById('list-result');
	listDiv.innerHTML = '';
	var ul = document.createElement('ul');
	
	for (var i = 0; i < json.data.questions.length; ++i) {
		var li = document.createElement('li');
		li.innerHTML = json.data.questions[i].questionId + " | " + json.data.questions[i].title + " | " + json.data.questions[i].link + " | " + json.data.questions[i].score;
		ul.appendChild(li);                                 
	}
	listDiv.appendChild(ul);
}

function checkValueDefaut(value, defaultValue) {
	if (value == "") {
		return defaultValue;
	}

	return value;
}

function query() {

	console.log("Query");	

	var form = document.getElementsByClassName("form-search")[0];

	var tag = checkValueDefaut(form["tag"].value, "javascript");
	var limit = checkValueDefaut(form["limit"].value, 2);
	var score = checkValueDefaut(form["score"].value, 0);
	var sort = checkValueDefaut(form["sort"].value, "votes");

	var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == xhr.DONE && xhr.status == 200) {
			createListFrom(xhr.response);
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