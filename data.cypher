CREATE (auth:Microservice { name: 'Auth' })
CREATE (chat:Microservice { name: 'Chat' })
CREATE (search:Microservice { name: 'Search' })
CREATE (account:Microservice { name: 'Account' })
CREATE (chat)-[:DEPENDS_ON]->(auth)
CREATE (chat)-[:DEPENDS_ON]->(account)
CREATE (chat)-[:DEPENDS_ON]->(search)
CREATE (auth)-[:DEPENDS_ON]->(account)

