(function(){
  var data1 = [
    {"children" : [
       {"name": "a1", "size": 100},
       {"name": "a2", "size": 200},
       {"name": "a3", "size": 100},
       {"name": "a4", "size": 400},
       {"name": "a5", "size": 100},
       {"name": "a6", "size": 200},
       {"name": "a7", "size": 100},
       {"name": "a8", "size": 400}
      ]
    },
    {"children" : [
       {"name": "b1", "size": 100},
       {"name": "b2", "size": 200},
       {"name": "b3", "size": 100},
       {"name": "b4", "size": 400},
       {"name": "b5", "size": 300}
      ]
    }    
  ];

  var data2 = [
    {"children" : [
       {"name": "a1", "size": 100, "type": "animal"},
       {"name": "a2", "size": 100, "type": "vegetable"},
       {"name": "a3", "size": 100, "type": "animal"},
       {"name": "a4", "size": 100, "type": "mineral"},
      ]
    },
    {"children" : [
       {"name": "b1", "size": 200, "type": "vegetable"},
       {"name": "b2", "size": 200, "type": "animal"},
       {"name": "b3", "size": 200, "type": "mineral"},
       {"name": "b4", "size": 200, "type": "mineral"},
      ]
    },
    {"children" : [
       {"name": "c1", "size": 25, "type": "animal"},
       {"name": "c2", "size": 25, "type": "animal"},
       {"name": "c3", "size": 25, "type": "vegetable"},
       {"name": "c4", "size": 25, "type": "mineral"},
      ]
    }    
  ];

  // Helpers
  function getTreeMapRootSizes(d) {
    return _.map(d, function(tm) {
      return _.sum(tm.children, function(d) {return d.size;});
    });
  }




  // Construction
  function construct1() {
    var colorScale = d3.scale.category20c();

    var treeMap = animdata.d3.treeMap()
      .color(function(d, i) {return colorScale(i);})
      .width(200)
      .height(400)
      .labels(true)
      .labelSize(12);

    var grid = d3.select('#charts .chart1')
      .append('svg')
      .style('width', 600)
      .style('height', 400)
      .append('g')
      .classed('heat-grid', true)
      .datum(data1)
      .call(treeMap);

    grid
      .selectAll('g.treemap')
      .attr('transform', function(d, i) {return animdata.svg.translate(i * 250, 0);});
    }

  function construct2() {
    // Calculate widths such that overall area is constant

    var width = 600, height = 200;
    var colorMap = {
      animal: '#e6550d',
      vegetable: '#74c476',
      mineral: '#3182bd'
    };
    var sizes = getTreeMapRootSizes(data2);
    var totalSize = _.sum(sizes);

    // console.log(sizes, totalSize);

    var scale = width * height / totalSize;

    var scaledWidths = _.map(sizes, function(size) {
      return size * scale / height;
    });
    // console.log(scaledWidths);

    var treeMap = animdata.d3.treeMap()
      .width(scaledWidths)
      .height(height)
      .labels(true)
      .labelSize(12)
      .padding(1)
      .color(function(d, i) {return colorMap[d.type];})
      .value(function(d) {return d.size;});

    var grid = d3.select('#charts .chart2')
      .append('svg')
      .style('width', width)
      .style('height', height)
      .append('g')
      .classed('heat-grid', true)
      .datum(data2)
      .call(treeMap);

    var xPositions = [0];
    _.each(scaledWidths, function(w) {
      xPositions.push(xPositions.slice(-1)[0] + w);
    });
    // console.log(xPositions);
    grid
      .selectAll('g.treemap')
      .attr('transform', function(d, i) {return animdata.svg.translate(xPositions[i], 0);});

    d3.select('#charts .chart2 .menu .update')
      .on('click', function() {
        data2[0].children = _.map(data2[0].children, function(v) {
          v.size = Math.random() * 100;
          return v;
        });
        // console.log(data2[0].children);
        d3.select('#charts .chart2 .heat-grid')
          .datum(data2)
          .call(treeMap);
      });



    }



  construct1();
  construct2();
})();