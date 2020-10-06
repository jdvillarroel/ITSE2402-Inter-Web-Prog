/**
 *  Array that holds the paths for each card back color that can be used in the game.
 *  These colors can be selected to change the color of the cards.
 **/
let deckBackColor = [
    'images/blue_back.png',
    'images/red_back.png',
    'images/green_back.png',
    'images/gray_back.png',
    'images/yellow_back.png'
];

/**
 * Array that contains all the names of the files for each card that can appear in the game,
 * and its numerical value to be used to calculate the score.
 */
let cardImg = [
    ['AS.png', 1], ['2S.png', 2], ['3S.png', 3], ['4S.png', 4], ['5S.png', 5], ['6S.png', 6], ['7S.png', 7], ['8S.png', 8], ['9S.png', 9], ['10S.png', 10], ['JS.png', 10], ['QS.png', 10], ['KS.png', 10],
    ['AC.png', 1], ['2C.png', 2], ['3C.png', 3], ['4C.png', 4], ['5C.png', 5], ['6C.png', 6], ['7C.png', 7], ['8C.png', 8], ['9C.png', 9], ['10C.png', 10], ['JC.png', 10], ['QC.png', 10], ['KC.png', 10],
    ['AH.png', 1], ['2H.png', 2], ['3H.png', 3], ['4H.png', 4], ['5H.png', 5], ['6H.png', 6], ['7H.png', 7], ['8H.png', 8], ['9H.png', 9], ['10H.png', 10], ['JH.png', 10], ['QH.png', 10], ['KH.png', 10],
    ['AD.png', 1], ['2D.png', 2], ['3D.png', 3], ['4D.png', 4], ['5D.png', 5], ['6D.png', 6], ['7D.png', 7], ['8D.png', 8], ['9D.png', 9], ['10D.png', 10], ['JD.png', 10], ['QD.png', 10], ['KD.png', 10]
];

/**Gets all the elements that contain the cards on the board */
let cards = document.getElementsByClassName('card');

/** Gets the elements in the dropdown menu to select the card back color */
let dropDownButton = document.getElementsByClassName('dropdown-item');

/** Used to hold the flags to determine when a specific card has been clicked or not */
let cardClickedFlag = [];

/** Used to track if the game has started. If started flag is true, false otherwise */
let gameStarted = false;

/** Used to determine whos player turn is. 1 = player 1, 2 = player 2 */
let player = 1;

/** Holds the divs where the score will be displayed */
let playerScore = document.querySelectorAll('.my-score div');

/** Holds the paragraphs that identifies the player */
let playerTurn = document.querySelectorAll('.my-score p');

/** Used to identify which player turn is */
let playerColor = ['navy', 'crimson'];

/**
 * Change the source file for the images in the card containers, changing the back color
 * of the cards. It receives the index to look into the array deckBackColor.
 * @param {*} colorIndex : index to get the path from the array deckBackColor.
 */
function changeColor(colorIndex) {
    if(!gameStarted)
    {
        for(let index = 0; index < cards.length; index++) {
            cards[index].src = deckBackColor[colorIndex];
        }
    }
    
}

/**
 * Add the events listener to the dropdown button to change the back color of the cards.
 */
function addDropDownEvents() {

    /**
     * For each element in the dropdown button an event listener is added and change
     * the image source back color for all the cards.
     */
    for(let index = 0; index < dropDownButton.length; index++)
    {
        dropDownButton[index].addEventListener("click", function() {
            changeColor(index);
        });
    }

   
}

/**
 * Sets the color of paragraph that identifies the players indicating whos turn is. The oposite
 * player identifier is set to black. The index of the playerColor array is set using the player variable
 * which holds whos turn is. 1 for player 1 and 2 for player 2, so I subtract 1 to math the index of the
 * array.
 */
function setTurnColor() {
    if(player == 1)
    {
        playerTurn[0].style.color = playerColor[player - 1];
        playerTurn[1].style.color = 'black';
    }else {
        playerTurn[1].style.color = playerColor[player - 1];
        playerTurn[0].style.color = 'black';
    }
}

/**
 * 
 * @param {*} randCardIndex 
 */
function updateScore(randCardIndex) {
    if(player == 1)
    {
        /**
         * Get the current score and add the new card selected. The content of the div must be
         * converted to a number to add the new value. playerScore object is defined as global. 
         */
        playerScore[0].textContent = parseInt(playerScore[0].textContent) + cardImg[randCardIndex][1];

        /**Removed the card from the deck to avoid selecting it again */
        cardImg.splice(randCardIndex, 1);

        /** next player turn */
        player = 2;
        setTurnColor();
    }else {
        /**
         * Get the current score and add the new card selected. The content of the div must be
         * converted to a number to add the new value. playerScore object is defined as global. 
         */
        playerScore[1].textContent = parseInt(playerScore[1].textContent) + cardImg[randCardIndex][1];

        /**Removed the card from the deck to avoid selecting it again */
        cardImg.splice(randCardIndex, 1);

        /** next player turn */
        player = 1;
        setTurnColor();
    }
}

/**
 * When a card is clicked(img) this function is called(added previosly by the method
 * addEventListener). Since the eventListener cannot be removed to avoid multiple
 * clicks on the same card(img) a flag is used to know the card was already selected.
 * The source file for the image is replaced by a new image loaded from the array which
 * contains all the cards. A random number is used to select the image.
 * @param {*} cardIndex 
 */
function discoverCard(cardIndex) {
    if(cardClickedFlag[cardIndex] == undefined)
    {
        /** Makes falg true to avoid exceuting the code again */
        cardClickedFlag[cardIndex] = true;

        /** Randomly select the index of the card */
        let randCardIndex = Math.floor(Math.random()*cardImg.length);

        /** Replace the image for the new one */
        cards[cardIndex].src = 'images/' + cardImg[randCardIndex][0];

        cards[cardIndex].style.borderColor = playerColor[player - 1];

        updateScore(randCardIndex);

        // console.log(`Card Clicked = ${cardIndex + 1}, rand = ${randCardIndex}`);  //Debugging purpose
    }        
}

/**
 * addEventListener method is used to add the functions that will be exceuted
 * when the image card is click on. I passed the index with function to identify
 * which card was clicked.
 */
function addCardEvents() {
    for(let index = 0; index < cards.length; index++)
    {
        cards[index].addEventListener("click", function() {
            discoverCard(index);
        });
    }
}

/**
 * When the game starts by pressing the start button. The onclick events are added
 * to all the images(cards) in the game board. The gameStarted flag is set to avoid
 * changing card back color once the game is running.
 */
function startButton() {
    gameStarted = true;
    setTurnColor();
    addCardEvents();
}

function resetButton() {
    location.reload();
}

window.onload = function() {
    addDropDownEvents();
}








