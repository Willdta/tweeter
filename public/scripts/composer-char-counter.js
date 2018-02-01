//Character counter function
$(function() {
  $('.new-tweet').on('keyup', 'button', function() {
    var maxCharacters = 140;
    var currentCharacters = $(this).val().length;
   
    // Subtracting textarea length from maxCharacters
    var remaining = maxCharacters - currentCharacters;
    var character = $(this).siblings('span');
    
    //Changes the text of number to decrease/increase with textarea character count 
    character.text(remaining);

    //If below 140, color will be black or else it's red
    if (currentCharacters > maxCharacters) {
      character.css('color', 'red');
    } else {
      character.css('color', 'black');
    }
  });
});