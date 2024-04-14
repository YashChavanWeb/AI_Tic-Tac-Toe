# Task:
To build a tic-tac-toe web application, you can use HTML, CSS, and JavaScript. By implementing functions to handle user clicks, track game state, and check for winning conditions, you can create an interactive and engaging tic-tac-toe game. With these technologies and functionalities, users can play against each other or against an AI opponent, aiming to get three markers in a row to win the game.

Website Link : https://yashchavanweb.github.io/AI_Tic-Tac-Toe/


# Demo : 
https://github.com/YashChavanWeb/PRODIGY_WD_03/assets/112185595/3c79cb22-719d-450e-be7f-adf83dbc9c8a


# Learnings from the Project:

## HTML:
1. Implementing the concept of forms by using labels
2. Using select in forms for a dropdown of switching the player type
3. Using buttons to create the blocks of the Tic Tac Toe
4. Implementing buttons to reset the game and declare the winner by hiding them before the result



## CSS:
1. The game is divided as - main div -> container div -> buttons 
2. Width and height of the container are given 60 so that 3 by 3 boxes can fit inside it with a height of 18 and width of 18 (approx 20) 
3. Using the transform property to apply the flipping effect on the button, later we need to add a transition in the main class to apply this 
4. rotateY() property rotates the element in the Y direction by the angle specified 
5. .clicked is the class added later by JS after the click event 
6. Making display inline-block to set the width and apply all other properties as they are restricted for inline 
7. Creating a hide class and setting its display to none which will be removed later, and the buttons will be visible 



## JS:
1. First, we have the main function which runs on the reload of the website
2. Then, we declare an empty array for the game board and store all the values from HTML using the query selector

Functions Used:
1. Check Winner Function:
   - Iteratively stores the value of each pattern in a, b, and c, and then checks if the values at all these 3 positions are the same, declaring a winner.
   - Utilizes a for-of loop, considering the game board as an array.

2. Change Background Function:
   - Allows changing the state from X to O and vice versa.
   - Achieves a swapping effect by constantly changing the background color.

3. Is Board Full Function:
   - Checks if there is an empty box in the array. If there is, the overall value is !(true), which is false, indicating the board is not full.
   - Used if the winner is not declared and it is a tie.

4. Handle Player Move Function (parameter: index):
   - Updates the game state by filling the array with X and O at the given index as a parameter.
   - First in the if condition we check if game is over and gameboard index is not filled "" then
     - Adds the value to the game board array.
     - Adds the value to the list of boxes by text content.
     - Adds the clicked class to show the flip animation.
   - Stores the winner by calling the check winner function.
   - If there is a winner then:
     - Game over is set to true.
     - The two hidden buttons are shown by removing the hide class.
     - The winner paragraph is modified by text content and backticks.
   - If there is no winner (null), indicating a tie:
     - Game over is set to true.
     - Removes the hide class for display.
     - Modifies the paragraph - 'It\'s a tie!' (\ is used to include the apostrophe).
   - If neither condition is true, the game is still running.
     - Changes the background.
     - If AI is the player and the current player is O, calls the make AI move function.

5. Make AI Move Function:
   - Adds a time delay for a smoother AI move : Syntax - setTimeout(callbackFunction, delayInMilliseconds);.
   - Calls two functions:
     - Stores the get best move function value.
     - Passes this value as a parameter to the handle player move function.

6. Get Best Move Function (initial values: bestMove, bestScore):
   - Runs a loop 9 times, representing each cell on the game board.
   - If the game board has no value:
     - Stores O at that game board index.
     - Goes to the Minimax algorithm, which gives the index of the game as the score.
     - Undoes the game board changes as its work is over.
     - If the score is greater than the best score, updates both best move and best score.
   - Returns the best move at the end of the function.


7. Minimax Algorithm Function:
   - Represents the artificial intelligence (AI) decision-making process to find the best move.
   - Takes three parameters: `board` represents the current state of the game, `depth` represents the depth of the current move in the game tree, and `isMaximizing` is a boolean indicating         whether it's the AI's turn (true) or the opponent's turn (false).

   - Scores Object:
     - Defines a scores object with values for 'X', 'O', and 'tie' to assign scores for different outcomes.

   - Winner Check:
     - Calls the `checkWinner` function to determine if there's a winner. If a winner is found, returns the corresponding score based on the winner.

   - Full Board Check:
     - Calls the `isBoardFull` function to check if the board is full. If true, returns a tie score.

   - Maximizing Player (AI's Turn):
     - If it's the AI's turn, evaluates possible moves and chooses the one with the maximum score.
     - Uses recursion to explore different moves at various depths in the game tree.
     - Simulates each move, calculates the score using the Minimax algorithm, and chooses the move with the maximum score.
     - Simulated moves are undone to explore other possibilities.

   - Minimizing Player (Opponent's Turn):
     - If it's the opponent's turn, similar to the maximizing player, evaluates possible moves and chooses the one with the minimum score.
     - Utilizes recursion to explore different moves and selects the move with the minimum score.

   - Returning Scores:
     - Returns the calculated score for the chosen move.
Note:
1. Depth of the Current Move (0):
   - Represents how many moves ahead the algorithm is considering in the game tree.
   - In the Minimax algorithm, the depth parameter tracks the depth of the current node in the tree.
   - The `minimax` function is typically called recursively, evaluating possible moves at different depths.
   - In the statement `const score = minimax(gameBoard, 0, false);`, the depth is initially set to 0.

2. False Indicates It's Not the AI's Turn:
   - The third parameter in the `minimax` function, represented by `false`, indicates whether it's the AI's turn or the opponent's turn.
   - The Minimax algorithm alternates between maximizing and minimizing players.
   - In the statement `const score = minimax(gameBoard, 0, false);`, `false` indicates that it's not the AI's turn at the moment.

Here's a brief breakdown:

Maximizing Player (AI):
- Depth: 0, turn: true (for AI)
- Depth: 1, turn: false (for opponent)
- Depth: 2, turn: true (for AI)
... and so on.

Minimizing Player (Opponent):
- Depth: 0, turn: false (for opponent)
- Depth: 1, turn: true (for AI)
- Depth: 2, turn: false (for opponent)
... and so on.

These parameters help the algorithm navigate the game tree, considering different moves and determining the best move based on the evaluation of potential outcomes at different depths.

If you change the condition to `score > bestScore`, it would mean that the algorithm is looking for the maximum score during the evaluation of possible moves. This is typically the case when the current player is the maximizing player (e.g., AI), and the goal is to find the move that leads to the highest score.

Here's the modified code:

if (score > bestScore) {
    bestScore = score;
    bestMove = i;
}

Explanation:

1. `score > bestScore`:
   - Checks if the score of the current move (determined by the `minimax` function) is greater than the current best score (`bestScore`).
   - In Minimax, when it's the maximizing player's turn (e.g., AI), a higher score is more favorable.

2. Updating `bestScore` and `bestMove`:
   - If the condition is true, meaning the current move has a higher score than the current best score, the `bestScore` is updated with the current score, and `bestMove` is updated with the index of the current move (`i`).

Let's consider an example:

Suppose the Minimax algorithm is evaluating possible moves for the AI, and it finds the following scores for three different moves: `score1 = 3`, `score2 = 7`, and `score3 = 5`. The current `bestScore` is initially set to negative infinity.

1. Initial State:
   - `bestScore = -Infinity`
   - `bestMove = undefined`

2. First Move (score1 = 3):
   - The condition `score1 > bestScore` is true (3 > -Infinity).
   - Update `bestScore` to 3.
   - Update `bestMove` to the index of the first move.

3. Second Move (score2 = 7):
   - The condition `score2 > bestScore` is true (7 > 3).
   - Update `bestScore` to 7.
   - Update `bestMove` to the index of the second move.

4. Third Move (score3 = 5):
   - The condition `score3 > bestScore` is false (5 is not greater than 7).
   - No update to `bestScore` or `bestMove`.

After evaluating all moves, `bestMove` will represent the index of the move with the maximum score (score2), which is the move that the AI should choose to maximize its potential gain.

8. Apply forEach Loop for Each Box:
   - Associates each box with a click event, sending its index to the `handlePlayerMove` function when clicked.

9. Reset Game Function:
   - Brings everything to its original state.
   - Makes the array empty.
   - Removes the clicked class.
   - Sets the current player to 'X'.
   - Game over is false.
   - Modifies the background.

Note: Change event in event listener takes place when the user changes the dropdown list.



