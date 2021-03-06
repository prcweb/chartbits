/* (C) 2014 Peter Cook */

/*
Multiline chart component
Allows unique y-domain for each series
For now, data is 2d-array. Assume evenly spaced data
*/

(function() {

"use strict";

var animdata = window.animdata || {};
window.animdata = animdata;

animdata.d3 = animdata.d3 || {};
animdata.d3.multiLine = function() {

  /*----
  Configurable variables
  ----*/
  var config = {
    datumAccessor: function(d) {return d;},
    xStep: 10, // for now, assume even spacing
    domains: null,
    range: [-50, 50],
    colors: ['steelblue', 'indianred'],
    seriesVisible: null,
    transitionDuration: 500
  }



  /*----
  Internal variables
  ----*/
  var data = null;
  var layerData = null;
  var constructed = false;
  var scales = [];

  var d3elements = {
    container: null,
    bars: null
  }



  /*----
  Chart building
  ----*/
  function constructChart() {
  }



  /*----
  Update
  ----*/
  function updateScales() {
    _.each(config.domains, function(d) {
      var scale = d3.scale.linear()
        .domain(d)
        .range([config.range[1], config.range[0]]);
      scales.push(scale);
    });
    // console.log(scales);
  }


  /*----
  Chart update (D3 stuff)
  ----*/
  function update() {
    // Update data
    // updateData();

    updateScales();

    var svgLines = [];
    _.each(scales, function(s, j) {
      var svgLine = d3.svg.line()
        .x(function(d, i) {return i * config.xStep;})
        .y(function(d) {
          return scales[j](d);
        });
      svgLines.push(svgLine);
    });

    var seriesUpdate = d3elements.container
      .selectAll('path.series')
      .data(data);

    seriesUpdate.enter()
      .append('path')
      .classed('series', true)
      .style('fill', 'none')
      .style('stroke', function(d, i) {
        var numColors = config.colors.length;
        return config.colors[i % numColors];
      })
      .style('opacity', function(d, i) {
        if(!config.seriesVisible)
          return 1;
        return config.seriesVisible[i] ? 1 : 0;
      });

    seriesUpdate.exit()
      .remove();

    seriesUpdate
      .attr('d', function(d, i) {
        return svgLines[i](d);
      })
      .transition()
      .style('opacity', function(d, i) {
        if(!config.seriesVisible)
          return 1;
        return config.seriesVisible[i] ? 1 : 0;
      });
  }



  /*----
  Main chart function
  ----*/
  function chart(selection) {
    // To make things simpler, we assume just one element in the selection
    d3elements.container = d3.select(selection[0][0]);
    data = config.datumAccessor(d3elements.container.datum());

    // console.log(data);

    // Construct the chart if this is first call
    if(!constructed) {
      constructChart();
    }

    update();

    constructed = true;
  }



  /*----
  Configuration getters/setters
  -----*/
  d3.keys(config).forEach(function(a) {
    chart[a] = function(_) {
      if(!arguments.length) return config[a];
      config[a] = _;
      return chart;
    }
  });


  return chart;
}

})();