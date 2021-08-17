import "./style.css";
import React from "react";
import { cytoscape, CytoscapeComponent } from "react-cytoscapejs";

function PlayWay() {
  const [typeIds, setTypeIds] = React.useState([]);
  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    { data: { id: 'three', label: 'Node 3' }, position: { x: 150, y: 0 } },
    { data: { id: 'four', label: 'Node 4' }, position: { x: 200, y: 0 } },
    { data: { id: 'five', label: 'Node 5' }, position: { x: 300, y: 0 } },
    { data: { id: 'six', label: 'Node 6' }, position: { x: 100, y: 200 } },
    { data: { id: 'seven', label: 'Node 7' }, position: { x: 100, y: 100 } },
  ];
  
  function handleConnect() {
    setTypeIds(cy.elements(':selected'));
  }

  // let cy
  var cy = cytoscape({ /* options */ });

  

  console.log("SELECTEEED", typeIds)

  return (

    <div className="PlayWay">

      <h2 className="question"> Para conectar nós, posicione-os e selecione DOIS deles. Depois clique em "Conectar nós"</h2>
      <h3 className="question"> Quando finalizar, clique em "Gerar way"</h3>


      <CytoscapeComponent
            cy={(cy) => { this.cy = cy }}
            elements={elements}
            style={ { width: '600px', height: '600px' } }
            layout={{name: 'random'}}
            pan={ { x: 100, y: 200 } }
            zoom={1}
            userPanningEnabled={false}
            userZoomingEnabled={false}
            // selectionType={'additive'}
      />

      <button className="connectButton" onClick={handleConnect}>
              {" "}
              Conectar nós
      </button>

      <button className="connectButton">
              {" "}
              Gerar Way
      </button>

    </div>

  );

}

export default PlayWay;
