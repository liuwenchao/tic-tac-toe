function placeX(position){
  if (boxes[position] === value_Blank) {
    boxes[position] = value_X;
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
  boxes[position] = value_O;
  document.getElementsByTagName('box')[position].classList.add('o');
}
