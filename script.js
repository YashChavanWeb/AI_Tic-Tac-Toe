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
                return gameBoard[a];
            }
        }

        return null;
    };

    // Function to change the switch 
    function changeBg() {
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
            gameBoard[index] = currentPlayer;
            boxes[index].textContent = currentPlayer;
            boxes[index].classList.add('clicked');

            const winner = checkWinner();
            if (winner) {
                gameOver = true;
                messageDisplay.classList.remove('hide');
                winnerDisplay.textContent = `${winner} wins!`;
            } else if (isBoardFull()) {
                gameOver = true;
                messageDisplay.classList.remove('hide');
                winnerDisplay.textContent = 'It\'s a tie!';
            } else {
                changeBg();
                // If AI is the next player, make its move
                if (currentPlayer === playerO && playerTypeSelect.value === 'ai') {
                    makeAIMove();
                }
            }
        }
    };

    // Function to make AI move using Minimax algorithm
    const makeAIMove = () => {
        const bestMove = getBestMove();
        handlePlayerMove(bestMove);
    };

    // Function to get the best move for the AI using Minimax algorithm
    const getBestMove = () => {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === '') {
                gameBoard[i] = playerO;
                const score = minimax(gameBoard, 0, false);
                gameBoard[i] = '';

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
            return scores[winner];
        }

        if (isBoardFull()) {
            return scores.tie;
        }

        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = playerO;
                    maxScore = Math.max(maxScore, minimax(board, depth + 1, !isMaximizing));
                    board[i] = '';
                }
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = playerX;
                    minScore = Math.min(minScore, minimax(board, depth + 1, !isMaximizing));
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
        resetGame();
        messageDisplay.classList.add('hide');
    });

    // Event listener for New Game button
    newGameBtn.addEventListener('click', () => {
        resetGame();
        messageDisplay.classList.add('hide');
    });

    // Function to reset the game
    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        boxes.forEach((box) => {
            box.textContent = '';
            box.classList.remove('clicked');
        });

        currentPlayer = playerX;
        gameOver = false;

        // Reset background colors
        document.querySelector('#one').style.backgroundColor = "white";
        document.querySelector('#two').style.backgroundColor = "#DC143C";
    };

    // Event listener for player type selection
    playerTypeSelect.addEventListener('change', () => {
        resetGame();
        if (currentPlayer === playerO && playerTypeSelect.value === 'ai') {
            makeAIMove();
            changeBg(); // Ensure background color is updated after AI move
        }
    });
});
                            