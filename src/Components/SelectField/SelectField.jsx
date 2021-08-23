import React, { Component } from "react";
import "./SelectField.css";

class SelectField extends Component {
  render() {
    return (
      <div className="field">
        <input className="checkbox" type="checkbox"></input>
        <h3 className="SelectFieldText">{this.props.materia}</h3>
      </div>
    );
  }
}

export default SelectField;
