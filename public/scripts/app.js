
function loadTweets() {
  $.getJSON("/tweets/", function(tweets) {
      renderTweets(tweets);
  });
}
function renderTweets(tweets) {
  tweets.forEach(function (tweet) {
    $("#tweets-container").append(createTweetElement(tweet));
  });
  // Set onClick listener. NOTE: I logged the message because alerting is obnoxious
     $( "#tweets-container" ).on( "click", "article", function( event ) {
    event.preventDefault();
    console.log("Tweet, tweet!");
  });
}

function loadOneTweet() {
 $.getJSON("/tweets/", function(tweets) {
  $("#tweets-container").prepend(createTweetElement(tweets[0]));
  });
}

function createTweetElement(tweet) {

// Creating an underscore.js template:
  var tweet_template = _.template(
    "<article class='tweet'>" +
      "<header>" +
        "<img class='avatar'; src=<%=user.avatars.small%>>" +
        "<text class='username'><%=user.name%></text>" +
        "<text class='handle'><%=user.handle%></text>" +
      "</header>" +
        "<p class='content'><%=content.text%></p>" +
        "<footer>" +
        "<text class='created_at'><%=getDaysSincePost(created_at)%></text>" +
        "<text class='widgets'>" +
          "<div class='flag'></div>" +
          "<div class='like'></div>" +
          "<div class='retweet'></div>" +
        "</text>" +
      "</footer>" +
    "</article>"
    );


//     FOR REFERENCE:
// This is how to crete a DOM element using jQuery

  // var $tweet
  // var $avatar = ($("<img>").addClass("avatar").attr('src', tweet.user.avatars.small));
  // var $username = ($("<text>").addClass("username").append(tweet.user.name));
  // var $handle = ($("<text>").addClass("handle").append(tweet.user.handle));
  // var $date = ($("<text>").addClass("created_at").append(getDaysSincePost(tweet.created_at)));
  // var $widgets = ($("<text>").addClass("widgets").append("WIDGETS HERE"));

  // $tweet = $("<article>").addClass("tweet");
  // $tweet.append($("<header>").append($avatar).append($username).append($handle));
  // $tweet.append($("<p>").addClass("content").append(tweet.content.text));
  // $tweet.append($("<footer>").append($date).append($widgets));
  // console.log($tweet);

  return tweet_template(tweet);
}


// Driver code
$(function() {
  loadTweets();

  $("#post-tweet").on("submit", function(event) {
    event.preventDefault();

//        VALIDATION
    if($(".counter").text() < 0){
      alert("Your tweet is too short!");
      return false;
    }
    if($("#tweet-text").val().match(/^\s*$/)){
      alert("Your tweet is empty!");
      return false;
    }

    $.ajax({
      url: $(this).attr("action"),
      method: $(this).attr("method"),
      data: $(this).serialize(),
      success: function (data) {
        $("<pre>").append(data);
        $("#post-tweet").html($("#post-tweet").html());
        loadOneTweet();
      }
    });
  });
});

// Formatting the date posted

function getDaysSincePost(unixTime) {
  var currentTime = new Date;
  var secSincePost = (currentTime - unixTime)/1000;   // convert ms to sec
  var daysSincePost = Math.floor(secSincePost/(3600*24));

  if (daysSincePost > 5) {
    return getDateFromSec(unixTime/1000);
  } else if (daysSincePost <= 1) {
    return getTimeSincePost(secSincePost);
  } else {
    return "Posted " + daysSincePost + " days ago";
  }
}

function getTimeSincePost(seconds){
  var hours = (Math.floor(seconds/(3600) % 24));
  var mins  = (Math.floor((seconds/60)) % 60);
  return hours >= 1 ? "Posted " + hours + " hours, " + mins + " minutes ago" : "Posted " + mins + " minutes ago";
}

function getDateFromSec(seconds) {
  var date = new Date(seconds);
  var dateString = date.toDateString()
  dateString = dateString.slice(0, dateString.length - 5); // Get rid of year
  return "Posted on " + dateString;
}
