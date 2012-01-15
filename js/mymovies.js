window.onload = function() {
	
	// Set up variables for canvas area
	var w = 960, // width
		h = 600, // height
		xm = 30, // x-margin
		ym = 50, // y-margin
		year_init = 1917, // first year
		year_fin = 2012, // last year + 1
		box_width = (w - xm - xm/2) / (year_fin - year_init); // width of boxes
	
	// Assign sub-index for each movie of each year
	for (var y = 1917; y <= 2011; y++) {
		var y_index = 0
		for (i in data) {
			if (data[i].year == y) {
				data[i].year_index = y_index;
				y_index++;
			}
		}
		count = 0;
	}

	// Set colors
	var colors_ratings = ['#A50026', '#D73027', '#F46D43', '#FDAE61', '#FEE090', '#E0F3F8', '#ABD9E9', '#74ADD1', '#4575B4', '#313695'];
	var colors_diff = ['#B2182B', '#EF8A62', '#FDDBC7', '#F7F7F7', '#D1E5F0', '#67A9CF', '#2166AC'];

	// Create new Raphael object
	var paper = new Raphael(document.getElementById('canvas_container'), w, h);

	// Set up variables to create chart
	var boxes = [];
	var tip = $("#tip").hide();
	var tipText = "";
	var over = false;

	// Draw boxes
	for (i in data) {
			boxes[i] = paper.rect(((data[i].year - 1917)* box_width)+ xm, h - ym - (data[i].year_index + 1) * box_width, box_width, box_width)
				.attr({stroke: '#ddd', fill: colors_ratings[data[i].my_rating - 1], stroke: '#fff'});
			boxes[i].node.onmouseover = function() {
				this.style.cursor = 'pointer';
			};
			openURL(i);
			addTip(boxes[i].node, data[i].mtitle + " (" + data[i].year + ") My Rating: " + data[i].my_rating + ", IMDB Rating: " + data[i].imdb_rating);
	}
	
	// Open IMDB movie page on click
	function openURL(id) {
		boxes[id].node.onclick = function() {
			window.open("http://imdb.com/title/" + data[id].imdb_id);
		};
	}
	
	// Mouse over tool tip
	$(document).mousemove(function(e){
   		if (over){
	    	tip.css("left", e.offsetX+20).css("top", e.offsetY+20);
	    	tip.text(tipText);
		}
	});

	function addTip(node, text) {
		$(node).mouseenter(function(){
			tipText = text;
			//tip.fadeIn();
			tip.show(5);
			over = true;
		}).mouseleave(function(){
			//tip.fadeOut(100);
			tip.hide();
			over = false;
		});
	}	

	// Toggle: labels
	var mybox_label = paper.text(98, 209, "My Ratings")
		.attr({fill: '#000', 'text-anchor': 'start', 'font-size': 12});
	var imdbbox_label = paper.text(208, 209, "IMDB Ratings")
		.attr({fill: '#bdbdbd', 'text-anchor': 'start', 'font-size': 12});
	var diffbox_label = paper.text(328, 209, "Difference")
		.attr({fill: '#bdbdbd', 'text-anchor': 'start', 'font-size': 12});
	paper.text(75, 185, "Toggle Colors")
		.attr({fill: '#000', 'font-size': 12, 'text-anchor': 'start', 'font-weight': 'bold'})
	
	// Toggle: my ratings
	var mybox = paper.rect(75.5, 200.5, 18, 18)
		.attr({fill: '#cde', stroke: '#fff'});
	mybox.node.onmouseover = function() {
		this.style.cursor = 'pointer';
	}
	mybox.node.onclick = function() {
		for (i in data) {
			boxes[i].attr({fill: colors_ratings[data[i].my_rating - 1], stroke: '#fff'});
		}
		for (i in ratingsLegend) {
			ratingsLegend[i].show();
			ratingsLegendTxt[i].show();
		}
		for (i in diffLegend) {
			diffLegend[i].hide();
			diffLegendTxt[i].hide();
		}
		mybox.attr({fill: '#cde', stroke: '#fff'});
		imdbbox.attr({fill: '#bdbdbd', stroke: '#fff'});
		diffbox.attr({fill: '#bdbdbd', stroke: '#fff'});
		mybox_label.attr({fill: '#000'});
		imdbbox_label.attr({fill: '#bdbdbd'});
		diffbox_label.attr({fill: '#bdbdbd'});
	}
	
	// Toggle: IMDB ratings
	var imdbbox = paper.rect(185.5, 200.5, 18, 18)
		.attr({fill: '#bdbdbd', stroke: '#fff'});
	imdbbox.node.onmouseover = function() {
		this.style.cursor = 'pointer';
	}
	imdbbox.node.onclick = function() {
		for (i in data) {
			boxes[i].attr({fill: colors_ratings[Math.round(data[i].imdb_rating) - 1], stroke: '#fff'});
		}
		for (i in ratingsLegend) {
			ratingsLegend[i].show();
			ratingsLegendTxt[i].show();
		}
		for (i in diffLegend) {
			diffLegend[i].hide();
			diffLegendTxt[i].hide();
		}
		mybox.attr({fill: '#bdbdbd', stroke: '#fff'});
		imdbbox.attr({fill: '#cde', stroke: '#fff'});
		diffbox.attr({fill: '#bdbdbd', stroke: '#fff'});
		mybox_label.attr({fill: '#bdbdbd'});
		imdbbox_label.attr({fill: '#000000'});
		diffbox_label.attr({fill: '#bdbdbd'});
	}

	// Toggle: Difference
	var diffbox = paper.rect(305.5, 200.5, 18, 18)
		.attr({fill: '#bdbdbd', stroke: '#fff'});
	diffbox.node.onmouseover = function() {
		this.style.cursor = 'pointer';
	}
	diffbox.node.onclick = function() {
		for (i in data) {
			var diff = data[i].my_rating - data[i].imdb_rating;
			if (diff < -1.5) {
				boxes[i].attr({fill: colors_diff[0]});
			}
			else if (diff < -1) {
				boxes[i].attr({fill: colors_diff[1]});
			}
			else if (diff < -0.5) {
				boxes[i].attr({fill: colors_diff[2]});
			}
			else if (diff > 1.5) {
				boxes[i].attr({fill: colors_diff[5]});
			}
			else if (diff > 1) {
				boxes[i].attr({fill: colors_diff[4]});
			}
			else if (diff > 0.5) {
				boxes[i].attr({fill: colors_diff[3]});
			}
			else {
				boxes[i].attr({fill: '#f7f7f7'});
			}
		}
		mybox.attr({fill: '#bdbdbd', stroke: '#fff'});
		imdbbox.attr({fill: '#bdbdbd', stroke: '#fff'});
		diffbox.attr({fill: '#cde', stroke: '#fff'});
		mybox_label.attr({fill: '#bdbdbd'});
		imdbbox_label.attr({fill: '#bdbdbd'});
		diffbox_label.attr({fill: '#000000'});
		for (i in ratingsLegend) {
			ratingsLegend[i].hide();
			ratingsLegendTxt[i].hide();
		}
		for (i in diffLegend) {
			diffLegend[i].show();
			diffLegendTxt[i].show();
		}
	}
	
	// Legend: ratings
	var ratingsLegend = [];
	var ratingsLegendTxt = [];
	var ratingsLegendLabels = ['10 - Excellent', '9', '8', '7', '6', '5', '4', '3', '2', '1 - Awful'];
	for (i = 0; i < colors_ratings.length ; i++) {
			ratingsLegend[i] = paper.rect(75.5, 215.5+18*(colors_ratings.length-i), 18, 18)
				.attr({fill: colors_ratings[i], stroke: '#fff'});
			ratingsLegendTxt[i] = paper.text(98, 242+18*i, ratingsLegendLabels[i])
				.attr({'text-anchor': 'start', 'font-size': 12});
	}

	// Legend: difference
	var diffLegend = [];
	var diffLegendTxt = [];
	var diffLegendLabels = ['1.5 higher than IMDB rating', '1.0 to 1.5', '0.5 to 1.0', '0.5 to -0.5', '-0.5 to -1.0', '-1.0 to -1.5', '1.5 lower than IMDB rating']
	for (i = 0; i < 7 ; i++) {
			diffLegend[i] = paper.rect(305.5, 215.5+18*(colors_diff.length-i), 18, 18)
				.attr({fill: colors_diff[i], stroke: '#fff'})
				.hide();
			diffLegendTxt[i] = paper.text(328, 242+18*i, diffLegendLabels[i])
				.attr({'text-anchor': 'start', 'font-size': 12})
				.hide();
	}

	// Show years on x-axis
	var years = [1917, 1922, 1925, 1936, 1946, 1950, 1954, 1957, 1962, 1964, 1967, 1971, 1976, 1981, 1990, 2000, 2010];
	for (i in years) {
		paper.text(((years[i] - 1917) * box_width) + xm, h - ym, years[i])
			.attr({fill: '#000'})
			.transform("t-5,12r-30");
	}

	// Add y axis labels
	for (i = 0; i < 6; i++) {
		var ytrans = h-ym-(box_width*10*i);
		//paper.path("M"+xm+","+ytrans+"L"+w+","+ytrans)
		//	.attr({stroke: '#ddd'});
		paper.text(w-xm/2, ytrans, i*10)
			.transform("t10,"+(box_width/2));
	}
	
};