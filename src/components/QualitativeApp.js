import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import TextArea from './TextArea';
import NumberInput from './NumberInput';
import RadioGroup from 'react-radio-group';
import EMOTIONS from '../constants/Emotions';

const UserInfoApp = (props) => {

  const settings = props.appState;

  function markComplete() {
    props.actions.markComplete(props.appState);
  }

  function saveStateText(name, value) {
    props.actions.updateStateKey(props, name, value);
  }

  function saveStateRadio(value, e) {
    props.actions.updateStateKey(props, e.target.name, value);
  }

  function isMissingInfo() {

    if (settings.emotion && settings.qual1 && settings.qual2) {
      return false;
    }

    return true;
  }

  function submitDisableValue() {
    if (isMissingInfo()) {
      return 'disabled';
    }
    return '';
  }

  function submitButtonText() {
    if (isMissingInfo()) {
      return 'Answer to continue';
    }
    return 'Next';
  }


  return (
    <div>
      <table>
        <tbody>
        <tr><td>Describe the image that was most memorable.</td></tr>
        <tr><td><TextArea name="qual1" onChange={saveStateText}/></td></tr>

        <tr><td>
          <label htmlFor="emotion">Select the emotion most commonly elicited by the images:</label><br />
            <RadioGroup name="emotion" onChange={saveStateRadio} selectedValue={props.appState.emotion}>
            {Radio => (
              <div>
                <Radio value={EMOTIONS[0].toLowerCase()} id={'emotion' + EMOTIONS[0]} /><label htmlFor={'emotion' + EMOTIONS[0]}>{EMOTIONS[0]}</label><br />
                <Radio value={EMOTIONS[1].toLowerCase()} id={'emotion' + EMOTIONS[1]} /><label htmlFor={'emotion' + EMOTIONS[1]}>{EMOTIONS[1]}</label><br />
                <Radio value={EMOTIONS[2].toLowerCase()} id={'emotion' + EMOTIONS[2]} /><label htmlFor={'emotion' + EMOTIONS[2]}>{EMOTIONS[2]}</label><br />
                <Radio value={EMOTIONS[3].toLowerCase()} id={'emotion' + EMOTIONS[3]} /><label htmlFor={'emotion' + EMOTIONS[3]}>{EMOTIONS[3]}</label><br />
                <Radio value={EMOTIONS[4].toLowerCase()} id={'emotion' + EMOTIONS[4]} /><label htmlFor={'emotion' + EMOTIONS[4]}>{EMOTIONS[4]}</label><br />
              </div>
            )}
          </RadioGroup>
          </td></tr>


        <tr><td>Explain how the images made you feel.</td></tr>
        <tr><td><TextArea name="qual2" onChange={saveStateText}/></td></tr>



        </tbody>
      </table>

      <input type="submit" value={submitButtonText()} onClick={markComplete} disabled={submitDisableValue()} />
    </div>
  );
};

UserInfoApp.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default UserInfoApp;
