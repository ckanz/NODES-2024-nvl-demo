import { executeQuery } from "./connection";
import {
  PanInteraction,
  ZoomInteraction,
} from "@neo4j-nvl/interaction-handlers";

export const setupInteraction = (nvl) => {
  new PanInteraction(nvl);
  new ZoomInteraction(nvl);

  const container = nvl.getContainer();

  container.addEventListener("mousemove", (evt) => {
    const { nvlTargets } = nvl.getHits(evt);
    const node = nvlTargets.nodes[0];

    if (node) {
      if (node.distance < 15) {
        container.style.cursor = "move";
        if (evt.buttons === 1) {
          nvl.setNodePositions(
            [
              {
                id: node.data.id,
                x: node.pointerCoordinates.x,
                y: node.pointerCoordinates.y,
              },
            ],
            evt.ctrlKey
          );
        }
      } else {
        container.style.cursor = "pointer";
      }
    } else {
      if (evt.buttons === 1) {
      }
      container.style.cursor = "default";
    }
  });

  container.addEventListener("click", (evt) => {
    const { nvlTargets } = nvl.getHits(evt);
    const node = nvlTargets.nodes[0];

    if (node && node.distance >= 15) {
      const wikiUrl = "https://en.wikipedia.org/w/index.php?search=";
      window.open(wikiUrl + node.data.caption);
    }
  });

  container.addEventListener("dblclick", async (evt) => {
    const { nvlTargets } = nvl.getHits(evt);
    const node = nvlTargets.nodes[0];

    if (node && node.distance < 15) {
      const query = `MATCH (a)-[r]-(b) WHERE elementId(a) = "${node.data.id}" RETURN a,r,b;`;
      const connections = await executeQuery(query);

      nvl.addAndUpdateElementsInGraph(
        connections.nodes,
        connections.relationships.map((r) => ({ ...r, selected: true }))
      );
      nvl.fit(connections.nodes.map((n) => n.id));
    }
  });
};
