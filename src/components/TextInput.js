import React, { Component, PropTypes } from 'react';

function buildHandleChange(props) {
  return function handleChange(e) {
    props.onChange(props.name, e.target.value);
  };
}

export default function TextInput(props) {
  const handleChange = buildHandleChange(props);

  return (
    <input className="small"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      pattern={props.pattern}
      onChange={handleChange} />
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
