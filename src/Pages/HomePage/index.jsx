import "./style.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";

function HomePage() {
  const history = useHistory();
  const [nodes, setNodes] = useState(5);

  function handleClick() {
    history.push({ pathname: "/playway", state: { nodes: nodes } });
  }

  const NodesSlider = withStyles({
    root: {
      color: "#FFA500",
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: "#FFA500",
      border: "2px solid black",
      marginTop: -8,
      marginLeft: -12,
      "&:focus, &:hover, &$active": {
        boxShadow: "inherit",
      },
    },
    active: {},
    valueLabel: {
      color: "#000",
      left: "calc(-50% + 4px)",
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

  const handleSliderChange = (event, newValue) => {
    setNodes(newValue);
  };

  return (
    <div className="HomePage">
      <h2 className="question">Welcome to Play Ways!</h2>
      <br />
      <h3 className="question">
        {" "}
        Vamos gerar um grafo com a quantidade de nós que deseja, quantos são?
      </h3>
      <br />

      <Typography id="discrete-slider" gutterBottom>
        Nós
      </Typography>
      <NodesSlider
        className="slider"
        defaultValue={nodes}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={2}
        max={15}
        onChange={handleSliderChange}
      />

      <br />

      <button className="generateButton" onClick={handleClick}>
        {" "}
        Começar
      </button>
    </div>
  );
}

export default HomePage;
