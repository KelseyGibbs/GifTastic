$(document).ready(function () {
    // Creating an array of strings
    var topics = ["pizza", "tacos", "donuts", "cheeseburger", "bacon", "candy", "cheese", "cake", "pasta", "mochi"];

    function appendTopics() {
        for (i = 0; i < topics.length; i++) {
            var topicButtons = $("<button>" + topics[i] + "</button>")
            topicButtons.addClass("btn btn-sm");
            topicButtons.addClass("generate")
            topicButtons.appendTo('.topics');
        };
    };

    $(".topics").on("click", ".generate", (function () {
        var generateThis = $(this).text();
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + generateThis + "&api_key=63GUdnqAEjBUWuwXWqlWEQ3lPp2nMkoO&limit=10";
        console.log(queryURL);

        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function (response) {
                var giphyData = response.data
                console.log(giphyData);

                for (var i = 0; i < giphyData.length; i++) {

                    var emptyDiv = $("<div>");
                    emptyDiv.addClass("cell");
                    emptyDiv.addClass("responsive-image");
                    var giphyRating = $("<h3 class='rating'>").text("Rating: " + giphyData[i].rating);
                    
                    var emptyImage = $("<img>");

                    emptyImage.attr("src", giphyData[i].images.fixed_height_still.url);

                    emptyDiv.append(giphyRating);
                    emptyDiv.append(emptyImage);

                    $("#gifs").append(emptyDiv);

                };
            })
    }))






    appendTopics();

})