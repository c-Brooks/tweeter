$(function () {
  $("#compose-btn").click(function() {
    $(".new-tweet").slideToggle("slow", function () {
      $("#tweet-text").focus();
    });
  });
});