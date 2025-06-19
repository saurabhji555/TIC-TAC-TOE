const board = document.getElementById('board');
const statusText = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let cells = Array(9).fill('');

function createBoard() {
  board.innerHTML = '';
  cells.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (cells[index] || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    setTimeout(() => {
      alert(`Player ${currentPlayer} wins!`);
    }, 100);
  } else if (cells.every(cell => cell)) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    setTimeout(() => {
      alert("It's a draw!");
    }, 100);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];

  return winCombos.some(combo => 
    combo.every(index => cells[index] === currentPlayer)
  );
}

function resetGame() {
  cells = Array(9).fill('');
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
