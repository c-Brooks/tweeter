$(function () {
  var origNum = $(".counter").text();

  $("#tweet-text").on("keyup", function () {
    var newNum = origNum - $("#tweet-text ").val().length;

    if (newNum < 0) {
      $(".counter").css({"color": "red"})
    } else {
      $(".counter").css({"color": "black"});
    }
    $(".counter").text(newNum)
  });
});