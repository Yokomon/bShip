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
view.displayMessage("Hello Corp, Commencing test Phase 1. Do you copy??");
var model = {
	boardSize: 7,
	numShips: 3,
	shipsSunk: 0,
	shipsLength: 3,

	generateShip: function(){
		var row,col;
		// we use the Math Object to get a value ranging from 0-1
		var direction = Math.floor(Math.random() * 2);
		if(direction === 1){
			row =Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipsLength)); 
		}else{
			row = Math.floor(Math.random() * (this.boardSize - this.shipsLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocations = [];
		// we make a for Loop to check for the number of locations in a ship
		for(var i=0; i<this.shipsLength; i++){
			if(direction === 1){
				newShipLocations.push(row + "" + (col + i));
			}else{
				newShipLocations.push((row+i) + "" + col);
			}
		 }
		 return newShipLocations;
	},
	collision: function(locations){
		for(var i =0; i<this.numShips; i++){
			var ship = model.ships[i];
			for(var j=0; j<this.shipsLength; j++){
				if(ship.locations.indexOf(locations[j]) >=0){
					return true;
				}
			}
		}
		return false;
	},
	generateShipLocations: function(){
		var locations;
		for (var i=0; i<this.numShips; i++){
			do {
				locations = this.generateShip();
			}while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},
	ships:[{locations: [0,0,0], hits:["","",""]},
			{locations: [0,0,0], hits:["","",""]},
			{locations:[0,0,0], hits:["","",""]}
	],
	fire: function(guess){
		for(i=0; i<this.numShips;i++){
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if(index >= 0 ){
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("HIT!! Good Job.");
				if(this.isSunk(ship)){
					view.displayMessage("Great Job, you have sank all my ships!!")
					this.shipsSunk++;
				}
				return true
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Oops!! Missed try again");
		return false
	},
	isSunk: function(ship){
		for(i=0; i<this.shipsLength; i++){
			if(ship.hits[i] !== "hit"){
				return false
			}
		}
		return true
	}
}
function parseGuess(guess){
	var alphabets = ["A","B","C","D","E","F","G"];
	if(guess == null || guess.length !== 2){
		console.log("Please enter a number and a letter from the board.")
	}else{
		firstChar = guess.charAt(0);
		var row = alphabets.indexOf(firstChar);
		var column = guess.charAt(1);
		if(isNaN(row) || isNaN(column)){
			alert("Oops, sorry but those letters are not on the board..");
		}else if(row < 0 || row >= model.boardSize || column < 0 || column>= model.boardSize){
			alert("Oops, this is off the board size sorry.");
		}else{
			return row + column;
		}
	}
	return null;
}
