// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    // [ [row index : 0],
    //   [row index : 1] 
    // ]
    hasRowConflictAt: function(rowIndex) {  
      var row = this.get(rowIndex); // give you an array
      var count = 0; // count the number of rooks/queens
      for (var i = 0; i < row.length; i++) {
        if (row[i]){
          count++;
        }
      }
      return (count > 1); 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
    return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
/* ** Strategy ** 
Let's get the whole chessboard in a variable. Iterate through each
row, and if that row has something in the column index (colIndex), 
increment count by 1. 
*/
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;
      for (var i = 0; i < board.length; i++) {
        if (board[i][colIndex]) {
          count++;
        }
      }
      return (count > 1);
    },

    // test if any columns on this board contain conflicts
    /* 
      Start with rows, iterate through the columns 
    */
    hasAnyColConflicts: function() {
      var board = this.rows();
      // var row = this.get(0);
      for (var i = 0; i < board.length; i++){
          if (this.hasColConflictAt(i)){
            return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {

      /* 
      hasMajorDiagonalConflictAt: function (row, col, matrix) {
      let count = 0;

      // Count the current position
      // Stop when row or col is out of bounds
      while(row < matrix.length || col < matrix[0].length) {
        count += matrix[row][col];

        row += 1;
        col += 1;

        }
        return count > 1;
      }
      */
      var board = this.rows();
      var index = majorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      for (var i = 0; i < board.length; i++){
        if (board[i][index]){ 
          count++;
        }
        index++;
      }
      return (count > 1);
    },

    // test if any major diagonals on this board contain conflicts
    /*
     Use for loop to recursively call hasMajorDiagonalConflictAt function
     return true if it's true, else false
    */
    hasAnyMajorDiagonalConflicts: function() {
      /* 
      hasAnyMajorDiagonalConflicts: function() {
        var matrix = this.rows();
        var conflict = this.hasMajorDiagonalConflictAt(0, 0, matrix);
        this.hasMajorDiagonalConflictAt(0, 0, matrix);
        for (var i = 1; i < matrix.length; i++) {
          conflict = conflict || this.hasMajorDiagonalConflictAt(0, i, matrix);
          conflict = conflict || this.hasMajorDiagonalConflictAt(i, 0, matrix);
        }
        for (var i = 1; i < matrix.length; i++) {
          this.hasMajorDiagonalConflictAt(0, i, matrix);
        }
        var column = this.hasMajorDiagonalConflictAt(0, col, matrix)
        return conflict;
      }
      */
      var board = this.rows();
      for (var i = -(board.length); i < board.length; i++){
        if(this.hasMajorDiagonalConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      /* 
      hasMajorDiagonalConflictAt: function (row, col, matrix) {
      let count = 0;

      // Count the current position
      // Stop when row or col is out of bounds
      while(row < matrix.length || col < matrix[0].length) {
        count += matrix[row][col];

        row += 1;
        col -= 1;

        }
        return count > 1;
      }
      */
      var board = this.rows();
      var index = minorDiagonalColumnIndexAtFirstRow;
      var count = 0;
      for (var i = 0; i < board.length; i++) {
        if (board[i][index]) {
          count++;
        }
        index--;
      }
      return (count > 1);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {

      /* 
      hasAnyMajorDiagonalConflicts: function() {
        var matrix = this.rows();
        var conflict = this.hasMinorDiagonalConflictAt(0, matrix, matrix);

        for (var i = matrix.length - 2; i >= 0; i--) {
          conflict = conflict || this.hasMinorDiagonalConflictAt(0, i, matrix);
          var row = matrix.length - 1 - i;
          conflict = conflict || this.hasMinorDiagonalConflictAt(i, matrix.length - 1, matrix);
        }
        for (var i = 1; i < matrix.length; i++) {
          this.hasMinorDiagonalConflictAt(0, i, matrix);
        }
        return conflict;
      }
      */
      var board = this.rows();
      for (var i = (board.length - 1) * 2; i >= 0 ; i--) { // FIX ME
        if(this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
    return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
