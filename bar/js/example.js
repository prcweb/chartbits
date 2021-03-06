(function(){

  function chart1() {
    var data1 = [4, 1, -7, 5000, -1000, 5000];
    var transform = {x: 110, y: 0};
    var bar = animdata.d3.bar()
      .barWidth(15)
      // .domain([-10, 10])
      .domains([[-10, 10], [-10, 10], [-10, 10], [-5000, 5000], [-5000, 5000], [-5000, 5000]])
      .range([-50, 50])
      .orientation('horizontal')
      .transform(transform)
      .showValues(true)
      .valueSide('left');

    var container = d3.select('#chart1')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 70)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50));

    container
      .selectAll('line')
      .data(data1)
      .enter()
      .append('line')
      .attr('x1', function(d, i) {return i * transform.x;})
      .attr('x2', function(d, i) {return i * transform.x;})
      .attr('y1', -5)
      .attr('y2', 20);

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }


  function chart2() {
    var data1 = {d: [4, 1, -7, 5, -1, 5]};
    var transform = {x: 0, y: 15};
    var bar = animdata.d3.bar()
      .datumAccessor(function(d) {return d.d;})
      .barWidth(10)
      .domain([-10, 10])
      .range([-50, 50])
      .orientation('horizontal')
      .transform(transform)
      .signColors(['red', 'green']);

    var container = d3.select('#chart2')
      .append('svg')
      .attr('height', 170)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50));

    container
      .append('line')
      .attr('y1', -5)
      .attr('y2', 90);

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }

  function chart3() {
    var data1 = [1,2,3,4,5,6];
    var transform = {x: 20, y: 0};
    var bar = animdata.d3.bar()
      .barWidth(18)
      // .domain([-10, 10])
      .domain([0,6])
      .range([50, 0])
      .orientation('vertical')
      .transform(transform)
      .showValues(false);

    var container = d3.select('#chart3')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 200)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50));

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }

  function chart4() {
    var data1 = [{value: 1},{value: 2},{value: 3},{value: 4},{value: 5},{value: 6}];
    var transform = {x: 20, y: 0};
    var bar = animdata.d3.bar()
      .barWidth(18)
      .domain([0,6])
      .range([50, 0])
      .orientation('vertical')
      .transform(transform)
      .showValues(false)
      .accessor(function(d) {return d.value;});

    var container = d3.select('#chart4')
      .append('svg')
      .attr('width', 1000)
      .attr('height', 200)
      .append('g')
      .attr('transform', animdata.svg.translate(50, 50));

    container
      .classed('bar', true)
      .datum(data1)
      .call(bar);
    }


  chart1();
  chart2();
  chart3();
  chart4();
})();