import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import RadioGroup from 'react-radio-group';
import GENDERS from '../constants/Genders.js';
import SEXUAL_ORIENTATIONS from '../constants/SexualOrientations.js';
import RACES from '../constants/Races.js';

const AffectApp = (props) => {

  function saveImageInfo() {
    props.actions.saveImageInfo(props.appState);
  }

  function saveStateRadio(value, e) {
    props.actions.updateImageState(props, e.target.name, value);
  }

  function enableImageAnswer() {
    props.actions.enableImageAnswer(props);
  }

  const settings = props.appState;

  let [_, image_question, image_url] = settings.imagesRemaining[0];
  const disabled_ms = 2000;

  if (settings.imageAnswerDisabled) {

    setTimeout(() => {
      console.log('asdf');
      enableImageAnswer();
    }, disabled_ms);

  }

  return (
    <div>
      <img src={image_url} className="affectimage" />
      <p>{image_question}</p>

      <div id="answerRadio">
        <RadioGroup name="answer" onChange={saveStateRadio} selectedValue={props.appState.imageInfo.answer}>
        {Radio => (
          <div>
            <Radio value="yes" id="yes" /><label htmlFor="yes">Yes</label><br />
            <Radio value="no" id="no" /><label htmlFor="no">No</label><br />
          </div>
        )}
      </RadioGroup>
    </div>

      {/*{settings.necessaryDataIsProvidedToCalculateSavings ? <FuelSavingsResults savings={settings.savings} /> : null}*/}
      <input type="submit" value="Next" onClick={saveImageInfo} disabled={settings.imageAnswerDisabled ? 'disabled' : ''} />
    </div>
  );
};

AffectApp.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default AffectApp;
