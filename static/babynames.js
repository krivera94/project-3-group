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


function optionChanged(selectedYear) {
    fetchDataForYear(selectedYear);
}

fetchDataForYear("1980");
