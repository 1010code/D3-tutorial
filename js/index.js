var outerWidth = 400, outerHeight = 300;    // includes margins

var margin = { top: 100, right: 20, bottom: 80, left: 80 };   // clockwise as in CSS

var width = outerWidth - margin.left - margin.right,       // width of plot inside margins
  height = outerHeight - margin.top - margin.bottom;     // height   "     "

document.body.style.margin = "0px"; // Eliminate default margin from <body> element

var data = [{ x: .3, y: 0 }, { x: .4, y: 1 }, { x: .6, y: 1 }, { x: .7, y: 0 }];
var data2 = [{ x: .3, y: 0 }, { x: .36, y: .6 }, { x: .64, y: .6 }, { x: .7, y: 0 }];
var data3 = [{ x: .36, y: 0 }, { x: .36, y: 1.2 }];

function xValue(d) { return d.x; }      // accessors
function yValue(d) { return d.y; }

var x = d3.scaleLinear()                // interpolator for X axis -- inner plot region
  .domain([0, 1])
  .range([0, width]);

var y = d3.scaleLinear()                // interpolator for Y axis -- inner plot region
  .domain([0, 1])
  .range([height, 0]);                  // remember, (0,0) is upper left -- this reverses "y"

var line = d3.line()                     // SVG line generator
  .x(function (d) { return x(d.x); })
  .y(function (d) { return y(d.y); });

var xAxis = d3.axisBottom(x)
  .ticks(5)                            // request 5 ticks on the x axis

var yAxis = d3.axisLeft(y)                // y Axis
  .ticks(5)

var svg = d3.select("body").append("svg")
  .attr("width", outerWidth)
  .attr("height", outerHeight);        // Note: ok to leave this without units, implied "px"

var g = svg.append("g")                  // <g> element is the inner plot area (i.e., inside the margins)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Define the div for the tooltip
var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

g.append("g")                            // render the Y axis in the inner plot area
  .attr("class", "y axis")
  .call(yAxis);

g.append("g")                            // render the X axis in the inner plot area
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")  // axis runs along lower part of graph
  .call(xAxis);


g.append("path")                         // plot the data as a line
  .datum(data2)
  .attr("class", "line")
  .attr("d", line)
  .style('fill', '#fff')
  .style('stroke', 'none')
  .transition()
  .delay(500)
  .duration(1000)
  .style('fill', '#f5eaea')

g.append("path")                         // plot the data as a line
  .datum(data)
  .attr("class", "line")
  .attr("d", line)
  .style('fill', 'none')
  //.style('stroke', '#fff')
  .transition()
  .delay(500)
  .duration(1000)
// .style('stroke', '#000')


g.append("path")                         // plot the data as a line
  .datum(data3)
  .attr("class", "line")
  .attr("d", line)
  //.style('fill', '#5656')
  .style('stroke', 'none')
  .transition()
  .delay(500)
  .duration(1000)
  .style('stroke', 'red')

g.selectAll(".dot")                      // plot a circle at each data location
  .data(data)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("cx", function (d) { return x(d.x); })
  .attr("cy", function (d) { return y(d.y); })
  .attr("r", 3)
  .on("mouseover", function (d) {
    div.transition()
      .duration(200)
      .style("opacity", .9);
    div.html(`x: ${d.x}<br>y: ${d.y}`)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  })
  .on("mouseout", function (d) {
    div.transition()
      .duration(500)
      .style("opacity", 0);
  });

