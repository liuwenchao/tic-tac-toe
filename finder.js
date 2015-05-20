'use strict';

var boxes = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
  ], 
  value_X = -1,
  value_O = 1,
  value_Blank = 0,

  judgement_unknown = -2,
  judgement_draw = 0,
  judgement_win = 1,
  judgement_lose = -1;

// A state Object to analyze the future possibilities.
var Finder = function(data) {
  this.data = [[0,0,0],[0,0,0],[0,0,0]];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      this.data[i][j] = data[i][j];
    }
  }
  // next placement, will be 0-8 after calculation.
  this.next_placement = -1;
  // result of current state.
  this.judgement = judgement_unknown;
}

Finder.prototype.findNextPlacment = function(type) {
  return this.place(type).next_placement;
}

Finder.prototype.place = function(value) {
  var result = new Finder(this.data);
  result.judgement = judge(this.data);
  // if current state is already have a result, no need for furthor exploring.
  if (result.judgement !== judgement_unknown) {
    return result;
  }
  
  var next_possible_state = new Finder(this.data);
  for(var i = 0; i < 9; i++) {
    //copy data into next_possible_state to start trying from this state
    for (var m = 0; m < 3; m++) {
      for (var k = 0; k < 3; k++) {
        next_possible_state.data[m][k] = this.data[m][k];
      }
    }
    // Try with blank only.
    if (this.data[Math.floor(i/3)][i%3] === value_Blank) {
      next_possible_state.data[Math.floor(i/3)][i%3] = value;
      if (value === value_O) {
        next_possible_state = next_possible_state.place(value_X);
        next_possible_state.next_placement = i;
        // replace result if next_possible_state is better, better for O player.
        if (isBetter(next_possible_state.judgement, result.judgement)) {
          result = next_possible_state;
        }
      } else {
        next_possible_state = next_possible_state.place(value_O);
        next_possible_state.next_placement = i;
        // replace result if next_possible_state is worse, better for O player.
        if (isWorse(next_possible_state.judgement, result.judgement)) {
          result = next_possible_state;
        }
      }

    }
  }
  return result;
};

function isBetter(new_result, old_result) {
  if (old_result === judgement_unknown && new_result !== judgement_unknown)
    return true;
  else 
    return old_result < new_result;
}

function isWorse(new_result, old_result) {
  if (old_result === judgement_unknown && new_result !== judgement_unknown)
    return true;
  else 
    return old_result > new_result;
}

function judge(data) {
  var blank = 0, //blank boxes
  row = [0,0,0], //summary of each row
  col = [0,0,0], //summary of each col
  diagonal = [0,0]  //summary of diagonal line
  ;

  // add up rows and cols to see if they are all 1 or -1;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (data[i][j] === 0) {
        blank ++;
      } else {
        row[i]+=data[i][j];
        col[j]+=data[i][j];
        if(row[i] === 3 || col[i] === 3) {
          return judgement_win;
        }
        if (row[i] === -3 || col[i] === -3) {
          return judgement_lose;
        }
      }
    }
  }

  if (blank === 0) {
    return judgement_draw;
  }

  diagonal[0] += data[0][0];
  diagonal[0] += data[1][1];
  diagonal[0] += data[2][2];
  diagonal[1] += data[2][0];
  diagonal[1] += data[1][1];
  diagonal[1] += data[0][2];

  for (var i = 0; i < 2; i++) {
      if (diagonal[i] === 3) {
        return judgement_win;
      }
      if (diagonal[i] === -3) {
        return judgement_lose;
      }
  }

  // There are still more moves can be made.
  return judgement_unknown;
};