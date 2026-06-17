const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn');
const resetScoreBtn = document.getElementById('reset-score-btn');

const scoreXText = document.getElementById('score-x');
const scoreOText = document.getElementById('score-o');
const scoreDrawsText = document.getElementById('score-draws');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Dhibco kaydiyaha
let scores = { X: 0, O: 0, draws: 0 };

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());

    checkResult();
}

function checkResult() {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;
        
        if (a === b && b === c) {
            roundWon = true;
            winningLine = winCondition;
            break;
        }
    }

    if (roundWon) {
        statusText.innerText = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        scores[currentPlayer]++;
        updateScoreboard();
        
        // Ku dar iftiinka guusha unugyadii guulaystay
        winningLine.forEach(index => cells[index].classList.add('winner'));
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusText.innerText = "Game Draw! 🤝";
        gameActive = false;
        scores.draws++;
        updateScoreboard();
        return;
    }

    // Badal badelka ciyaaryahanka
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `${currentPlayer}'s Turn`;
    
    // Badal midabka indicator-ka dhex fadhiya
    const indicator = document.querySelector('.status-indicator');
    if(currentPlayer === 'O') {
        indicator.style.backgroundColor = '#F472B6';
        indicator.style.boxShadow = '0 0 10px #F472B6';
    } else {
        indicator.style.backgroundColor = '#38BDF8';
        indicator.style.boxShadow = '0 0 10px #38BDF8';
    }
}

function updateScoreboard() {
    scoreXText.innerText = scores.X;
    scoreOText.innerText = scores.O;
    scoreDrawsText.innerText = scores.draws;
}

function restartGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusText.innerText = "X's Turn";
    
    const indicator = document.querySelector('.status-indicator');
    indicator.style.backgroundColor = '#38BDF8';
    indicator.style.boxShadow = '0 0 10px #38BDF8';

    cells.forEach(cell => {
        cell.className = 'cell'; // Nadiifi unug kasta class-kiisa
    });
}

function resetScore() {
    scores = { X: 0, O: 0, draws: 0 };
    updateScoreboard();
    restartGame();
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
resetScoreBtn.addEventListener('click', resetScore);