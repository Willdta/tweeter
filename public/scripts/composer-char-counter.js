$(function() {
  $('.new-tweet textarea').keyup(function() {
    var maxCharacters = 140;
    var currentCharacters = $(this).val().length;
    var remaining = maxCharacters - currentCharacters;
    var character = $(this).siblings('span');
    character.text(remaining);

    if (currentCharacters > maxCharacters) {
      character.css('color', 'red');
    } else {
      character.css('color', 'black');
    }
  });
});