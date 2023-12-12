document.addEventListener('DOMContentLoaded', () => {
    const playerX = 'X';
    const playerO = 'O';
    let currentPlayer = playerX;
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    const boxes = document.querySelectorAll('.box');
    const messageDisplay = document.querySelector('.message');
    const winnerDisplay = document.getElementById('winner');
    const playAgainBtn = document.querySelector('.play-again');
    const newGameBtn = document.getElementById('new-game');
    const playerTypeSelect = document.getElementById('playerType');

    // Function to check if the current player has won
    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];     //this will return x and Y based on the winner
            }
        }

        return null;
    };

    // Function to change the switch background color
    function changeBg() {
        // Toggle background color based on the current player
        if (currentPlayer === "X") {
            currentPlayer = "O";
            document.querySelector('#two').style.backgroundColor = "white";
            document.querySelector('#one').style.backgroundColor = "#DC143C";
        } else {
            currentPlayer = "X";
            document.querySelector('#one').style.backgroundColor = "white";
            document.querySelector('#two').style.backgroundColor = "#DC143C";
        }
    }

    // Function to check if the board is full (tie)
    const isBoardFull = () => !gameBoard.includes('');

    // Function to handle player's move
    const handlePlayerMove = (index) => {
        if (!gameOver && gameBoard[index] === '') {
            // Update game state for the selected move
            gameBoard[index] = currentPlayer;     //this will be X for the first iteration
            boxes[index].textContent = currentPlayer;  // also update on the screen
            boxes[index].classList.add('clicked');

            // Check for a winner or a tie
            const winner = checkWinner();    //the value here will be either x or y or null
            if (winner) {     //this will be true if the winner has a value and it is not null
                gameOver = true;
                messageDisplay.classList.remove('hide');
                winnerDisplay.textContent = `${winner} wins!`;
            } else if (isBoardFull()) {
                gameOver = true;
                messageDisplay.classList.remove('hide');
                winnerDisplay.textContent = 'It\'s a tie!';
            } else {
                // Switch player and continue the game
                changeBg();
                // If AI is the next player, make its move
                if (currentPlayer === playerO && playerTypeSelect.value === 'ai') {
                    makeAIMove();
                }
            }
        }
    };

    
// Function to make AI move using Minimax algorithm with a delay
const makeAIMove = () => {
    // Add a delay of 500 milliseconds (adjust the value as needed)
    setTimeout(() => {
        // Get the best move from the Minimax algorithm
        const bestMove = getBestMove();
        // Handle the AI's move
        handlePlayerMove(bestMove);
    }, 500); // 500 milliseconds delay
};


    // Function to get the best move for the AI using Minimax algorithm
    const getBestMove = () => {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                // Simulate the AI's move and evaluate the score using Minimax
                gameBoard[i] = playerO;
                const score = minimax(gameBoard, 0, false);
                // Undo the simulated move
                gameBoard[i] = '';

                // Update the best move if the current score is better
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    };

    // Minimax algorithm
    const minimax = (board, depth, isMaximizing) => {
        const scores = {
            X: -1,
            O: 1,
            tie: 0
        };

        const winner = checkWinner();
        if (winner) {
            // Return the score based on the winner
            return scores[winner];
        }

        if (isBoardFull()) {
            // Return a tie score if the board is full
            return scores.tie;
        }

        if (isMaximizing) {
            let maxScore = -Infinity;
            // Evaluate possible moves and choose the one with the maximum score
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = playerO;
                    maxScore = Math.max(maxScore, minimax(board, depth + 1, !isMaximizing));
                    // Undo the simulated move
                    board[i] = '';
                }
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            // Evaluate possible moves and choose the one with the minimum score
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = playerX;
                    minScore = Math.min(minScore, minimax(board, depth + 1, !isMaximizing));
                    // Undo the simulated move
                    board[i] = '';
                }
            }
            return minScore;
        }
    };

    // Event listeners for player's moves
    boxes.forEach((box, index) => {
        box.addEventListener('click', () => {
            handlePlayerMove(index);
        });
    });

    // Event listener for Play Again button
    playAgainBtn.addEventListener('click', () => {
        // Reset the game state and hide the message display
        resetGame();
        messageDisplay.classList.add('hide');
    });

    // Event listener for New Game button
    newGameBtn.addEventListener('click', () => {
        // Reset the game state and hide the message display
        resetGame();
        messageDisplay.classList.add('hide');
    });

    // Function to reset the game
    const resetGame = () => {
        // Reset game board and clear UI
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach((box) => {
            box.textContent = '';
            box.classList.remove('clicked');
        });

        // Reset current player and game over state
        currentPlayer = playerX;
        gameOver = false;

        // Reset background colors
        document.querySelector('#one').style.backgroundColor = "white";
        document.querySelector('#two').style.backgroundColor = "#DC143C";
    };

    // Event listener for player type selection
    playerTypeSelect.addEventListener('change', () => {
        // Reset the game state when changing player type
        resetGame();
        // If AI is the next player, make its move
        if (currentPlayer === playerO && playerTypeSelect.value === 'ai') {
            makeAIMove();
            changeBg(); // Ensure background color is updated after AI move
        }
    });
});

// Function Summaries:
// - checkWinner: Check if there is a winner based on the current game state.
// - changeBg: Toggle background color based on the current player.
// - isBoardFull: Check if the game board is full (tie).
// - handlePlayerMove: Handle the player's move, update the game state, and check for a winner or tie.
// - makeAIMove: Get the best move for the AI and handle the AI's move.
// - getBestMove: Simulate AI moves and choose the one with the highest score using Minimax.
// - minimax: Minimax algorithm for AI decision-making.
// - resetGame: Reset the game state for a new game.

