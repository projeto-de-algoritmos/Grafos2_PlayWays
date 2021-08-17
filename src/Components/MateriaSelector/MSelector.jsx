import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import MCheckbox from "../MCheckbox/MCheckbox";
import "./MSelector.css";
import { subjects } from "../../mocks.js";
import { useHistory } from "react-router-dom";
import generateGraph from "../../graph";
import Modal from "@material-ui/core/Modal";

export default function MSelector() {
  const [state, setState] = React.useState(subjects);
  const [modal, setModal] = React.useState({
    show: false,
    subject: "",
    locked: "",
  });
  const history = useHistory();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function handleClick() {
    try {
      let subjectPriorities = generateGraph(state);
      history.push({
        pathname: "/prioridades",
        state: { subjectPriorities: subjectPriorities },
      });
    } catch (err) {
      setModal({
        show: true,
        subject: err.subject,
        locked: err.locked,
      });
    }
  }

  function handleClose() {
    setModal({ show: false });
  }

  return (
    <div className="MSelector">
      <FormGroup column>
        {Object.entries(state).map((materia, idx) => (
          <MCheckbox
            name={materia[0]}
            checked={materia[1]}
            handleChange={handleChange}
            key={idx}
          ></MCheckbox>
        ))}
      </FormGroup>

      <br />
      <button className="generateButton" onClick={handleClick}>
        {" "}
        Gerar Prioridades
      </button>

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
          <h1>
            Escolhas inconsistentes<br></br> {modal.subject} tem como requisito{" "}
            {modal.locked}
          </h1>

          <button className="generateButton" onClick={handleClose}>
            {" "}
            Voltar
          </button>
        </div>
      </Modal>
    </div>
  );
}
