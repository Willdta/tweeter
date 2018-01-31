/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(function() { 
	$('.new-tweet').on('click', '.tweetbutton', function(e) {
		var $textArea = $(this).siblings('textarea');
		var $textLength = $textArea.val().length;
		var $character = $(this).siblings('span');

		if ($textLength !== 0 && $textLength <= 140) {
			$.ajax({	
				url: '/tweets',
				method: 'POST',
				data: $textArea.serialize(),
				success: function(tweets) {
					console.log('blah');
					loadTweets();
				}
			});		
			
			$character.text(140);
			$textArea.val('');
		}

		if ($textLength === 0) {
			$('.new-tweet .first').css('opacity', 1);
			e.preventDefault();
		} else {
			$('.new-tweet .first').css('opacity', 0);
			e.preventDefault();
		}

		if ($textLength > 140) {
			e.preventDefault();
			$('.new-tweet .second').css('opacity', 1);
		} else {	
			$('.new-tweet .second').css('opacity', 0);
			e.preventDefault();
		}
	});

	function loadTweets() {
		$.ajax({
			url: '/tweets',
			method: 'GET',
			success: function(tweets) {
				console.log('getting tweets...');
				renderTweet(tweets);
			}
		});
	}
	loadTweets();
});

function renderTweet(data) {
	$('#tweet-container').empty();
	
	for (key of data) {
		var $tweet = createTweetElement(key);
		$('#tweet-container').prepend($tweet);
	}
}

//Function for preventing XSS (Won't allow the user to type javascript)
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

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
				<p>${escape(data.content['text'])}</p>
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
