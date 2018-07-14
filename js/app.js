/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

const cards = document.querySelectorAll(".card");
const deck = document.querySelector(".deck");
const moves = document.querySelector(".moves");
const restart = document.querySelector(".restart");
const stars = document.querySelector(".stars");
const timerDiv = document.querySelector(".time");
const winModal = $("#winModal");
const modalText = document.querySelector("#winText");
const modalRestart = document.querySelector("#modalRestart");
let opened = [];
let timer;
let interval;
let movesCounter = 0;
//this flag will not allow user to click on cards while animation is performing
let flag = true;
//this flag is for setting the timer one time
let timerFlag = true;

let matchCounter = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function cardClick(evt){
	if(!evt.target.classList.contains("open") && evt.target.tagName === "LI" && !evt.target.classList.contains("active") && flag){
		movesCounter++;
		moves.textContent = movesCounter + " Moves";
		evt.target.classList.add("open", "show", "active");
		opened.push(evt.target.firstElementChild);
		if(timerFlag){
			timer = new Date().getTime();

			interval = setInterval(function(){
				if(timer === 0){
					return;
				}

				timerDiv.textContent = (new Date().getTime()-timer)/1000;
			}, 100);

			timerFlag = false;
		}
		if(opened.length>1){
			console.log(opened);
			if(opened[0].classList[1] === opened[1].classList[1]){
				opened[0].parentElement.classList.add("match");
				opened[1].parentElement.classList.add("match");
				flag = false
				matchCounter++;
				setTimeout(function(){
					opened[0].parentElement.classList.remove("active");
					opened[1].parentElement.classList.remove("active");
					opened = [];
					flag = true;
					if(matchCounter === 8){
						timer = 0;
						modalText.textContent = "You win in " + movesCounter + " moves and in " + timerDiv.textContent + " seconds and get " + stars.children.length + " stars.";
						winModal.modal();
					}
				}, 500);
			} else {
				opened[0].parentElement.classList.add("fail");
				opened[1].parentElement.classList.add("fail");
				flag =  false;
				setTimeout(function(){
					opened[0].parentElement.classList.remove("open", "show", "match", "fail", "active");
					opened[1].parentElement.classList.remove("open", "show", "match", "fail", "active");
					opened = [];
					flag = true;
				}, 500);
			}	
		}
		switch(movesCounter){
			case 30:
				stars.removeChild(stars.children[0]);
				break;
			case 40:
				stars.removeChild(stars.children[0]);
				break;
		}
	}
}

function restartClick(){
	const fragment = document.createDocumentFragment();
	const liEl = deck.querySelectorAll("li.card");
	let indexes = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
	console.log(indexes);
	timer = 0;
	timerDiv.textContent = "00:00"
	timerFlag = true;
	movesCounter = 0;
	matchCounter = 0;
	moves.textContent = movesCounter + " Moves";
	opened = [];
	for(let i of indexes){
		liEl[i].classList.remove("open", "show", "match", "fail", "active");
		fragment.appendChild(liEl[i]);
	}
	stars.innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
	deck.innerHTML = "";
	deck.appendChild(fragment);
}


restart.addEventListener("click", restartClick);

modalRestart.addEventListener("click", restartClick);

deck.addEventListener("click", cardClick);

//initial shuffle
restartClick();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
