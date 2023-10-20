// STACKED AREA
var margin = {top: 60, right: 230, bottom: 50, left: 50},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#stacked")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.csv("https://raw.githubusercontent.com/krivera94/project-3-group/main/project3_csvs/1980-2020.csv", function(data) {

  //////////
  // GENERAL //
  //////////

  // List of groups = header of the csv files
var keys = data.columns.slice(1)

  // color palette
var color = d3.scaleOrdinal()
    .domain(keys)
    .range(d3.schemeSet2);

  //stack the data?
var stackedData = d3.stack()
    .keys(keys)
    (data)


  //////////
  // AXIS //
  //////////

  // Add X axis
var x = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return d.year; }))
    .range([ 0, width ]);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5))

  // Add X axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height+40 )
    .text("Year");

  // Add Y axis label:
svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", 0)
    .attr("y", -20 )
    .text("# of baby born")
    .attr("text-anchor", "start")

  // Add Y axis
var y = d3.scaleLinear()
    .domain([0, 200000])
    .range([ height, 0 ]);
svg.append("g")
    .call(d3.axisLeft(y).ticks(5))



  //////////
  // BRUSHING AND CHART //
  //////////

  // Add a clipPath: everything out of this area won't be drawn.
var clip = svg.append("defs").append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width )
    .attr("height", height )
    .attr("x", 0)
    .attr("y", 0);

  // Add brushing
    var brush = d3.brushX()                 // Add the brush feature using the d3.brush function
      .extent( [ [0,0], [width,height] ] ) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
      .on("end", updateChart) // Each time the brush selection changes, trigger the 'updateChart' function

  // Create the scatter variable: where both the circles and the brush take place
var areaChart = svg.append('g')
    .attr("clip-path", "url(#clip)")

  // Area generator
var area = d3.area()
    .x(function(d) { return x(d.data.year); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })

  // Show the areas
areaChart
    .selectAll("mylayers")
    .data(stackedData)
    .enter()
    .append("path")
    .attr("class", function(d) { return "myArea " + d.key })
    .style("fill", function(d) { return color(d.key); })
    .attr("d", area)

  // Add the brushing
areaChart
    .append("g")
    .attr("class", "brush")
    .call(brush);

var idleTimeout
function idled() { idleTimeout = null; }

  // A function that update the chart for given boundaries
function updateChart() {

    extent = d3.event.selection

    // If no selection, back to initial coordinate. Otherwise, update X axis domain
    if(!extent){
      if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
    x.domain(d3.extent(data, function(d) { return d.year; }))
    }else{
    x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
      areaChart.select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
    }

    // Update axis and area position
    xAxis.transition().duration(1000).call(d3.axisBottom(x).ticks(5))
    areaChart
    .selectAll("path")
    .transition().duration(1000)
    .attr("d", area)
    }



    //////////
    // HIGHLIGHT GROUP //
    //////////

    // What to do when one group is hovered
    var highlight = function(d){
    console.log(d)
      // reduce opacity of all groups
    d3.selectAll(".myArea").style("opacity", .1)
      // expect the one that is hovered
    d3.select("."+d).style("opacity", 1)
    }

    // And when it is not hovered anymore
    var noHighlight = function(d){
    d3.selectAll(".myArea").style("opacity", 1)
    }



    //////////
    // LEGEND //
    //////////

    // Add one dot in the legend for each name.
    var size = 20
    svg.selectAll("myrect")
    .data(keys)
    .enter()
    .append("rect")
        .attr("x", 400)
        .attr("y", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d){ return color(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
    .data(keys)
    .enter()
    .append("text")
        .attr("x", 400 + size*1.2)
        .attr("y", function(d,i){ return 10 + i*(size+5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

})
















// const url = 'https://raw.githubusercontent.com/krivera94/project-3-group/main/data.json'

// function init() {
//     let dropdown = d3.select('#selDataset');
//     d3.json(url).then((data) => {
//         console.log(`Data: ${data}`);
//         let years = data.ID_serial;
//         years.forEach((year) => {dropdown.append('option').text(year).property('value', year);
//         });

//         let year = years[0];

//         demo(year);
//         bar(year);
//         wordcloud(year);
//         area(year);
//     });
// }

// //DEMO Autoselected from dropdown 
// // function demo(selectval) {
// //     d3.json(url).then((data) => {
// //         console.log(`Data: ${data}`);

// //         let metadata = data.metadata;
// //         let filtdata = metadata.filter((meta) => meta.id == selectval);
// //         let obj = filtdata[0]

// //         d3.select('#sample-metadata').html('');

// //         let entries = Object.entries(obj);
// //         entries.forEach(([key, value]) => {
// //             d3.select('#sample-metadata').append('h5').text(`${key}: ${value}`);
// //         });
// //         console.log(entries)
// //     });
// // }

// // BAR CHART 

// function bar(selectval) {
//     d3.json(url).then((data) => {
//         console.log(`Data: ${data}`);

//         let samples = data.samples;
//         let filtdata = samples.filter((sample) => sample.id === selectval);
//         let obj = filtdata[0];
//         let trace = [{
//             x: obj.sample_values.slice(0, 10).reverse(),
//             y: obj.otu_ids.slice(0, 10).map((otu_id) => `OTU ${otu_id}`).reverse(),
//             text: obj.otu_labels.slice(0, 10).reverse(),
//             type: 'bar', 
//             orientation: 'v'
//         }];
//         Plotly.newPlot('bar', trace);
//     });
// }


// // WORD CLOUD

// // List of words
// var my1980 = [{word: "Michael", size: "35"}, {word: "Christopher", size: "20"}, {word: "Jason", size: "50"}, {word: "David", size: "25"}, {word: "James", size: "20"}, {word: "Matthew", size: "60"}, {word: "Joshua", size: "30"},{word: "John", size: "60"},{word: "Robert", size: "40"},{word: "Joseph", size: "25"}, {word: "Jennifer", size: "30"}, {word: "Amanda", size: "25"}, {word: "Jessica", size: "50"}, {word: "Melissa", size: "30"}, {word: "Sarah", size: "25"}, {word: "Heather", size: "40"}, {word: "Nicole", size: "25"},{word: "Amy", size: "60"},{word: "Elizabeth", size: "35"},{word: "Michelle", size: "25"}] // set the dimensions and margins of the graph
// var margin = {top: 10, right: 10, bottom: 10, left: 10},
//     width = 450 - margin.left - margin.right,
//     height = 450 - margin.top - margin.bottom;
// // append the svg object to the body of the page
// var svg = d3.select("#my_dataviz").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
// .append("g")
//     .attr("transform",
//         "translate(" + margin.left + "," + margin.top + ")");
// // Constructs a new cloud layout instance. It run an algorithm to find the position of words
// // Wordcloud features that are different from one word to the other must be here
// var layout = d3.layout.cloud()
// .size([width, height])
// .words(my1980.map(function(d) { return {text: d.word, size:d.size}; }))
//    .padding(5)        //space between words
//    .rotate(function() { return ~~(Math.random() * 2) * 90; })
//    .fontSize(function(d) { return d.size; })      // font size of words
// .on("end", draw);
// layout.start();
// // This function takes the output of 'layout' above and draw the words
// // Wordcloud features that are THE SAME from one word to the other can be here
// function draw(words) {
// svg
// .append("g")
//     .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
//     .selectAll("text")
//         .data(words)
//     .enter().append("text")
//         .style("font-size", function(d) { return d.size; })
//         .style("fill", "#69B3A2")
//         .attr("text-anchor", "middle")
//         .style("font-family", "Impact")
//         .attr("transform", function(d) {
//         return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
//         })
//         .text(function(d) { return d.text; });
// }




// function optionChanged(selectval) {
//     demo(selectval);
//     bar(selectval);
//     bubble(selectval)
// }

// init();

