import React, { Component, PropTypes } from 'react';

function buildHandleChange(props) {
  return function handleChange(e) {
    props.onChange(props.name, e.target.value);
  };
}

export default function TextArea(props) {
  const handleChange = buildHandleChange(props);

  return (
    <textarea className="small"
      type="text"
      placeholder={props.placeholder}
      pattern={props.pattern}
      onChange={handleChange}>{props.value}</textarea>
  );
}

TextArea.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};
