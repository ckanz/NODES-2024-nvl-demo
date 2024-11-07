import { nvlResultTransformer } from "@neo4j-nvl/base";
import neo4j from "neo4j-driver";

// URI examples: 'neo4j://localhost', 'neo4j+s://xxx.databases.neo4j.io'
const URI = "<uri>";
const USER = "<user>";
const PASSWORD = "<password>";
let driver;

export const executeQuery = async (query) => {
  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD));
    const data = await driver.executeQuery(
      query,
      {},
      { resultTransformer: nvlResultTransformer }
    );

    const nodes = data.nodes.map((n) => {
      const { properties, labels } = data.recordObjectMap.get(n.id);
      return {
        ...n,
        caption: properties.name ?? properties.title,
        color: labels[0] === "Person" ? "lightgreen" : undefined,
      };
    });

    const relationships = data.relationships.map((r) => {
      const or = data.recordObjectMap.get(r.id);

      return {
        ...r,
        caption: or.type,
      };
    });

    return { nodes, relationships };
  } catch (err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`);
  }
};
