function minKey(key, mstSet, V) {
  // Initialize min value
  let min = Number.MAX_VALUE,
    min_index;

  for (let v = 0; v < V; v++)
    if (mstSet[v] == false && key[v] < min) {
      min = key[v];
      min_index = v;
    }

  return min_index;
}

function primMST(graph, V) {
  let parent = [];

  let key = [];

  let mstSet = [];

  for (let i = 0; i < V; i++) {
    key[i] = Number.MAX_VALUE;
    mstSet[i] = false;
  }

  key[0] = 0;
  parent[0] = -1;

  for (let count = 0; count < V - 1; count++) {
    let u = minKey(key, mstSet, V);

    mstSet[u] = true;

    for (let v = 0; v < V; v++)
      if (graph[u][v] && mstSet[v] == false && graph[u][v] < key[v]) {
        parent[v] = u;
        key[v] = graph[u][v];
      }
  }

  return parent;
}

export default function generateMST(edges, cy) {
  let V = cy.nodes().length;

  let graph = makeGraph(edges, cy);

  let parent;
  parent = primMST(graph, V);

  let selectedEgdes = [];

  for (let i = 1; i < V; i++) {
    let edge = {
      from: parent[i] + 1,
      to: i + 1,
    };

    selectedEgdes.push(edge);
  }

  return selectedEgdes;
}

function makeGraph(edges, cy) {
  let graph = [];

  for (let i = 0; i < edges.length; i++) {
    graph[i] = [];
  }

  for (let i = 0; i < edges.length; i++) {
    for (let j = 0; j < edges.length; j++) {
      graph[i][j] = 0;
    }
  }

  edges.forEach((edge) => {
    graph[edge.from - 1][edge.to - 1] = edge.weight;
    graph[edge.to - 1][edge.from - 1] = edge.weight;
  });

  return graph;
}
