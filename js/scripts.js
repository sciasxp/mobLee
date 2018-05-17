function validateForm(form) {
	var tag = form["tag"].value;
	if (tag == '') {
		var input = form["tag"];
		input.style.border = "2px solid red";

		return false;
	}
	tag += ', Javascript';

	var limit = form["limit"].value;
	if (limit == '') {
		limit = 10;
	}

	var score = form["score"].value;
	if (score == '') {
		score = 0;
	}

	var sort = form["sort"].value;
	if (sort == '') {
		sort = 'score';
	}

	alert(tag+' '+limit+' '+score+' '+sort);
}