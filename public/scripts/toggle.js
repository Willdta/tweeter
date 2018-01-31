$(function() {
  $('#nav-bar').on('click', 'button', function() {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet textarea').focus();
  });
});