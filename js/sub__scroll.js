var winnerYOffset;
$(document).ready(function() {
  winnerYOffset = $('#winner').offset().top;
});
$(window).scroll(function() {
  if (winnerYOffset < pageYOffset) {
    $('#winner').addClass('pinned shadow');
  } else {
    $('#winner').removeClass('pinned shadow');
  }
  // console.log($('#winner').offset().top < pageYOffset);
});
