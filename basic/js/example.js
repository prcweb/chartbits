(function(){
  var data1 = [
  ];

  // Helpers
 


  // Construction
  function construct1() {
    var basic = animdata.d3.basic();

    var grid = d3.select('#charts .chart1')
      .style('width', '600px')
      .style('height', '200px')
      .datum(data1)
      .call(basic);
    }

  construct1();
})();