
var notes = [];



function Arrow(direction) {


	var xPos = null;

	switch(direction) {

		case "left-red" : xPos = "115px";
		break;

		case "up-red" : xPos = "182";
		break;

		case "down-red" : xPos = "252px";
		break;

		case "right-red" : xPos = "322px";
		break;

	}

	this.direction = direction;
	this.image = $("<img src='./arrows/" + direction + ".png'/>");
	this.image.css({

		position: "absolute",
		bottom: "6px",
		left: xPos

	});

	$('.stage').append(this.image);

}
Arrow.prototype.step = function() {

	// Controls the speed of the arrows
	this.image.css("bottom", "+=4px");

};


Arrow.prototype.destroy = function() {

	
	this.image.remove();


	notes.splice(0,1);

};


Arrow.prototype.explode = function() {

	this.image.remove();

};




var randNum = 0;


var frame = 0;


var arrowSpawnRate = 20;



function randomGen() {

	
	
    randNum = Math.floor(Math.random() * 4) + 1;

	if (randNum === 1) {

		notes.push(new Arrow("left-red"));

	}
	if (randNum === 2) {

		notes.push(new Arrow("right-red"));

	}
	if (randNum === 3) {

		notes.push(new Arrow("up-red"));

	}
	if (randNum === 4) {

		notes.push(new Arrow("down-red"));

	}

}



function render() {

	if (frame++ % arrowSpawnRate === 0) {

		randomGen();
        

	}

	for (var i = notes.length - 1; i >= 0; i--) {
        console.log(notes[i])
		notes[i].step();


		if (notes[i].image.position().bottom > 615) {

			notes[i].destroy();

		}

	}

}




$(document).ready(function () {

	
	window.requestAnimFrame = (function() {

		return window.requestAnimationFrame ||

		window.webkitRequestAnimationFrame ||

		window.mozRequestAnimationFrame ||

		function(callback) {

			window.setTimeout(callback, 40 / 75);

		};

	})();

	
	(function animloop() {

		requestAnimFrame(animloop);

		render();

	})();


});




$(document).keydown( function(event) {

	for (var i = 0; i < notes.length; i++) {

			console.log(notes[i].image.position().top);

		if (event.keyCode == 37 && notes[i].direction == "left-red") {

			if (notes[i].image.position().top > 10 && notes[i].image.position().top < 40) {

				console.log("LEFT! "+notes[i].explode());

			}

		}
		if (event.keyCode == 38 && notes[i].direction == "up-red") {

			if (notes[i].image.position().top > 10 && notes[i].image.position().top < 40) {

				console.log("UP! "+notes[i].explode());

			}

		}
		if (event.keyCode == 40 && notes[i].direction == "down-red") {

			if (notes[i].image.position().top > 10 && notes[i].image.position().top < 40) {

				console.log("DOWN! "+notes[i].explode());

			}

		}
		if (event.keyCode == 39 && notes[i].direction == "right-red") {

			if (notes[i].image.position().top > 10 && notes[i].image.position().top < 40) {

				console.log("RIGHT! "+notes[i].explode());

			}

		}

	}

});
