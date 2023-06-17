 // Array para representar o tabuleiro
 let board = ['', '', '', '', '', '', '', '', ''];

 // Array de combinações vencedoras
 const winningCombos = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
 ];

 // Variável para rastrear o turno atual
 let currentPlayer = 'X';

 // Função para desenhar o tabuleiro na tela
 function renderBoard() {
   const boardContainer = document.querySelector('.board');
   boardContainer.innerHTML = '';

   for (let i = 0; i < board.length; i++) {
     const cell = document.createElement('div');
     cell.innerText = board[i];
     cell.addEventListener('click', () => {
       if (board[i] === '' && !isGameOver()) {
         makeMove(i, currentPlayer);
         if (!isGameOver()) {
           currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
           if (currentPlayer === 'O') {
             setTimeout(makeAIMove, 500);
           }
         }
       }
     });

     boardContainer.appendChild(cell);
   }
 }

 // Função para fazer uma jogada
 function makeMove(index, player) {
   board[index] = player;
   renderBoard();
 }

// Função para verificar se o jogo acabou
function isGameOver() {
  const winner = getWinner();
  if (winner === 'X' || winner === 'O') {
    setTimeout(() => {
      if (winner === 'O')
      {
        alert('A IA venceu!');
      }
      else
      {
        alert('O jogador ' + winner + ' venceu!');
      }
      resetGame();
    }, 100);
    return true;
  } else if (board.filter(cell => cell === '').length === 0) {
    setTimeout(() => {
      alert('Empate!');
      resetGame();
    }, 100);
    return true;
  }

  return false;
}

// Função para obter o vencedor (se houver)
function getWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}


 // Função para redefinir o jogo
 function resetGame() {
   board = ['', '', '', '', '', '', '', '', ''];
   currentPlayer = 'X';
   renderBoard();
 }

 // Função que verifica se a jogada é válida
 function isValidMove(index) {
   return board[index] === '';
 }

 // Função que implementa o algoritmo Minimax
 function minimax(board, depth, maximizingPlayer) {
   const scores = {
     X: 1,
     O: -1,
     tie: 0
   };

   if (getWinner() === 'X') {
     return scores.X - depth;
   } else if (getWinner() === 'O') {
     return scores.O + depth;
   } else if (board.filter(cell => cell === '').length === 0) {
     return scores.tie;
   }

   if (maximizingPlayer) {
     let maxEval = -Infinity;
     let bestMove;
     for (let i = 0; i < board.length; i++) {
       if (board[i] === '') {
         board[i] = 'X';
         let eval = minimax(board, depth + 1, false);
         board[i] = '';
         if (eval > maxEval) {
           maxEval = eval;
           bestMove = i;
         }
       }
     }
     if (depth === 0) {
       return bestMove;
     }
     return maxEval;
   } else {
     let minEval = Infinity;
     let bestMove;
     for (let i = 0; i < board.length; i++) {
       if (board[i] === '') {
         board[i] = 'O';
         let eval = minimax(board, depth + 1, true);
         board[i] = '';
         if (eval < minEval) {
           minEval = eval;
           bestMove = i;
         } else if (eval === minEval && Math.random() < 0.3) {
           // Introduzir uma chance de fazer uma jogada diferente para aumentar a dificuldade
           minEval = eval;
           bestMove = i;
         }
       }
     }
     if (depth === 0) {
       return bestMove;
     }
     return minEval;
   }
 }

// Função para fazer a jogada da IA
function makeAIMove() {
  const bestMove = minimax(board, 0, true);
  makeMove(bestMove, currentPlayer);

  if (!isGameOver()) {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}


 // Inicialização do jogo
 renderBoard();