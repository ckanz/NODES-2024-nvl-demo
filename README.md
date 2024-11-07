This repository contains the code written as part of the [Neo4j NODES 2024](https://neo4j.com/nodes2024/agenda/) talk "[Creating Awesome Graph Visualization With the Neo4j Visualization Library NVL](https://neo4j.com/nodes2024/agenda/creating-awesome-graph-visualization-with-the-neo4j-visualization-library-nvl/)". It makes use of the [NVL boilerplates](https://github.com/neo4j-devtools/nvl-boilerplates).

A recording of the session will be available soon. In the meantime, you can find out more about on NVL here:

- NVL on npm: https://www.npmjs.com/package/@neo4j-nvl/base
- NVL documentation: https://neo4j.com/docs/nvl/current/
- NVL API docs: https://neo4j.com/docs/api/nvl/current/

---

To run the project, you can install the dependencies with `npm install` and start the web server with `npm run start`. To connect to a graph, you can [set up a database](https://neo4j.com/docs/aura/auradb/getting-started/create-database/) on Neo4j Aura https://console-preview.neo4j.io/ and import the "Movies" graph from the guides [here](https://console-preview.neo4j.io/guides/sample-datasets). Be sure the update the uri and credentials in the `connection.js` file with the ones from your Aura instance once it has been created.
