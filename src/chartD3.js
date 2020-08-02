
import * as d3 from 'd3';

const parseTime = d3.timeParse('%d/%m/%y');

let chart = {},
    x, y0, y1,
    line0, line1,
    width,
    height,
    g;

chart.create = (el, props, state) => {
    const margin = { top: 20, right: 80, bottom: 30, left: 80 };

    let svg = d3.select(el).append('svg')
        .attr('class', 'chart')
        .attr('width', props.width)
        .attr('height', props.height);

    width = svg.attr('width') - margin.left - margin.right;
    height = svg.attr('height') - margin.top - margin.bottom;

    g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    x = d3.scaleTime().rangeRound([0, width]);
    y0 = d3.scaleLinear().rangeRound([height, 0]);
    y1 = d3.scaleLinear().rangeRound([height, 0]);

    line0 = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y0(d.Weekly_ICSA); });

    line1 = d3.line()
        .x(function (d) { return x(d.Date); })
        .y(function (d) { return y1(d.Weekly_New_Cases); });


    chart.update(state);
}

chart.update = (state) => {
    let svg = d3.select('svg');

    chart.draw(svg, state.data, state.title);
}

chart.draw = function (svg, data, title) {
    this.cleanUp();

    data.forEach(function (d) {
        d.Date = parseTime(d.Date);
        d.Weekly_ICSA = +d.Weekly_ICSA;
        d.Weekly_New_Cases = +d.Weekly_New_Cases;
        return d;
    });

    x.domain(d3.extent(data, function (d) { return d.Date; }));
    y0.domain([0, d3.max(data, function (d) { return d.Weekly_ICSA; })]);
    y1.domain([0, d3.max(data, function (d) { return d.Weekly_New_Cases; })]);

    // Add axis:
    g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x).ticks(d3.timeWeek.every(2)));

    g.append('g')
        .attr('class', 'y-axis')
        .style("fill", "steelblue")
        .attr('fill', 'steelblue')
        .call(d3.axisLeft(y0));

    g.append('g')
        .attr('class', 'y-axis')
        .style("fill", "red")
        .attr("transform", "translate(" + width + " ,0)")
        .attr('fill', 'red')
        .call(d3.axisRight(y1));

    // Add path:
    var path0 = g.append('path')
        .attr('class', function (d) { return "icsa"; })
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line0);

    var path1 = g.append('path')
        .attr('class', function (d) { return "newcase"; })
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('stroke-width', 1.5)
        .attr('d', line1);

    // Add tooltip
    var tooltip = d3.select("body")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "grey")
        .style("border-radius", "5px")
        .style("padding", "10px")
        .style("color", "white")

    var showICSATooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("Weekly ICSA: " + d.Weekly_ICSA)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }

    var showNewCaseTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
        tooltip
            .style("opacity", 1)
            .html("Weekly New Cases: " + d.Weekly_New_Cases)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }

    var moveTooltip = function (d) {
        tooltip
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    }

    var hideTooltip = function (d) {
        tooltip
            .transition()
            .duration(200)
            .style("opacity", 0)
    }

    // Add circle:
    g.selectAll("myPoints")
        .data(data)
        .enter()
        .append('circle')
        .attr('class', function (d) { return "icsa"; })
        .attr("cx", function (d) { return x(d.Date); })
        .attr("cy", function (d) { return y0(d.Weekly_ICSA); })
        .attr("r", 5)
        .attr("stroke", "white")
        .style("fill", "steelblue")
        .on("mouseover", showICSATooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)

    g.selectAll("myPoints")
        .data(data)
        .enter()
        .append('circle')
        .attr('class', function (d) { return "newcase"; })
        .attr("cx", function (d) { return x(d.Date); })
        .attr("cy", function (d) { return y1(d.Weekly_New_Cases); })
        .attr("r", 5)
        .attr("stroke", "white")
        .style("fill", "red")
        .on("mouseover", showNewCaseTooltip)
        .on("mousemove", moveTooltip)
        .on("mouseleave", hideTooltip)

    // Add legend
    g.append("circle").attr("cx", 720).attr("cy", 45).attr("r", 6).style("fill", "red");
    g.append("circle").attr("cx", 720).attr("cy", 25).attr("r", 6).style("fill", "steelblue");
    g.append("text").attr("x", 730).attr("y", 45).text("Click to Show/Unshow Weekly new case").attr("font-size", "14px").style("font-size", "15px").attr("alignment-baseline", "middle").on("click", function (d) {
        d3.selectAll(".newcase").transition().style("opacity", d3.selectAll(".newcase").style("opacity") == 1 ? 0 : 1);
    });
    g.append("text").attr("x", 730).attr("y", 25).text("Click to Show/Unshow Weekly ICSA").attr("font-size", "14px").style("font-size", "15px").attr("alignment-baseline", "middle").on("click", function (d) {
        d3.selectAll(".icsa").transition().style("opacity", d3.selectAll(".icsa").style("opacity") == 1 ? 0 : 1);
    });

    // Add transition
    if (title.trim() == "Whole Picture: Weekly ICSA and New Cases of US from 01/25/2020 to 07/18/2020 in D3".trim() || title.trim() == "First Phase: Weekly ICSA and New Cases of US from 01/25/2020 to 03/21/2020 in D3") {
        var totalLength0 = path0.node().getTotalLength();
        var totalLength1 = path1.node().getTotalLength();

        d3.selectAll('.icsa')
            .attr("stroke-dasharray", totalLength0 + " " + totalLength0)
            .attr("stroke-dashoffset", totalLength0)
            .transition()
            .duration(4000)
            .delay(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        d3.selectAll('.newcase')
            .attr("stroke-dasharray", totalLength0 + " " + totalLength1)
            .attr("stroke-dashoffset", totalLength0)
            .transition()
            .duration(4000)
            .delay(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        d3.selectAll("circle").style("opacity", 0).transition().duration(5000).delay(3000).style("opacity", 1);
    }

    if (title.trim() == "Second Phase: Weekly ICSA and New Cases of US from 03/28/2020 to 06/13/2020 in D3".trim()) {
        var totalLength0 = path0.node().getTotalLength();
        var totalLength1 = path1.node().getTotalLength();

        d3.selectAll('.icsa')
            .attr("stroke-dasharray", totalLength0 + " " + totalLength0)
            .attr("stroke-dashoffset", totalLength0 / 2 + 2)
            .transition()
            .duration(4000)
            .delay(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        d3.selectAll('.newcase')
            .attr("stroke-dasharray", totalLength0 + " " + totalLength1)
            .attr("stroke-dashoffset", totalLength0 / 2 + 2)
            .transition()
            .duration(4000)
            .delay(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        d3.selectAll("circle").style("opacity", 0).transition().duration(5000).delay(3000).style("opacity", 1);
    }

    if (title.trim() == "Third Phase: Weekly ICSA and New Cases of US from 06/20/2020 to 07/18/2020 in D3".trim()) {
        var totalLength0 = path0.node().getTotalLength();
        var totalLength1 = path1.node().getTotalLength();

        d3.selectAll('.icsa')
            .attr("stroke-dasharray", totalLength0 + " " + totalLength0)
            .attr("stroke-dashoffset", totalLength0 * 0.33)
            .transition()
            .duration(4000)
            .delay(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        d3.selectAll('.newcase')
            .attr("stroke-dasharray", totalLength0 + " " + totalLength1)
            .attr("stroke-dashoffset", totalLength0 * 0.3)
            .transition()
            .duration(4000)
            .delay(1000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        d3.selectAll("circle").style("opacity", 0).transition().duration(5000).delay(3000).style("opacity", 1);
    }
    // Add title
    g.append('text')
        .attr('class', 'chart-title')
        .attr('x', (width / 2))
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .text(title);
}

chart.cleanUp = function (el) {
    d3.selectAll('.x-axis').remove();
    d3.selectAll('.y-axis').remove();
    d3.selectAll('.chart-title').remove();
    d3.selectAll('.icsa').remove();
    d3.selectAll('.newcase').remove();
};

export default chart;