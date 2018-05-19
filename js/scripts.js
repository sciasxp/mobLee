function query() {

	console.log("Query");	

	var form = document.getElementsByClassName("form-search")[0];

	var tag = form["tag"].value;
	if (tag == "") {
		tag = "javascript";
	}
	//tag += ', Javascript';

	var limit = form["limit"].value;
	if (limit == "") {
		limit = 2;
	}

	var score = form["score"].value;
	if (score == "") {
		score = 0;
	}

	var sort = form["sort"].value;
	if (sort == "") {
		sort = "votes";
	}

	var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open("POST", "http://localhost:4000/graphql");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onload = function () {
        console.log('data returned:', xhr.response);
	}
	xhr.onreadystatechange = function() { 
		if (xhr.readyState == xhr.DONE && xhr.status == 200)
			console.log("onreadystatechange - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
		else
			console.log("onreadystatechange - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
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
	//return query(form);
}