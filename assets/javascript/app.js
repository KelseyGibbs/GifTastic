$(document).ready(function() {
  // Creating an array of strings
  var topics = [
    "pizza",
    "tacos",
    "donuts",
    "cheeseburger",
    "bacon",
    "candy",
    "cheese",
    "cake",
    "pasta",
    "mochi"
  ];
  // Declaring the queryURL variable gloablly
  var queryURL = " ";

  // Function that appends the topics to the nav bar
  function appendTopics() {
    // Loop through the topics
    for (i = 0; i < topics.length; i++) {
      // Variable that creates a button for each topic
      var topicButtons = $("<button>" + topics[i] + "</button>");
      // Adds a class to style the button for bootstrap
      topicButtons.addClass("btn btn-sm");
      // Adds a class to the buttons to make them clickable
      topicButtons.addClass("generate");
      // Appends the topic buttons to the Navbar
      topicButtons.appendTo(".topics");
    }
  }

  // When a topic button with the class "generate" fun this function
  $(".topics").on("click", ".generate", function() {
    // Creates a variable that equals the text clicked on
    var generateThis = $(this).text();
    // Updates the global queryURL with the api key, limit and the topic the user chose.
    queryURL =
      "http://api.giphy.com/v1/gifs/search?q=" +
      generateThis +
      "&api_key=63GUdnqAEjBUWuwXWqlWEQ3lPp2nMkoO&limit=10";
    // Removes any gifs already on the page.
    $("#gifs").empty();
    // Calls the giphyCall function after updating the global "queryURL" variable
    giphyCall();
  });

  //   Function that interacts with the search form
  $(function() {
    $(".form-inline").submit(function() {
      // Prevents the page from reloading when the submit button is pressed
      event.preventDefault();
      //   Creates a variable that equals the user input
      var name = $(".form-control").val();
      // Updates the global queryURL with the api key, limit and the text the user inputed.
      queryURL =
        "http://api.giphy.com/v1/gifs/search?q=" +
        name +
        "&api_key=63GUdnqAEjBUWuwXWqlWEQ3lPp2nMkoO&limit=10";
      // Removes any gifs already on the page.
      $("#gifs").empty();
      // Calls the giphyCall function after updating the global "queryURL" variable
      giphyCall();
    });
  });

  //   Function to call the API.
  function giphyCall() {
    // AJAX Call
    $.ajax({
      // The url is equal to the gloabl variable queryURL. The "GET" method is doing just that.
      url: queryURL,
      method: "GET"
    })
      // After we retrive the data, we are running a function
      .then(function(response) {
        // Creating a variable to hold the data from the API
        var giphyData = response.data;
        console.log(giphyData);
        // Lopp through the giphyData
        for (var i = 0; i < giphyData.length; i++) {
          var emptyDiv = $("<div>");
          var giphyRating = $("<h3 class='rating'>").text(
            "Rating: " + giphyData[i].rating
          );

          var emptyImage = $("<img>");

          emptyImage.attr("src", giphyData[i].images.preview_gif.url);

          emptyDiv.append(emptyImage);
          emptyDiv.append(giphyRating);

          $("#gifs").append(emptyDiv);
        }
      });
  }
  // Calls the appendTopics function to append the topics to the navBar when the page loads
  appendTopics();
});
