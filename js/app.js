
$(document).ready(function(){
	
	var number;
	var guess;
	var array = [];
	var count;
	var selector;
	var fxn;
	
	/*-- Reset for new Game --*/
	var newGame = function(){
		$("#count").text("0");
		$("#feedback").text("Make your Guess!");
		$("#guessList").empty();
		number = 1 + Math.floor((Math.random() * 100));
		array.length = 0;
		count = 0;
	}
	
	newGame();//start new game on open
	
	/*--- On new game click, create new game---*/
	$(".new").click(function(){
		newGame();	
	});
	
	/*--- On guess click, check guess and display message---*/
	$("#guessButton").click(function(event){
		event.preventDefault(); //stop the freaking page refresh
		guess = + $("#userGuess").val(); //get guess value
		$("#userGuess").val(""); //reset user input
		var range;
		var index;
		var i;
		
		// if guess is int and 0 < guess < 101, display message and increment count
		if (guess > 0 && guess < 101 && guess % 1 == 0) {
			range = Math.abs(number - guess);
		
			
			//determine index for inserting number into guessList
			for (i = array.length -1 ; i >= -1; i--){
				index = i + 1 ;
				if (i == -1) {
					array.unshift(guess);
					break;
				}else if (guess > array[i]) {
					array.splice(index, 0, guess);
					break;
				}
			}
			
			
			//set selector and fxn based on position in array
			if ($("#guessList li").length == 0) {
				selector = "#guessList";
				jQuery.fn.fxn = jQuery.fn.append;
				
			}else if (index == 0){
				selector = "#guessList li:first-child";
				jQuery.fn.fxn = jQuery.fn.before;
			
			}else{
				selector= "#guessList li:nth-child(" + index + ")";
				jQuery.fn.fxn = jQuery.fn.after;
			}
			
			//display based on range
			if (range == 0 ) {
				$("#feedback").text("Woot.");
				alert("You found the secret number in " + count + " guesses. \n\r Play again to try and beat your score.")
				newGame();
				count--;
			}else if (range < 10) {
				$("#feedback").text("Very Hot!");
				$(selector).fxn("<li class=\"very-hot\">" + guess + "</li>");
			}else if (range < 20) {
				$("#feedback").text("Hot!");
				$(selector).fxn("<li class=\"hot\">" + guess + "</li>");
			}else if (range < 30) {
				$("#feedback").text("Warm.");
				$(selector).fxn("<li class=\"warm\">" + guess + "</li>");
				count++;
			}else if (range < 50) {
				$("#feedback").text("Cold.");
				$(selector).fxn("<li class=\"cold\">" + guess + "</li>");
			}else {
				$("#feedback").text("Ice Cold.");
				$(selector).fxn("<li class=\"ice-cold\">" + guess + "</li>");
			}
		
			$("#count").text(++count); //increment count
			
		}else{
			alert("Please enter an integer between 1 and 100"); //alert to inappropriate format
		}
	});
	
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
		$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

});


