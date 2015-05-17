function placeX(position){
  if (boxes[Math.floor(position/3)][position%3] === 0) {
    boxes[Math.floor(position/3)][position%3] = value_X;
    document.getElementsByTagName('box')[position].classList.add('x');
    var myChoice = new Finder(boxes).findNextPlacment(value_O);

    if (myChoice === -1) {
      alert('Draw!');
      location.reload();
    } else {
      placeO(myChoice);
      if (judge(boxes) !== judgement_unknown) {
        alert('I win!');
        location.reload();
      }
    }
  }
};

function placeO(position) {
  boxes[Math.floor(position/3)][position%3] = value_O;
  document.getElementsByTagName('box')[position].classList.add('o');
}
