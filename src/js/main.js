// Graph
var width = 980,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(150)
    .size([width, height]);

var svg = d3.select(".graph-container").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("/info", function(error, services) {
  if (error) throw error;

  // Format json output 
  var tmpnodes = [];
  var links = [];

  services.forEach(function(e) {
    var target = e.b._id;
    var source = e.services._id;
    links.push({source: source, target: target});

    tmpnodes.push({"id": target, "name": e.b.properties.name});
    tmpnodes.push({"id": source, "name": e.services.properties.name});
  });

  var exists = [];
  var nodes = [];
  tmpnodes.forEach(function(e) {
    if (exists[e.id] == undefined) {
      nodes.push(e);
      exists[e.id] = true;
    }
  });

  var graph = {nodes: nodes, links: links};

  // Graph setup  
  var drawGraph = function(graph) {

    force
        .nodes(graph.nodes)
        .links(graph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
      .enter().append("line")
        .attr("class", "link")
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });

    var gnodes = svg.selectAll('g.gnode')
       .data(graph.nodes)
       .enter()
       .append('g')
       .classed('gnode', true);
      
    var node = gnodes.append("circle")
        .attr("class", "node")
        .attr("r", 18)
        .style("fill", function(d) { return color(d.group); })
        .call(force.drag);

    // Labels
    var labels = gnodes.append("text")
        .text(function(d) { return d.name; });

    // Nodes position
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
      
      gnodes.attr("transform", function(d) { 
          return 'translate(' + [d.x, d.y] + ')'; 
      });
          
    });
  };

  drawGraph(graph);

});
