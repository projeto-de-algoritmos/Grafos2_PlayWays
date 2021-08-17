import "./style.css";
import MSelector from "../../Components/MateriaSelector/MSelector";
import CytoscapeComponent from "react-cytoscapejs";

function PlayWay() {

  const elements = [
    { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
    { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
    { data: { id: 'three', label: 'Node 3' }, position: { x: 150, y: 0 } },
    { data: { id: 'four', label: 'Node 4' }, position: { x: 200, y: 0 } },
    { data: { id: 'five', label: 'Node 5' }, position: { x: 300, y: 0 } },
    { data: { id: 'six', label: 'Node 6' }, position: { x: 100, y: 200 } },
    { data: { id: 'seven', label: 'Node 7' }, position: { x: 100, y: 100 } },
  ];


  return (

    <div className="PlayWay">
      <CytoscapeComponent
            elements={elements}
            style={ { width: '600px', height: '600px' } }
            layout={{name: 'random'}}
            pan={ { x: 100, y: 200 } }
            zoom={1}
            userPanningEnabled={false}
            userZoomingEnabled={false}
            selectionType={'additive'}
      />

    

      <button className="connectButton">
              {" "}
              Conectar nós
      </button>

      <button className="connectButton">
              {" "}
              Gerar Way
      </button>

    </div>

  );


  // return (
  //   <>
  //     <h1 className="question"> Quais matérias c já fez?</h1>


  //     <MSelector></MSelector>
  //   </>
  // );
}

export default PlayWay;
