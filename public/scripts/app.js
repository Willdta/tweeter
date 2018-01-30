/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

$(function() { 
  $('.tweet-section').on('mouseenter', function() {
    $('.icons i').css('opacity', 1);
  });
  
  $('.tweet-section').on('mouseleave', function() {
    $('.icons i').css('opacity', 0);
  });

  var $tweet = createTweetElement(tweetData);
  $('#tweet-container').append($tweet);
});

function createTweetElement(data) {
  var template = 
  `
    <article class="tweet-section">
      <header>
        <img src="${data.user['avatars']['small']}" alt="avatar">
        <h1>${data.user['name']}</h1>
        <p>${data.user['handle']}</p>
      </header>
        
      <div>
        <p>${data.content['text']}</p>
      </div>
        
      <footer>
        <p>${data.created_at}</p>
        <div class="icons">
          <i class="fa fa-flag" aria-hidden="true"></i>
          <i class="fa fa-retweet" aria-hidden="true"></i>
          <i class="fa fa-heart" aria-hidden="true"></i>
        </div>
      </footer>
    </article>
  `;
  return $(template);
};