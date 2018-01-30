/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() { 
  $('#tweet-container').on('mouseenter', function() {
    $('.icons i').css('opacity', 1);
  });
  
  $('#tweet-container').on('mouseleave', function() {
    $('.icons i').css('opacity', 0);
  });
});