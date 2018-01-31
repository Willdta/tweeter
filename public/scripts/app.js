/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
// 	{
// 		"user": {
// 			"name": "Newton",
// 			"avatars": {
// 				"small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
// 				"regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
// 				"large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
// 			},
// 			"handle": "@SirIsaac"
// 		},
// 		"content": {
// 			"text": "If I have seen further it is by standing on the shoulders of giants"
// 		},
// 		"created_at": 1461116232227
// 	},
// 	{
// 		"user": {
// 			"name": "Descartes",
// 			"avatars": {
// 				"small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
// 				"regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
// 				"large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
// 			},
// 			"handle": "@rd" },
// 		"content": {
// 			"text": "Je pense , donc je suis"
// 		},
// 		"created_at": 1461113959088
// 	},
// 	{
// 		"user": {
// 			"name": "Johann von Goethe",
// 			"avatars": {
// 				"small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
// 				"regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
// 				"large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
// 			},
// 			"handle": "@johann49"
// 		},
// 		"content": {
// 			"text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
// 		},
// 		"created_at": 1461113796368
// 	}
// ];

$(function() { 
	$('.new-tweet').on('click', '.tweetbutton', function(e) {
		var $textArea = $(this).siblings('textarea');
		var $textLength = $textArea.val().length;

		if ($textLength === 0) {
			$('.new-tweet .first').css('opacity', 1);
			e.preventDefault();
		} else {
			$('.new-tweet .first').css('opacity', 0);
			e.preventDefault();
		}

		if ($textLength > 10) {
			$('.new-tweet .second').css('opacity', 1);
			e.preventDefault();
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
	for (key of data) {
		var $tweet = createTweetElement(key);
		$('#tweet-container').append($tweet);
	}
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
