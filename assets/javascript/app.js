$(document).ready(function() {

  // Creating an array of strings
  var topics = [
    "Candy",
    "Pizza Love",
    "Bacon",
    "Taco Life",
    "Cheese",
    "Donuts Forever",
    "Cosmic Cheeseburger",
    "Pasta",
    "Sprinkles",
    "Mochi"
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
      "https://api.giphy.com/v1/gifs/search?q=" +
      generateThis +
      "&api_key=63GUdnqAEjBUWuwXWqlWEQ3lPp2nMkoO&limit=10";
    // Removes any gifs already on the page.
    $("#gifs").empty();
    // Calls the giphyCall function after updating the global "queryURL" variable
    giphyCall();
  });

  //   Function that interacts with the search form
    $(".form-inline").submit(function() {
      // Prevents the page from reloading when the submit button is pressed
      event.preventDefault();
      //   Creates a variable that equals the form-control value
      var name = $(".form-control").val();
      // Updates the global queryURL with the api key, limit and the text the user inputed.
      queryURL =
        "https://api.giphy.com/v1/gifs/search?q=" +
        name +
        "&api_key=63GUdnqAEjBUWuwXWqlWEQ3lPp2nMkoO&limit=10";
      // Removes any gifs already on the page.
      $("#gifs").empty();
      // Calls the giphyCall function after updating the global "queryURL" variable
      giphyCall();
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
        // Lopp through the giphyData
        for (var i = 0; i < giphyData.length; i++) {
          // Creates an empty div
          var emptyDiv = $("<div>");
        //   Adds a bootstrap
          emptyDiv.addClass("col-md-4")
          // Creates a header element to display the gifpy rating
          var giphyRating = $("<h3 class='rating'>").text("Rating: " + giphyData[i].rating);
          // Createss an image element
          var emptyImage = $("<img>");
          //Adds an attribute to the image to append
          emptyImage.attr("src", giphyData[i].images.fixed_width_still.url);
          //  Adds a data attribute for when the data is resting
          emptyImage.attr("data-rest", giphyData[i].images.fixed_width_still.url);
          //  Adds a data attribute for when the data is in use
          emptyImage.attr("data-use", giphyData[i].images.fixed_width.url);
          //  Initilize the data in "rest" state
          emptyImage.attr("data-state", "rest");
          //   Adds a class to the images to use with an on click function
          emptyImage.addClass("clicker");
          //  Appends the image to the emptyDiv
          emptyDiv.append(emptyImage);
          //   Appends the Rating below the Image
          emptyDiv.append(giphyRating);
          // Appends the images to the page dynamically
          $(".row").append(emptyDiv);
        }
      });
  }

  //   When a gif is clicken on
  $("#gifs").on("click", ".clicker", function() {
    //   Create a variable equal to the current data-state
    var currentState = $(this).attr("data-state");
    // If the cureent state is rest
    if (currentState === "rest") {
      // Change the src attribute to the "data-use" attribute
      $(this).attr("src", $(this).attr("data-use"));
      // Change the data-state to "use"
      $(this).attr("data-state", "use");
      //   If the current data-state is not rest
    } else {
      // Change the src attribute to the "data-rest" attribute
      $(this).attr("src", $(this).attr("data-rest"));
      // Change the data-state back to "rest"
      $(this).attr("data-state", "rest");
    }
  });

  // Calls the appendTopics function to append the topics to the navBar when the page loads
  appendTopics();
});
