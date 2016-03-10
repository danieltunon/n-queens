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
  //this.value = value || null;
  //this.boardState = null;
  this.children = [];
};

// find solutions
DecisionTree.prototype.createTree = function(n, depth, boardState) {

  var board = new Board(boardState);
  if (depth + 1 === n) {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, depth);
      if (!board.hasAnyQueensConflicts()) {
        var node = new DecisionTree();
        node.board = JSON.stringify(board.rows());
        this.children.push(node);
      }
      board.togglePiece(i, depth);  
    }
  } else {
    for (var i = 0; i < n; i++) {
      board.togglePiece(i, depth);
      if (!board.hasAnyQueensConflicts()) {
        var node = new DecisionTree();
        var newState = board.rows();
        node.createTree(n, depth + 1, newState);
        this.children.push(node);
      }
      board.togglePiece(i, depth);
    }
  }
};

var findFirstSolution = function(tree) {

  var solution;
  
  var search = function(node) {
    // node = node || this;
    if (node.children.length === 0) {
      if (node.board !== undefined) {
        solution = node.board;
      }
    }
    if (!solution) {
      for (var i = 0; i < node.children.length; i++) {
        if (!solution) {
          search(node.children[i]);
        }
      }  
    } 
  };

  search(tree);
  return JSON.parse(solution);
};

//////////////////////////////////////////////////////
window.findNRooksSolution = function(n) {
  // if (n < 2) {
  //   return 1;
  // }
  var board = new Board({n: n});

  for ( var i = 0; i < n; i++ ) {
    for ( var j = 0; j < n; j++ ) {
      board.togglePiece(i,j);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(i,j);
      }
    }
  }

  solution = board.rows();


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  // var tree = new DecisionTree();
  var createTree = function(n, depth, boardState) {
    var board = new Board(boardState);

    if (depth + 1 === n || n === 0) {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, depth);
        if (!board.hasAnyRooksConflicts()) {
          solutionCount++;
        }
        board.togglePiece(i, depth);
      }
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, depth);
        if (!board.hasAnyRooksConflicts()) {
          // var node = new DecisionTree();
          var newState = board.rows();
          createTree(n, depth + 1, newState);
          // tree.children.push(node);
        }
        board.togglePiece(i, depth);
      }
    }
  };
  createTree(n, 0, {n: n});
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.findNQueensSolution = function(n) {
  var solution;
  var createTree = function(n, depth, boardState) {
    var board = new Board(boardState);

    if ( n === 0 || n === 2 || n === 3 ) {
      solution = JSON.parse(JSON.stringify(board.rows()));
    } else if (depth + 1 === n ) {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, depth);
        if (!board.hasAnyQueensConflicts()) {
          // var node = new DecisionTree();
          // this.children.push(node);
          solution = JSON.parse(JSON.stringify(board.rows()));
        }
        board.togglePiece(i, depth);
      }
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, depth);
        if (!board.hasAnyQueensConflicts()) {
          // var node = new DecisionTree();
          var newState = board.rows();
          createTree(n, depth + 1, newState);
          // tree.children.push(node);
        }
        board.togglePiece(i, depth);
      }
    }
  };
  createTree(n, 0, {n: n});
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};




// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  // var tree = new DecisionTree();
  var createTree = function(n, depth, boardState) {
    var board = new Board(boardState);

    if (depth + 1 === n || n === 0) {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, depth);
        if (!board.hasAnyQueensConflicts()) {
          // var node = new DecisionTree();
          // this.children.push(node);
          solutionCount++;
        }
        board.togglePiece(i, depth);
      }
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(i, depth);
        if (!board.hasAnyQueensConflicts()) {
          // var node = new DecisionTree();
          var newState = board.rows();
          createTree(n, depth + 1, newState);
          // tree.children.push(node);
        }
        board.togglePiece(i, depth);
      }
    }
  };
  createTree(n, 0, {n: n});
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};