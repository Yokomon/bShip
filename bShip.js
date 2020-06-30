window.omload = init;

var init = function(){
};
var inputBtn = document.getElementById("fireButton");
var inputMsg= document.getElementById("guessInput");
var view ={
	//method used to display
	// messages of the users input.
	displayMessage: function(msg){
		var message = document.getElementById("messageArea");
		message.innerHTML = msg;
	},
	// method used to display the MISS
	// alert on the page
	displayMiss: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},
	// method used to display the HIT
	// alert for the user
	displayHit: function(location){
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayInput: function(inputMsg){
		inputMsg.outerHTML = "<input type=text id=guessInput placeholder=A0>";
	},
	displayBtn:function(inputBtn){
		inputBtn.outerHTML="<input type=button id=fireButton value=FIRE!>";
	}
};
