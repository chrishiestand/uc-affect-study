import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import RadioGroup from 'react-radio-group';
import GENDERS from '../constants/Genders.js';
import SEXUAL_ORIENTATIONS from '../constants/SexualOrientations.js';
import RACES from '../constants/Races.js';

const UserInfoApp = (props) => {

  const settings = props.appState;

  function saveUserInfo() {
    props.actions.saveUserInfo(props.appState);
  }

  function saveState(name, value) {
    props.actions.updateUserState(props, name, value);
  }

  function saveStateRadio(value, e) {
    props.actions.updateUserState(props, e.target.name, value);
  }

  function isMissingInfo() {
    const ui = settings.userInfo;

    if (ui.age && ui.gender && ui.sexual_orientation && ui.race) {
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
      <p>You are about to begin a study of responsiveness to affective imagery. The study consists of viewing a slide deck of images and answering a question about each image. The images will appear on your screen one at a time; after viewing an image, select the next button. A question about the image will appear on your screen. Select your response, then select the next button to view the next image. After all the images have been viewed you will be asked two additional questions about the images requiring a typed response. After completing these questions, select the submit button to submit your responses and terminate your session.</p>
      <table>
        <tbody>
        <tr>
          <td><label htmlFor="age">Age</label></td>
          <td><NumberInput name="age" min={18} max={99} onChange={saveState}/></td>
        </tr>
        <tr>
          <td><label htmlFor="gender">Gender</label></td>
          <td>
            <RadioGroup name="gender" onChange={saveStateRadio} selectedValue={props.appState.userInfo.gender}>
            {Radio => (
              <div>
                <Radio value={GENDERS[0].toLowerCase()} id={'gender' + GENDERS[0]} /><label htmlFor={'gender' + GENDERS[0]}>{GENDERS[0]}</label><br />
                <Radio value={GENDERS[1].toLowerCase()} id={'gender' + GENDERS[1]} /><label htmlFor={'gender' + GENDERS[1]}>{GENDERS[1]}</label><br />
                <Radio value={GENDERS[2].toLowerCase()} id={'gender' + GENDERS[2]} /><label htmlFor={'gender' + GENDERS[2]}>{GENDERS[2]}</label><br />
              </div>
            )}
          </RadioGroup>
          </td>
        </tr>
        <tr>
          <td><label htmlFor="sexual_orientation">Sexual Orientation</label></td>
          <td>
            <RadioGroup name="sexual_orientation" onChange={saveStateRadio} selectedValue={props.appState.userInfo.sexual_orientation}>
            {Radio => (
              <div>
                <Radio value={SEXUAL_ORIENTATIONS[0].toLowerCase()} id={'sex' + SEXUAL_ORIENTATIONS[0]}/><label htmlFor={'sex' + SEXUAL_ORIENTATIONS[0]}>{SEXUAL_ORIENTATIONS[0]}</label><br />
                <Radio value={SEXUAL_ORIENTATIONS[1].toLowerCase()} id={'sex' + SEXUAL_ORIENTATIONS[1]}/><label htmlFor={'sex' + SEXUAL_ORIENTATIONS[1]}>{SEXUAL_ORIENTATIONS[1]}</label><br />
              </div>
            )}
          </RadioGroup>
          </td>
        </tr>
        <tr>
          <td><label htmlFor="race">Race</label></td>
          <td>
            <RadioGroup name="race" onChange={saveStateRadio} selectedValue={props.appState.userInfo.race}>
            {Radio => (
              <div>
                <Radio value={RACES[0].toLowerCase()} id={'race' + RACES[0]} /><label htmlFor={'race' + RACES[0]}>{RACES[0]}</label><br />
                <Radio value={RACES[1].toLowerCase()} id={'race' + RACES[1]} /><label htmlFor={'race' + RACES[1]}>{RACES[1]}</label><br />
              </div>
            )}
          </RadioGroup>
          </td>
        </tr>

        </tbody>
      </table>

      <input type="submit" value={submitButtonText()} onClick={saveUserInfo} disabled={submitDisableValue()} />
    </div>
  );
};

UserInfoApp.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default UserInfoApp;
