// Gameboard factory
const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', '']; // Represents the game board
  
    const getBoard = () => board;
  
    const placeMark = (index, mark) => {
      if (board[index] === '') {
        board[index] = mark;
        return true; // Mark placed successfully
      }
      return false; // Invalid move, spot already taken
    };
  
    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = '';
      }
    };
  
    return { getBoard, placeMark, resetBoard };
  })();
  
  // Player factory
  const Player = (name, mark) => {
    return { name, mark };
  };
  
  // Game control object
  const Game = (() => {
    let currentPlayer;
    let winner;
    let gameOver;
  
    const startGame = () => {
      // Initialize players
      const player1 = Player('Player 1', 'X');
      const player2 = Player('Player 2', 'O');
      currentPlayer = player1;
      winner = null;
      gameOver = false;
  
      // Reset game board
      Gameboard.resetBoard();
    };
  
    const getCurrentPlayer = () => currentPlayer;
    const getWinner = () => winner;
    const isGameOver = () => gameOver;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const checkWinner = () => {
      const board = Gameboard.getBoard();
  
      // Check rows
      for (let i = 0; i < 9; i += 3) {
        if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
          winner = currentPlayer;
          gameOver = true;
          return;
        }
      }
  
      // Check columns
      for (let i = 0; i < 3; i++) {
        if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
          winner = currentPlayer;
          gameOver = true;
          return;
        }
      }
  
      // Check diagonals
      if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
        winner = currentPlayer;
        gameOver = true;
        return;
      }
      if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
        winner = currentPlayer;
        gameOver = true;
        return;
      }
  
      // Check for tie
      if (!board.includes('')) {
        gameOver = true;
      }
    };
  
    const makeMove = (index) => {
      if (!gameOver && Gameboard.placeMark(index, currentPlayer.mark)) {
        checkWinner();
        switchPlayer();
      }
    };
  
    return { startGame, getCurrentPlayer, getWinner, isGameOver, makeMove };
  })();
  
  // Display controller object
  const DisplayController = (() => {
    // DOM elements
    const gameBoardElement = document.getElementById('game-board');
    const gameInfoElement = document.getElementById('game-info');
    const startButton = document.getElementById('start-btn');
  
    const renderBoard = () => {
      const board = Gameboard.getBoard();
      gameBoardElement.innerHTML = '';
  
      board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => {
          if (!cell && !Game.isGameOver()) {
            Game.makeMove(index);
            renderBoard();
            if (Game.isGameOver()) {
              renderGameOver();
            }
          }
        });
        gameBoardElement.appendChild(cellElement);
      });
    };
  
    const renderGameOver = () => {
      const winner = Game.getWinner();
      if (winner) {
        gameInfoElement.textContent = `${winner.name} wins!`;
      } else {
        gameInfoElement.textContent = 'It\'s a tie!';
      }
    };
  
    startButton.addEventListener('click', () => {
      Game.startGame();
      renderBoard();
      gameInfoElement.textContent = '';
    });
  })();
  