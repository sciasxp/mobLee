var HttpClient = function() {
	this.get = function(aUrl, aCallback) {

		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function() { 
			if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
				aCallback(anHttpRequest.responseText);
		};
		anHttpRequest.onerror = function() {
			console.log("onerror - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
		};
		anHttpRequest.onloadend = function() {
			console.log("onloadend - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
		};

		anHttpRequest.open( "GET", aUrl, true );
		anHttpRequest.withCredentials = true;       
		anHttpRequest.send( null );
	};
	this.post = function(aUrl, aBody, aCallback) {
		
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function() { 
			if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
				aCallback(anHttpRequest.responseText);
		};
		anHttpRequest.onerror = function() {
			console.log("onerror - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
		};
		anHttpRequest.onloadend = function() {
			console.log("onloadend - state: " + this.readyState + ", status: " + this.status + ", response: " + this.response);
		};

		anHttpRequest.responseType = "json";
		anHttpRequest.open( "POST", aUrl, true );
		anHttpRequest.setRequestHeader("Content-Type", "application/json");
		anHttpRequest.setRequestHeader("Accept", "application/json");
		anHttpRequest.send( aBody );
	}
};

function query(form) {

	var tag = form["tag"].value;
	if (limit == "") {
		limit = "javascript";
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

	var url = "/README.md";//"http://localhost:4000/graphql?query=%7B%0A%20%20questions(tag%3A%22"+tag+"%22%2C%20limit%3A"+limit+"%2C%20score%3A"+score+"%2C%20sort%3A%22"+sort+"%22)%20%7B%0A%20%20%20%20questionId%2C%0A%20%20%20%20title%2C%0A%20%20%20%20link%2C%0A%20%20%20%20score%0A%20%20%7D%0A%7D";
	var client = new HttpClient();
	client.get(url, function(response) {
		// do something with response
		console.log(response);
	});

	/*
	var url = "http://localhost:4000/graphql";
	var toSend = JSON.stringify("{questions(tag: \"javascipt\", sort: \"votes\", limit: 2, score: 0) {id,title,link,score}}");
	var client = new HttpClient();
	client.post(url, toSend, function(response) {
		console.log(response);
	});
	*/
}

function validateForm(form) {
	
	var tag = form["tag"].value;
	if (tag == "") {
		var input = form["tag"];
		input.style.border = "2px solid red";

		return false;
	}

	query(form);
}