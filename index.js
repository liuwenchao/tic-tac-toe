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

$(document).on('click', 'box', function(e){
  var position = $(e.currentTarget).index();
  if (boxes[Math.floor(position/3)][position%3] === 0) {
    $(e.currentTarget).addClass('x');
    boxes[Math.floor(position/3)][position%3] = -1;
    var state = new State(boxes);
    var myChoice = state.placeO().placement;

    if (myChoice === -1) {
      alert('Draw!');
      location.reload();
    } else {
      boxes[Math.floor(myChoice/3)][myChoice%3] = 1;
      $('box:nth('+myChoice+')').addClass('o');

      if (judge(boxes) !== judgement_unknown) {
        alert('I win!');
        location.reload();
      }
    }
  }
});


function State(data) {
  this.data = [[0,0,0],[0,0,0],[0,0,0]];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++)
      this.data[i][j] = data[i][j];
  }
  this.placement = -1;
  this.judgement = judgement_unknown;
}

State.prototype.placeO = function() {
  var result = new State(this.data);
  var cursor = new State(this.data);
  result.judgement = judge(this.data);

  if (result.judgement !== judgement_unknown) {
    return result;
  }
  
  for(var i = 0; i < 9; i++) {
    //copy data into cursor to start trying from this state
    for (var m = 0; m < 3; m++) {
      for (var k = 0; k < 3; k++) {
        cursor.data[m][k] = this.data[m][k];
      }
    }
    if (this.data[Math.floor(i/3)][i%3] === value_Blank) {
      //Place X at the first blank box to try.
      cursor.data[Math.floor(i/3)][i%3] = value_O;
      cursor = cursor.placeX();
      cursor.placement = i;
      if (noWaytoLose(cursor.judgement, result.judgement)) {
        result = cursor;
      }
    }
  }
  return result;
};

State.prototype.placeX = function() {
  var result = new State(this.data);
  var cursor = new State(this.data);
  result.judgement = judge(this.data);
           
  if (result.judgement !== judgement_unknown) {
    return result;
  }
  
  //copy data into cursor to start trying from this state
  for (var i = 0; i < 9; i++) {
    for (var m = 0; m < 3; m++) {
      for (var k = 0; k < 3; k++) {
        cursor.data[m][k] = this.data[m][k];
      }
    }
    if (this.data[Math.floor(i/3)][i%3] === value_Blank) {
      cursor.data[Math.floor(i/3)][i%3] = value_X;
      cursor = cursor.placeO();
      cursor.placement = i;
      if (noWaytoWin(cursor.judgement, result.judgement))  {
        result = cursor;
      }
    }
  }
  return result;
}

function noWaytoLose(cursor, result) {
    if (result === judgement_win) {
      return false;
    }
    if ( result === judgement_draw    && cursor === judgement_win
      || result === judgement_lose    && cursor !== judgement_lose
      || result === judgement_unknown && cursor !== judgement_unknown) {
      return true;
    }
    return false;
}

function noWaytoWin(cursor, result) {
    if (result === judgement_lose) {
      return false;
    }
    if ( result === judgement_draw    && cursor === judgement_lose
      || result === judgement_win     && cursor != judgement_win
      || result === judgement_unknown && cursor != judgement_unknown) {
        return true;
    }
    return false;
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
      }
    }
  }

  diagonal[0] += data[0][0];
  diagonal[0] += data[1][1];
  diagonal[0] += data[2][2];
  diagonal[1] += data[2][0];
  diagonal[1] += data[1][1];
  diagonal[1] += data[0][2];

  for (var i = 0; i < 3; i++) {
    if(row[i] === 3 || col[i] === 3) {
      return judgement_win;
    }
    if (row[i] === -3 || col[i] === -3) {
      return judgement_lose;
    }
    if (i < 2) {
      if (diagonal[i] === 3) {
        return judgement_win;
      }
      if (diagonal[i] === -3) {
        return judgement_lose;
      }
    }
  }
  if (blank === 0) {
    return judgement_draw;
  }

  // There are still more moves can be made.
  return judgement_unknown;
};