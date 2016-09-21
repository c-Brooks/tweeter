/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];




function renderTweets(tweets) {
  console.log("ASDF")
  tweets.forEach(function (tweet) {
    $('#tweets-container').append(createTweetElement(tweet));
  });
}




function createTweetElement(tweet) {
  var $tweet

  var _avatar = ($("<img>").addClass("avatar").attr('src', tweet.user.avatars.small));
  var _username = ($("<text>").addClass("username").append(tweet.user.name));
  var _handle = ($("<text>").addClass("handle").append(tweet.user.handle));
  var _date = ($("<text>").addClass("created_at").append(getDateFromUnix(tweet.created_at)));
  var _widgets = ($("<text>").addClass("widgets").append("WIDGETS HERE"));

  $tweet = $("<article>").addClass("tweet");
  $tweet.append($("<header>").append(_avatar).append(_username).append(_handle));
  $tweet.append($("<p>").addClass("content").append(tweet.content.text));
  $tweet.append($("<footer>").append(_date).append(_widgets));

  console.log($tweet);
  return $tweet; // tweet element
}


$(function() {
renderTweets(data);
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








