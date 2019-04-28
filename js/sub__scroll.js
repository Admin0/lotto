var winnerYOffset;
$(document).ready(function() {
  winnerYOffset = $('#winner').offset().top;
});
$(window).scroll(function() {
  if (winnerYOffset < pageYOffset) {
    $('#winner').addClass('pinned');
  } else {
    $('#winner').removeClass('pinned');
  }
  // console.log($('#winner').offset().top < pageYOffset);
});
