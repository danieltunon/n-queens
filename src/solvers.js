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

var DecisionTree = function(value) {
  this.value = value || null;
  this.children = [];
};

DecisionTree.prototype.addNode = function(value) {
  var node = new DecisionTree(value);
  this.children.push(node);
};

// DecisionTree.prototype.createTree = function(n, depth, boardState) {
//   // var board = new Board({n: n});

//   // currentNode = currentNode || this;

//   if (depth + 1 === n) {
//     //create root branches
//     for ( var i = 0; i < n; i ++ ) {
//       var node = new DecisionTree([i, depth]);
//       this.children.push(node);
//     }  
//   } else {
//     for ( var i = 0; i < n; i ++ ) {
//       var node = new DecisionTree([i, depth]);
//       node.createTree(n, depth + 1);
//       this.children.push(node);
//     }
//   }




//   // var permutate = function() {
//   //   for ( var i = 0; i < this.children.length; i++ ) {
//   //     for ( var j = 1; j < n; j++ ) {
//   //       var node = new DecisionTree([j, i]);
//   //       this.children.push(node);
//   //     }
//   //   }
//   // };

//   // permutate.call(this);

// };

// find solutions
DecisionTree.prototype.createTree = function(n, depth, boardState) {
  var board = new Board(boardState);

  if (depth + 1 === n) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, depth);
      if (!board.hasAnyQueensConflicts()) {
        var node = new DecisionTree([i, depth]);
        this.children.push(node);
      }
      board.togglePiece(i, depth);  
    }
  } else {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, depth);
      if (!board.hasAnyQueensConflicts()) {
        var node = new DecisionTree([i, depth]);
        var newState = JSON.parse(JSON.stringify(board.rows()));
        node.createTree(n, depth + 1, newState);
        this.children.push(node);
      }
      board.togglePiece(i, depth);
    }
  }
};


//////////////////////////////////////////////////////
window.findNRooksSolution = function(n) {
  var tree = new DecisionTree();




  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
