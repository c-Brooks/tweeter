
function loadTweets() {
  $.getJSON('/tweets/', function(tweets) {
      renderTweets(tweets);
  });
}
function renderTweets(tweets) {
  tweets.forEach(function (tweet) {
    $('#tweets-container').append(createTweetElement(tweet));
  });
}

function loadOneTweet() {
 $.getJSON('/tweets/', function(tweets) {
  $('#tweets-container').prepend(createTweetElement(tweets[0]));
  });
}

function createTweetElement(tweet) {
  var $tweet

  var $avatar = ($("<img>").addClass("avatar").attr('src', tweet.user.avatars.small));
  var $username = ($("<text>").addClass("username").append(tweet.user.name));
  var $handle = ($("<text>").addClass("handle").append(tweet.user.handle));
  var $date = ($("<text>").addClass("created_at").append(getDateFromUnix(tweet.created_at)));
  var $widgets = ($("<text>").addClass("widgets").append("WIDGETS HERE"));

  $tweet = $("<article>").addClass("tweet");
  $tweet.append($("<header>").append($avatar).append($username).append($handle));
  $tweet.append($("<p>").addClass("content").append(tweet.content.text));
  $tweet.append($("<footer>").append($date).append($widgets));

  console.log($tweet);
  return $tweet;
}

$(function() {
  loadTweets();

  $('#post-tweet').on('submit', function(event) {
    event.preventDefault();

//        VALIDATION
    if($('.counter').text() < 0){
      alert('Your tweet is too short!');
      return false;
    }
    if($('.counter').text() == 140){
      alert('Your tweet is empty!');
      return false;
    }

    $.ajax({
      url: $(this).attr('action'),
      method: $(this).attr('method'),
      data: $(this).serialize(),
      success: function (data) {
        $('<pre>').append(data);
        $("#post-tweet").html($("#post-tweet").html());
        loadOneTweet();
      }
    });
  });
});

function getDateFromUnix(unixTime) {
  var date = new Date(unixTime);
  var dateString = date.toDateString()
  dateString = dateString.slice(0, dateString.length - 5); // Get rid of year
  var timeString = date.toLocaleTimeString();
  timeString = timeString.slice(0, timeString.length - 6) + timeString.slice(timeString.length - 3); // Get rid of # seconds
  return "Posted on " + dateString + " at " +  timeString
}


function getTimeSincePost(unixTime) {
  var currentTime = new Date;
  var timeSincePost = currentTime - unixTime;
  var daysSincePost = Math.floor(timeSincePost/(3600*24));

  if (/*daysSincePost > 5*/false) {
    return getDateFromUnix(unixTime);
  } else if (daysSincePost > 1) {
    return "Posted" + daysSincePost + "days ago";
  } else {
    return "Posted" + daysSincePost + "days ago";
  }
}

