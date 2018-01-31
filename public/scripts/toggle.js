$(function() {
  $('#nav-bar').on('click', 'button', function() {
    $('.new-tweet').slideToggle('slow');
  });
});