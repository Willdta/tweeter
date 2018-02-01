//document.ready
$(function() {

	//Listening for submit button click 
	$('.new-tweet').on('click', '.tweetbutton', function(e) {
		var $textArea = $(this).siblings('textarea');
		var $textLength = $textArea.val().length;
		var $character = $(this).siblings('span');

		//Successful Verification
		if ($textLength !== 0 && $textLength <= 140) {
			
			//POST tweets 
			$.ajax({	
				url: '/tweets',
				method: 'POST',
				data: $textArea.serialize(),
				success: function(tweets) {
					//On success GET tweets
					loadTweets();
				}
			});		
			//Reset counter and text
			$character.text(140);
			$textArea.val('');
		}

		//Prevent form submission
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

	//Fetch tweets with Ajax
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

	//Load brebuilt tweets
	loadTweets();
});

//Renders multiple tweets
function renderTweet(data) {
	
	//Remove duplicates
	$('#tweet-container').empty();
	
	//Loop through each tweet
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

//Here we are creating a function that makes a newly generated template for each tweet
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