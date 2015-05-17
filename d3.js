var svgContainer = d3.select("main")
  .append("svg")
    .attr("width",  300)
    .attr("height", 300)
    .attr("border", 1);

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    var index = i*3+j;
    svgContainer.append("rect")
      .attr("data-index", i*3+j)
      .attr("x", i*100)
      .attr("y", j*100)
      .attr("width", 100)
      .attr("height", 100)
      .attr("class", 'cell')
      .on('click', function() {
        if (boxes[Math.floor(this.dataset.index/3)][this.dataset.index%3] === value_Blank) {
          placeX(this.dataset.index);

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
      })
      ;
  }
}

function placeO(position) {
  svgContainer.append("circle")
  .attr("cx", Math.floor(position/3) * 100 + 50)
  .attr("cy", position % 3 * 100 + 50)
  .attr("r", 40)
  .attr("class", "o");

  boxes[Math.floor(position/3)][position%3] = value_O;
}


function placeX(position) {
  svgContainer.append("line")
    .attr("x1", Math.floor(position/3) * 100 + 10)
    .attr("y1", (position % 3) * 100 + 10)
    .attr("x2", Math.floor(position/3) * 100 + 90)
    .attr("y2", (position % 3) * 100 + 90)
    .attr("class", "x");
  svgContainer.append("line")
    .attr("x1", Math.floor(position/3) * 100 + 90)
    .attr("y1", (position % 3) * 100 + 10)
    .attr("x2", Math.floor(position/3) * 100 + 10)
    .attr("y2", (position % 3) * 100 + 90)
    .attr("class", "x");
  boxes[Math.floor(position/3)][position%3] = value_X;
}
