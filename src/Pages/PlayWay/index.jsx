import "./style.css";
import React, { useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import { pink } from "@material-ui/core/colors";
import { sqrt, pow } from "mathjs";
import Modal from "@material-ui/core/Modal";

function PlayWay(history) {
  let nodeQuantity = history.location.state.nodes;

  const [modal, setModal] = React.useState({
    show: false,
    message: "",
  });

  const nodes = generateNodes(nodeQuantity);

  const [state, setState] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
    nodes: nodes,
    edges: [],
    elements: nodes,
  });
  const [cy, setCy] = useState();

  const handleConnect = () => {
    let newEdges = connectNodes(cy.elements(":selected"), state.edges);

    let newState = state;
    newState.edges = newState.edges.concat(newEdges);

    newState.elements = newState.nodes.concat(newState.edges);
    setState(newState);

    cy.add(newEdges);
  };

  const generatePath = () => {
    if (
      cy.elements(":selected").length != 1 ||
      !cy.elements(":selected")[0].isNode()
    ) {
      setModal({
        show: true,
        message: "Selecione apenas um nó",
      });
      return;
    }
    if (
      !hasConnection(state.edges, cy.elements(":selected")[0]._private.data.id)
    ) {
      setModal({
        show: true,
        message: "O nó selecionado precisa se conectar a ao menos um outro",
      });
      return;
    }

    console.log("STATE", state);

    let edges = [];
    for (var idx in state.edges) {
      let edgeLength = getEdgeLength(
        cy.getElementById(state.edges[idx].data.source),
        cy.getElementById(state.edges[idx].data.target)
      );

      let edge = {
        from: state.edges[idx].data.source,
        to: state.edges[idx].data.target,
        weight: edgeLength,
      };
      edges.push(edge);
    }

    // //pathIDs deve ter o array dos ids
    // let pathIDs = prim(edges);

    // //path deve ter o array dos elements, dá pra pegar o element com o getElementByID
    // path.select();
  };

  function handleClose() {
    setModal({ show: false });
  }

  return (
    <div className="PlayWay">
      <Modal
        open={modal.show}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modaldiv">
          <h1>{modal.message}</h1>

          <button className="generateButton" onClick={handleClose}>
            {" "}
            Voltar
          </button>
        </div>
      </Modal>

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

      <button className="connectButton" onClick={generatePath}>
        {" "}
        Gerar Way
      </button>
    </div>
  );
}

export default PlayWay;

function hasConnection(edges, elem) {
  for (let edge in edges) {
    if (edges[edge].data.source == elem || edges[edge].data.target == elem) {
      return true;
    }
  }
  return false;
}

function connectNodes(selectedElements, existingEdges) {
  let edges = [];

  for (var i = 0; i < selectedElements.length; i++) {
    for (var j = i + 1; j < selectedElements.length; j++) {
      if (
        !edgeExists(selectedElements[i], selectedElements[j], existingEdges) &&
        selectedElements[i].isNode() &&
        selectedElements[j].isNode()
      ) {
        let newEdge = createEdge(selectedElements[i], selectedElements[j]);
        edges.push(newEdge);
      }
    }
  }

  return edges;
}

function getEdgeLength(from, to) {
  let edgeLength;

  let x1, x2, y1, y2;

  x1 = from.position().x;
  x2 = to.position().x;
  y1 = from.position().y;
  y2 = to.position().y;

  edgeLength = sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2));

  return edgeLength;
}

function createEdge(from, target) {
  return {
    data: {
      source: from._private.data.id,
      target: target._private.data.id,
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
