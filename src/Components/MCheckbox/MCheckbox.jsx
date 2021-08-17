import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./MCheckbox.css";

export default function MCheckbox(props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          onChange={props.handleChange}
          key={props.idx}
          name={props.name}
          color="primary"
        />
      }
      label={props.name}
      className="control"
    />
  );
}
