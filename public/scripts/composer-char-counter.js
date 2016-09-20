$(function () {
  var origNum = $('.counter').text();

  $("[name = 'text']").on('keyup', function () {
    var newNum = origNum - $("[name = 'text']").val().length;

    if (newNum < 0) {
      $('.counter').css({'color': 'red'})
    } else {
      $('.counter').css({'color': 'black'});
    }
    $('.counter').text(newNum)
  });
});