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

var output = {
    "nodes": [{
        "id": "chat"
    }, {
        "id": "auth"
    }],
    "links": [{
        "source": "chat",
        "target": "auth"
    }]
}

console.log(output);