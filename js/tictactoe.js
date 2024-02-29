// --- basic game variables 
let currentPlayer = 'X'; // start player
let gameBoard = ['', '', '', '', '', '', '', '', '']; // 3x3 game board flat
let gameActive = true; // game ongoing

// --- update gameboard
function handlePlayTurn(clickedCellIndex) {
    if (gameBoard[clickedCellIndex] !== '' || !gameActive) return;
        // checks if the clicked cell is empty or if the game is not active 
    gameBoard[clickedCellIndex] = currentPlayer;
        // updates gameboard arr for X or O
    checkForWin();
        //runs function to check for end of game
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        // changes players every round    
  } // end handlePlayTurn()

// --- listen to the cells
const cells = document.querySelectorAll('.cell');
    // gets all the .cell divs at once

cells.forEach(cell => {
    cell.addEventListener('click', cellClicked);
    }); //calls cellClicked function when cell is clicked

function cellClicked(clickedCellEvent) {
    console.log('cellClicked'); //check if function is called
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.id.replace('cell-', '')) - 1;
        //gets clicked cell and index

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) return;
        // checks if the clicked cell is empty or if the game is active

    handlePlayTurn(clickedCellIndex);
        //adds player mark at cell index
    updateDOM();
        // function to updates DOM ui output
} // end cellClicked()

// --- Update the Dom
function updateDOM() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = gameBoard[i];
        // loops through all the cells of the board to update with the gameboard array
    }
} // end updateUI()

// --- game rules
const winConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Left-to-right diagonal
    [2, 4, 6]  // Right-to-left diagonal
  ];

// --- checks for end of game condition and triggers player feedback
function checkForWin() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) { //runs through all win conditions
        const [a, b, c] = winConditions[i];
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            roundWon = true;
            break;
        } // checks if gameboard values equal win conditions
    }

    if(roundWon){
        announceWinner(currentPlayer);
            // if round won, calls another function to announce winner
        gameActive = false;
            // resets game state
        return;
    }

    let roundDraw = !gameBoard.includes('');
        //checks if gameboard has any empty spaces
    if (roundDraw) {
        announceDraw();
            //calls another function to announce draw
        gameActive = false;
            // resets game state
        return;
    }    
} // end checkForWin()

// --- output game results
const gameMsg = document.getElementById('gameMessage');
    //grabs DOM element
function announceWinner(player) {
    gameMsg.style.visibility = "visible";
        //makes element visible
    gameMsg.textContent = `Player ${player} Wins!`;
        //updates text
} // outputs winner message
function announceDraw() {
    gameMsg.style.visibility = "visible";
    gameMsg.textContent = `The Game's a Draw!`;
  } // outputs draw message

// --- reset game to play again
resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetGame);
function resetGame(){
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Clear the game board
    gameActive = true; // Set the game as active
    currentPlayer = 'X'; // Reset to first player to X

    cells.forEach(cell => {
        cell.textContent = '';
    }); // Clear all cells

    gameMsg.style.visibility = "hidden";
    gameMsg.textContent = '';
}