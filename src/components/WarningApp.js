import React, {PropTypes} from 'react';

const WarningApp = (props) => {

  const settings = props.appState;

  function warning_accept(value, e) {
    props.actions.updateStateKey(props, 'warning_accepted', true);
  }


  return (
    <div>
    <div id="warning">
      <h1>WARNING:</h1>
      <p>Please note that the following images could be psychologically disturbing to some viewers, and include gruesome and/or violent scenes of murder, violence against women, suicide, and animal cruelty. You may choose not to participate and may stop at any time by closing the browser window or by simply getting up and leaving the room.</p>
    </div>

      <input type="submit" value="Continue" onClick={warning_accept} />
    </div>
  );
};

WarningApp.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default WarningApp;
