import { NVL } from "@neo4j-nvl/base";
import { executeQuery } from "./connection";
import { setupInteraction } from "./interaction";

const container = document.getElementById("app");
const { nodes, relationships } = await executeQuery(
  "MATCH p=()-[]->() RETURN p LIMIT 25;"
);
const nvl = new NVL(container, nodes, relationships, { initialZoom: 2.6 });

setupInteraction(nvl)
