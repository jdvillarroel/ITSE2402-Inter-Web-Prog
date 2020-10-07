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

/**Gets all the elements(img) that contain the cards on the board */
let cards = document.getElementsByClassName('card');

/** Gets the elements in the dropdown menu to select the card back color */
let dropDownButton = document.getElementsByClassName('dropdown-item');

/** Used to hold the flags to determine when a specific card has been clicked or not */
let cardClickedFlag = [];

/** Used to track if the game has started. If started flag is true, false otherwise */
let gameStarted = false;

/** Used to determine who's player turn is. 1 = player 1, 2 = player 2 */
let player = 1;

/** Holds the divs where the score will be displayed */
let playerScore = document.querySelectorAll('.my-score div');

/** Holds the paragraphs that identifies the player */
let playerTurn = document.querySelectorAll('.my-score p');

/** Used to identify which player turn is */
let playerColor = ['navy', 'crimson'];

/** Holds a counter of both players turns to shown message at the end of the game */
let gameCounter = 0;

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
 * Sets the color of paragraph that identifies the players indicating who's turn is. The opposite
 * player identifier is set to black. The index of the playerColor array is set using the player variable
 * which holds who's turn is. 1 for player 1 and 2 for player 2, so I subtract 1 to math the index of the
 * array.
 */
function setTurnColor() {
    if(player == 1)
    {
        playerTurn[0].style.color = playerColor[player - 1];    //Set current player color
        playerTurn[1].style.color = '#343a40';
    }else {
        playerTurn[1].style.color = playerColor[player - 1];    //Set current player color
        playerTurn[0].style.color = '#343a40';
    }
}

/**
 * This function displays a message indicating the player who won the game.
 * It gets the HTML elements (div container of the message and the h3) to
 * modify their properties to display the message.
 */
function showWinnerMsg() {
    /** Gets the HTML elements */
    let winnerCup = document.querySelector('.winner-msg');
    let winner = document.querySelector('.winner-msg h3');
    
    /** Gets the scores for each player */
    let scorePlayer1 = parseInt(playerScore[0].textContent);
    let scorePlayer2 = parseInt(playerScore[1].textContent);

    /**
     * Compare the scores of the players to determine which one is the winner. It modifies
     * the h3 text content according to the winner.
     */
    if(scorePlayer1 > scorePlayer2) {
        winner.textContent = 'Player 1 WINS!!!';
    }else if(scorePlayer1 < scorePlayer2) {
        winner.textContent = 'Player 2 WINS!!!';
    }else {
        winner.textContent = 'Game Tied!';
        
        /**
         * If game is tied, the paragraph containing the stars and the cup image
         * wont be displayed.
         */
        document.querySelector('.inner').style.display = 'none';
        document.querySelector('.winner-msg p').style.display = 'none';
    }

    /** Makes the div container visible on the screen */
    winnerCup.style.display = 'flex';
}

/**
 * This functions gets the added value for the player, convert it to a number and add the new
 * card value selected. The selected value is removed from the array(cardImg) that contains all
 * the cards in play. Then, sets the turn to next player.
 * @param {
 * } randCardIndex 
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

        gameCounter++;

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

        gameCounter++;

        /** next player turn */
        player = 1;
        setTurnColor();

        /**
         * Checks if the game ended. As the player 1 always starts the game, player 2
         * always will finish it. After 12 plays the game ends. It calls the function
         * to display the winner.
         */
        if(gameCounter == 12) {
            showWinnerMsg();
        }
    }
}

/**
 * When a card is clicked(img) this function is called(added previously by the method
 * addEventListener). Since the eventListener cannot be removed to avoid multiple
 * clicks on the same card(img) a flag is used to know the card was already selected.
 * The source file for the image is replaced by a new image loaded from the array which
 * contains all the cards. A random number is used to select the image.
 * @param {*} cardIndex 
 */
function discoverCard(cardIndex) {
    if(cardClickedFlag[cardIndex] == undefined)
    {
        /** Makes flag true to avoid executing the code again */
        cardClickedFlag[cardIndex] = true;

        /** Randomly select the index of the card */
        let randCardIndex = Math.floor(Math.random()*cardImg.length);

        /** Replace the image for the new one */
        cards[cardIndex].src = 'images/' + cardImg[randCardIndex][0];

        /** Color is added to the card to identify which player played the card */
        cards[cardIndex].style.borderColor = playerColor[player - 1];

        updateScore(randCardIndex);       

        // console.log(`Card Clicked = ${cardIndex + 1}, rand = ${randCardIndex}`);  //Debugging purpose
    }        
}

/**
 * addEventListener method is used to add the functions that will be executed
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

/** Reloads the entire page to start the game again */
function resetButton() {
    location.reload();
}

/** Automatic call of the function to add the events to the dropdown button */
window.onload = function() {
    addDropDownEvents();
}

/**
 * Print the game instructions.
 */
function instructions() {
    alert(
        "Add Them Up Instructions:\n\n\
        The game consists of two players. Each player has the opportunity\n\
        to discover a card from the board. The value of the card will be\n\
        added to that player. Once the card is selected the other player\n\
        will have the chance to pick his/her card. Once all cards are\n\
        discovered the game will end, and the player who added the greater\n\
        amount of card values will win the game.\n\n\
        Each player is identified with a color. The text \"Player 1\" and\n\
        \"Player 2\" on the board will be colored according to who's\n\
        player turn is.\n\
        Player 1 always starts choosing first!\n\n\
        ->  To start the game: \n\
        1.  Select the color of your preference for the card deck.\n\
        2.  Click the \"START\" button to start the game. Once the\n\
            game has started the card deck color cannot be changed.\n\
        3.  To reload the game click the \"RESET\" button."

    );
}

/**
 * Information about the author and project.
 */
function aboutMe() {
    alert(
        "Author: Jesus Villarroel\n\
        Project #3 for:\n\
        ITSE2402 - Intermediate Web Programming\n\
        Fall 2020\n\
        Houston Community College.\n"
    );
}





