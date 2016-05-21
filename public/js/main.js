// DEBUG
var services = [
    {
        "b": {
            "_id": 188,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Account"
            }
        },
        "r": {
            "_id": 265,
            "type": "DEPENDS_ON",
            "properties": {},
            "_fromId": 185,
            "_toId": 188
        },
        "services": {
            "_id": 185,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Auth"
            }
        }
    },
    {
        "b": {
            "_id": 187,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Search"
            }
        },
        "r": {
            "_id": 264,
            "type": "DEPENDS_ON",
            "properties": {},
            "_fromId": 186,
            "_toId": 187
        },
        "services": {
            "_id": 186,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Chat"
            }
        }
    },
    {
        "b": {
            "_id": 188,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Account"
            }
        },
        "r": {
            "_id": 263,
            "type": "DEPENDS_ON",
            "properties": {},
            "_fromId": 186,
            "_toId": 188
        },
        "services": {
            "_id": 186,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Chat"
            }
        }
    },
    {
        "b": {
            "_id": 185,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Auth"
            }
        },
        "r": {
            "_id": 262,
            "type": "DEPENDS_ON",
            "properties": {},
            "_fromId": 186,
            "_toId": 185
        },
        "services": {
            "_id": 186,
            "labels": [
                "Microservice"
            ],
            "properties": {
                "name": "Chat"
            }
        }
    }
];

console.log(services);
// DEBUG

var width = 960,
    height = 500;

var force = d3.layout.force()
    .charge(-200)
    .linkDistance(80)
    .size([width, height]);

var svg = d3.select(".graph-container").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("./data/output.json", function(error, graph) {
    if (error) throw error;

    console.log(graph[0].b.properties.name + " depends on: " + graph[0].services);
    console.log(graph[1].b.properties.name + " depends on: " + graph[1].services);
    console.log(graph[2].b.properties.name + " depends on: " + graph[2].services);

    force
        .nodes(graph)
        .links(graph)
        .start();

    var link = svg.selectAll(".link")
        .data(graph.links)
        .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
        .data(graph)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 12)
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
