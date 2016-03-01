import React, { Component, PropTypes } from 'react';

function buildHandleChange(props) {
  const name = props.name;

  return function handleChange(e) {
    props.onChange(name, e.target.value);
  };
}

export default function NumberInput(props) {
  const handleChange = buildHandleChange(props);

  return (
    <input className="small"
      type="number"
      name={props.name}
      value={props.value}
      min={props.min}
      max={props.max}
      onChange={handleChange}
    />
  );
}

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number
};
