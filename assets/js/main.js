$(document).ready(function () {
	console.log("ready!");
	var movies = ["Borderlands", "Metal Gear Solid", "West of Loathing", "The Witcher"];

	// displayMovieInfo function re-renders the HTML to display the appropriate content
	function displayMovieInfo() {
		$("#results").empty();
		var images = $("<div>");
		images.attr("id", "images");
		images.addClass("row");

		var movie = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=3eDZ8nPG1vM9MFTJ2LS2dYwrfzfzrIop&limit=10";
		// Creating an AJAX call for the specific movie button being clicked
		$.ajax({
			url: queryURL,
			method: "GET"
		}).then(function (response) {
			var results = response.data;
			console.log(results);

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='item card col-md-6'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);
				p.addClass("text-center card-body")
				var personImage = $("<img>");
				personImage.attr("src", results[i].images.fixed_height_still.url);
				personImage.addClass("gif card-img-top")

				gifDiv.append(p);
				gifDiv.prepend(personImage);
				$("#images").prepend(gifDiv)
				$("#results").prepend(images);
			}

		});
	};
	$('#results').on('click', '.gif', function () {
		var src = $(this).attr("src");
		if ($(this).hasClass('playing')) {
			//stop
			$(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
			$(this).removeClass('playing');
		} else {
			//play

			$(this).addClass('playing');
			$(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
		}
	});
	// Function for displaying movie data
	function renderButtons() {
		// Deleting the movies prior to adding new movies
		// (this is necessary otherwise you will have repeat buttons)
		$("#buttons-view").empty();
		// Looping through the array of movies
		for (var i = 0; i < movies.length; i++) {
			// Then dynamicaly generating buttons for each movie in the array
			// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
			var a = $("<button>");
			// Adding a class of movie-btn to our button
			a.addClass("movie-btn btn btn-info col-md-2 mr-1 text-center");
			// Adding a data-attribute
			a.attr("data-name", movies[i]);

			// Providing the initial button text
			a.text(movies[i]);
			// Adding the button to the buttons-view div
			$("#buttons-view").append(a);
		}
	}
	// This function handles events where a movie button is clicked
	$("#add-movie").on("click", function (event) {
		event.preventDefault();
		// This line grabs the input from the textbox
		var movie = $("#movie-input").val().trim();
		// Adding movie from the textbox to our array
		movies.push(movie);
		// Calling renderButtons which handles the processing of our movie array
		renderButtons();
	});
	// Adding a click event listener to all elements with a class of "movie-btn"
	$(document).on("click", ".movie-btn", displayMovieInfo);
	// Calling the renderButtons function to display the intial buttons
	renderButtons();





});