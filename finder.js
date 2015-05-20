'use strict';

var boxes = [
    0,0,0,
    0,0,0,
    0,0,0
  ], 
  board_size  = 3,

  value_X     = -1,
  value_O     = 1,
  value_Blank = 0,

  judgement_unknown = -2,
  judgement_draw = board_size * value_Blank,
  judgement_win  = board_size * value_O,
  judgement_lose = board_size * value_X;

// A state Object to analyze the future possibilities.
var Finder = function(data) {
  this.data = data.slice();
  // next placement, will be 0-8 after calculation.
  this.next_placement = -1;
  // result of current state.
  this.judgement = judge(data);
}

Finder.prototype.findNextPlacment = function(type) {
  return this.place(type).next_placement;
}

Finder.prototype.place = function(value) {
  var result = new Finder(this.data);
  // if current state is already have a result, no need for furthor exploring.
  if (result.judgement !== judgement_unknown) {
    return result;
  }
  
  var next_possible_state = new Finder(this.data);
  for(var i = 0; i < 9; i++) {
    //copy data into next_possible_state to start trying from this state
    next_possible_state.data = this.data.slice();

    // Try with blank only.
    if (this.data[i] === value_Blank) {
      next_possible_state.data[i] = value;
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
  // No blanks? we are draw
  if (data.every(function(d){return d !== value_Blank})) {
    return judgement_draw;
  }

  var results = [];
  //rows
  results[0] = data[0] + data[1] + data[2];
  results[1] = data[3] + data[4] + data[5];
  results[2] = data[6] + data[7] + data[8];
  //colums
  results[3] = data[0] + data[3] + data[6];
  results[4] = data[1] + data[4] + data[7];
  results[5] = data[2] + data[5] + data[8];
  //diagonal lines
  results[6] = data[0] + data[4] + data[8];
  results[7] = data[2] + data[4] + data[6];

  if (results.some(function(result){return result === judgement_win})) {
    return judgement_win;
  }

  if (results.some(function(result){return result === judgement_lose})) {
    return judgement_lose;
  }
  // There are still more moves can be made.
  return judgement_unknown;
};