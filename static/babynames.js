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

function optionChanged(selectedYear) {
    fetchDataForYear(selectedYear);
}

fetchDataForYear("1980");