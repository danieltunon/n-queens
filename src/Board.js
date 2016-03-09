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
    hasRowConflictAt: function(rowIndex) {
      // compute sum of values for row
      var spotsFilled = this.rows()[rowIndex].reduce(function(sum, val) {
        return sum += val;
      }, 0);
      // if sum is greater than 1 return true
      if ( spotsFilled > 1 ) {
        return true;
      }
      // else return false
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // loop through all board rows
      var rows = this.rows();
      for ( var i = 0; i < rows.length; i++ ) {
        // check if current row for conflict using prev fn
        if ( this.hasRowConflictAt(i) ) {
          // if conflict return true
          return true;
        }
      }
      // return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // loop through all rows
      var rows = this.rows();
      var spotsFilled = rows.reduce(function(sum, row) {
        // for each row determine value at column index
        // sum all values for that column as you loop through rows
        return sum += row[colIndex];
      }, 0);
      // if sum is greater than 1 return true
      if ( spotsFilled > 1 ) {
        return true;
      }
      // else return false
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // get number of columns
      var n = this.get('n');
      // loop through all col indexes
      for ( var i = 0; i < n; i++ ) {
        // call prev fn for each index
        // if any conflict return true
        if ( this.hasColConflictAt(i) ) {
          return true;
        }
      }
      // else return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // copy index passed in and store in new variable
      var index = majorDiagonalColumnIndexAtFirstRow;
      // loop through each row
      var rows = this.rows();
      var spotsFilled = rows.reduce(function(sum, row) {
        // check value at current value of index
        // if it's undefined call it zero
        // add the value to sum
        // increment the index
        return sum += ( row[index++] || 0 );
      }, 0);
      // return true if the sum is greater than 1
      if ( spotsFilled > 1 ) {
        return true;
      }
      // else return false
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // loop each row
      // check each col starting at -(n-1)
      var rows = this.rows();
      var col = -( this.get('n') - 1 );
      rows.forEach(function() {
        // check for diagonal conflict at that column index (prev fn)
        if ( this.hasMajorDiagonalConflictAt(col) ) {
          // if conflict found return true
          return true;
        }
        // increment column
        col++;
      });
      // return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // copy index passed in and store in new variable
      var index = minorDiagonalColumnIndexAtFirstRow;
      // loop through each row
      var rows = this.rows();
      var spotsFilled = rows.reduce(function(sum, row) {
        // check value at current value of index
        // if it's undefined call it zero (happens when index >= n)
        // add the value to sum
        // decrement the index
        return sum += ( row[index--] || 0 );
      }, 0);
      // return true if the sum is greater than 1
      if ( spotsFilled > 1 ) {
        return true;
      }
      // else return false
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // loop through each row
      var rows = this.rows();
      // check each column starting at 2(n-1)
      var col = 2 * ( this.get('n') - 1 );
      rows.forEach(function() {
        // check for diagonal conflict at that column index (prev fn)
        if ( this.hasMinorDiagonalConflictAt(col) ) {
          // if conflict found return true
          return true;
        }
        // else decrement column
        col++;
      });
      // return false
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
