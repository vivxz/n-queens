/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/
*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/* ** Strategy **
We need to make an array which is a row in our chessboard. Everytime we iterate through the
for loop, either 0 or 1 is pushed through. If index i is equal to 0 or 1. (When to push 1??)
*/
window.findNRooksSolution = function(n) {
  //   var board = new Board({n});
  //   var solution;
  //   const findSolution = (row = 0) => {
  //     if (row < n && solution){
  //       for (var col = 0; col < n; col++){
  //         // check next row and repeat
  //         if(!board.hasAnyRooksConflicts()){
  //           findSolution(row++);
  //         }
  //         board.togglePiece(row,col);
  //       }
  //     } else if (row === n){
  //       solution = board.rows().slice().map(row => row.slice());
  //     }
  //   }
  //   findSolution();
  //   return solution;
  // };
  
    var solution = [];
    for (var i = 0; i < n; i++) {
      var row = [];
      for(var j = 0; j < n; j++){
        row.push(0);
      }
      row[i] = 1;
      solution.push(row);
    }
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
    return solution;
  };
  
  /*
  window.findNRooksSolution = function(n) {
  var board = new Board({n});
  var solution;
  const findSolution = (row = 0) => {
    if (row < n && solution){
      for (var col = 0; col < n; col++){
        // check next row and repeat
        if(!board.hasAnyRooksConflicts()){
          findSolution(row++);
        }
        board.togglePiece(row,col);
      }
    } else if (row === n){
      solution = board.rows().slice().map(row => row.slice());
    }
  }
  findSolution()
  return solution;
  */
  
  // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
  // Input: An integer
  // Output: Number of nxn chessboards with n rooks placed such that none can attack each other
  // Constraints: Chessboards from 1x1 to 8x8 ; there isn't actually a constraints ...
  // Edge Cases: If they don't put in a number from 1 through 8
  
  /* ** Strategy **
  create a number variable to equal to 1
  we will eventually have to multiply it in an increment matter
  THE ANSWER IS N! --- using recursion or for loop
  */
  window.countNRooksSolutions = function(n) {
    var solutionCount = 1;
    for (var i = 1; i <= n; i++){
      solutionCount *= i;
    }
  
    console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
    return solutionCount;
  };
  
  // return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
  window.findNQueensSolution = function(n) {
    var move = true;
    var solution = [];
    var board = new Board({n: n});
    var findSolution = function(rounds) {
      if (rounds === n) {
        move = false;
        solution = board.rows().map(function(x) {
          return x.slice();
        });
        return;
      }
      for (var i = 0; i < n; i++) {
        board.togglePiece(rounds, i);
        if (!board.hasAnyQueensConflicts()) {
          findSolution(rounds + 1);
        }
  
        if (move) {
          board.togglePiece(rounds, i);
        }
      }
    };
  
    if ( n > 1 && n < 4 ) {
      solution = board.rows();
    } else {
      findSolution(0);
    }
  
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  };
  
  
  //  var board = new Board({n:n});
  //   var solution;
  //   const findSolution = (row = 0) => {
  //     if (row < n && !solution){
  //       for (var col = 0; col < n; col++){
  //         // check next row and repeat
  //         if(!board.hasAnyQueensConflicts()){
  //           findSolution(row + 1);
  //         }
  //         board.togglePiece(row,col);
  //       }
  //     } else if (row === n){
  //       solution = board.rows().slice().map(row => row.slice());
  //     }
  //   }
  //   findSolution();
  //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //   return solution;
  
  
  // return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
  window.countNQueensSolutions = function(n) {
    var solutionCount = 0; //fixme
    var board = new Board({n: n});
    var findSolution = function(rounds) {
      if (rounds === n) {
        solutionCount++;
        return undefined;
      }
      for (var i = 0; i < n; i++) {
        board.togglePiece(rounds, i);
        if (!board.hasAnyQueensConflicts()) {
          findSolution(rounds + 1);
        }
        board.togglePiece(rounds, i);
      }
    };
    findSolution(0);
  
    console.log('Number of solutions for ' + n + ' queens:', solutionCount);
    return solutionCount;
  };