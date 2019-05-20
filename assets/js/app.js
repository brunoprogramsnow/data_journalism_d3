// @TODO: YOUR CODE HERE!
let svgWidth = 750;
let svgHeight = 500;

let margin = {
	top: 20,
	right: 40,
	bottom: 60,
	left: 100
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

let svg = d3.select("#scatter")
	.append("svg")
	.attr("width", svgWidth)
	.attr("height", svgHeight)

let chartGroup = svg.append("g")
	.attr("transform", `translate(${margin.left}, ${margin.top}`);

d3.csv("../data/data.csv").then(function(censusD){

	censusD.forEach(function(d) {
		d.healthcare = +data.healthcare;
		d.poverty = +d.poverty;
		console.log(d)

	})

let toolTip = d3.tip()
	.attr("class", "tooltip")
	.offset(([100,-80]))
	.html(function(d){
		return `${d.state}<br>Poverty: ${d.poverty}<br> Healthcare: ${d.healthcare}`
	})

chartGroup.call(toolTip)

let xLinearScale = d3.scaleLinear()
	.domain(d3.extent(censusD, d => d.poverty))
	.range([0, width]);

let yLinearScale = d3.scaleLinear()
	.domain([0, d3.max(censusD, d => d.healthcare)])
	.range([height, 0]); 

let bottomAxis = d3.axisBottom().scale(xLinearScale)
let leftAxis = d3.axisLeft().scale(yLinearScale)

chartGroup.append("g")
	.attr("transform", `translate(0, ${height})`)
	.call(bottomAxis);

chartGroup.append("g")
	.call(leftAxis)


let circlesGroup = chartGroup.selectAll("Circle").data(censusD).enter();

circlesGroup
	.append("circle")
	.attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "#89bdd3") 
    .on("mouseover", function(d) {
      toolTip.show(d, this);
     })
     .on("mouseout", function(d) {
      toolTip.hide(d);
     });

circlesGroup
	.append("text")
	.text(function(d){
		return d.abbr;
	})
	.attr("dx", function(d) {
        return xLinearScale(d.poverty);
    })
    .attr("dy", function(d) {
        return yLinearScale(d.healthcare);
    })      
    .attr("font-family", "sans-serif")
    .attr("font-size", "12px")
    .attr("text-anchor", "middle")
    .attr("fill", "#fff")
    .on("mouseover", function(d) {
        toolTip.show(d);
    })
    .on("mouseout", function(d) {
        toolTip.hide(d);
    });

chartGroup.append("text")
	.attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("text-anchor", "middle")
    .text("Lacks Healthcare (%)");

chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .attr("class", "axisText")
    .style("text-anchor", "middle")
    .text("In Poverty (%)");
})




