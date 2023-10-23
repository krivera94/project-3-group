var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var x = d3.scaleBand().range([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Add an SVG element for the pie chart
var pieSvg = d3.select("#my_piechart")
    .append("svg")
    .attr("width", 300) // Adjust the width and height as needed
    .attr("height", 300);

function fetchDataForYear(year) {
    d3.json(`/data`).then(function(allData) {
        var yearData = allData.filter(d => d.ID_serial === year);

        var top10Data = yearData.slice(0, 10).map(d => {
            return [
                { name: d.male_name, count: +d.male_count, gender: 'male' },
                { name: d.female_name, count: +d.female_count, gender: 'female' }
            ];
        }).flat();

        updateBarChart(top10Data);
        updatePieChart(top10Data);
        updateStackedArea(top10Data);
    });
}

function updateBarChart(data) {
    svg.selectAll("rect").remove();
    svg.selectAll("g").remove();

    x.domain(data.map(function(d) { return d.name; }));

    y.domain([0, d3.max(data, function(d) { return d.count; })]);

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    svg.append("g")
        .call(d3.axisLeft(y));

    var bars = svg.selectAll("rect").data(data);

    bars.enter().append("rect")
        .attr("x", function(d) { return x(d.name); })
        .attr("y", function(d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.count); })
        .attr("fill", function(d) {
            return d.gender === 'male' ? "#69b3a2" : "#ef8a62";
        })
        .merge(bars)
        .transition().duration(1000)
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

    bars.exit().remove();
}

function updatePieChart(data) {
    // Remove previous pie chart elements
    pieSvg.selectAll("*").remove();

    // Extract male and female counts
    var maleCount = d3.sum(data, function(d) {
        return d.gender === 'male' ? d.count : 0;
    });
    var femaleCount = d3.sum(data, function(d) {
        return d.gender === 'female' ? d.count : 0;
    });

    // Calculate the total count
    var totalCount = maleCount + femaleCount;

    // Calculate percentages
    var malePercentage = (maleCount / totalCount) * 100;
    var femalePercentage = (femaleCount / totalCount) * 100;

    // Create a dataset for the pie chart
    var pieData = [
        { gender: 'male', count: maleCount, percentage: malePercentage },
        { gender: 'female', count: femaleCount, percentage: femalePercentage }
    ];

    // Set up a pie layout
    var pie = d3.pie()
        .value(function(d) { return d.count; });

    // Define an arc generator
    var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(100); // Adjust the radius as needed

    // Create a group for the pie chart
    var pieChartGroup = pieSvg.append("g")
        .attr("transform", "translate(150,150)"); // Adjust the translation as needed

    // Generate the pie slices
    var pieSlices = pieChartGroup.selectAll(".arc")
        .data(pie(pieData))
        .enter().append("g")
        .attr("class", "arc");

    // Add slices to the pie chart
    pieSlices.append("path")
        .attr("d", arc)
        .attr("fill", function(d) {
            return d.data.gender === 'male' ? "#69b3a2" : "#ef8a62";
        });

    // Add labels to the pie chart
    pieSlices.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .text(function(d) {
            return d.data.gender + " (" + d.data.percentage.toFixed(2) + "%)";
        });
}

function updateStackedArea(data) {
    // Remove previous stacked area barplot elements
    stackedSvg.selectAll("*").remove();
// set the dimensions and margins of the graph
var margin = {top: 60, right: 230, bottom: 50, left: 50},
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("stacked")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
d3.json("data.json", function(data) {


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
    .domain(d3.extent(data, function(d) { return d.name_rank; }))
    .range([ 0, width ]);
  var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5))

  // Add X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+40 )
      .text("Name Rank");

  // Add Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", -20 )
      .text("Percent of Babies Named:")
      .attr("text-anchor", "start")

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 10])
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
    .x(function(d) { return x(d.data.name_rank); })
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


function optionChanged(selectedYear) {
    fetchDataForYear(selectedYear);
}

fetchDataForYear("1980");
