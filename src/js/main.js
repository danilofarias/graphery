var width = 960,
    height = 500;

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(80)
    .size([width, height]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("data/services.json", function(error, services) {
  if (error) throw error;

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

  var nodeById = d3.map();

  graph.nodes.forEach(function(node) {
    nodeById.set(node.id, node);
  });

  graph.links.forEach(function(link) {
    link.source = nodeById.get(link.source);
    link.target = nodeById.get(link.target);
  });

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link");

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 18)
      .style("fill", function(d) { return d.id; })
      .call(force.drag);

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});
