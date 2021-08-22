import "./style.css";
import React, { useState, useEffect } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { pink } from "@material-ui/core/colors";
import { sqrt, pow } from 'mathjs'

function PlayWay(history) {
  let nodeQuantity = history.location.state.nodes;

  const nodes = generateNodes(nodeQuantity);
  let edges = [];

  const [state, setState] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
    nodes: nodes,
    edges: edges,
    elements: nodes,
  });
  const [cy, setCy] = useState();

  let handleConnect = () => {
    let newEdges = connectNodes(cy.elements(":selected"), state.edges);

    let newState = state;
    newState.edges = newState.edges.concat(newEdges);

    newState.elements = newState.nodes.concat(newState.edges);
    setState(newState);

    console.log("NEWEDGES", newEdges);

    cy.add(newEdges);
  };

  return (
    <div className="PlayWay">
      <h2 className="question">
        {" "}
        Para conectar nós, posicione-os e selecione DOIS deles. Depois clique em
        "Conectar nós"
      </h2>
      <h3 className="question"> Quando finalizar, clique em "Gerar way"</h3>

      <CytoscapeComponent
        elements={state.elements}
        cy={(newCy) => {
          // newCy.on("click", "node", (event) => {
          //   console.log("clcked in ", event.target._private.data);
          // });
          // if (newCy != cy) {
          setCy(newCy);

          // }
        }}
        style={{
          border: "5px solid black",
          height: "40rem",
          color: pink,
          "text-outline-color": "pink",
        }}
        layout={{ name: "random" }}
        zoom={1}
        userPanningEnabled={false}
        userZoomingEnabled={false}
        selectionType={"additive"}
      />

      <button className="connectButton" onClick={handleConnect}>
        {" "}
        Conectar nós
      </button>

      <button className="connectButton"> Gerar Way</button>
    </div>
  );
}

export default PlayWay;

function connectNodes(selectedElements, existingEdges) {
  let edges = [];

  for (var i = 0; i < selectedElements.length; i++) {
    for (var j = i + 1; j < selectedElements.length; j++) {
      if (
        !edgeExists(selectedElements[i], selectedElements[j], existingEdges) &&
        selectedElements[i].isNode() &&
        selectedElements[j].isNode()
      ) {
        let edgeLength = getEdgeLength(selectedElements[i], selectedElements[j])
        let newEdge = createEdge(selectedElements[i], selectedElements[j], edgeLength);
        edges.push(newEdge);
      }
    }
  }

  return edges;
}

function getEdgeLength(from, to) {
  
  let edgeLength;

  let x1, x2, y1, y2;

  x1 = from.position().x
  x2 = to.position().x
  y1 = from.position().y
  y2 = to.position().y

  edgeLength = sqrt(pow((x1-x2), 2) + pow((y1-y2), 2))
  
  return edgeLength;
}

function createEdge(from, target, edgeLength) {
  return {
    data: {
      source: from._private.data.id,
      target: target._private.data.id,
      edgeLength: edgeLength,
    },
  };
}

function edgeExists(from, to, existingEdges) {
  for (let elementIdx in existingEdges) {
    if (
      existingEdges[elementIdx].data.source == from._private.data.id &&
      existingEdges[elementIdx].data.target == to._private.data.id
    ) {
      return true;
    }
    if (
      existingEdges[elementIdx].data.source == to._private.data.id &&
      existingEdges[elementIdx].data.target == from._private.data.id
    ) {
      return true;
    }
  }
  return false;
}

function generateNodes(quantity) {
  let nodes = [];

  for (var i = 0; i < quantity; i++) {
    let node = {
      data: {
        id: i + 1,
        label: i + 1,
      },
    };

    nodes.push(node);
  }
  return nodes;
}
