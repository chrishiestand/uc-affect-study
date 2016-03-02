import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import RadioGroup from 'react-radio-group';
import GENDERS from '../constants/Genders';
import SEXUAL_ORIENTATIONS from '../constants/SexualOrientations';
import RACES from '../constants/Races';
import * as MAGIC from '../constants/Magic';
import Moment from 'moment';

const AffectApp = (props) => {

  const settings = props.appState;

  const [_, image_question, image_url] = settings.imagesRemaining[0];

  const step1 = !settings.imageInfo.end_ms;
  const step2 = !step1;

  function saveStateRadio(value, e) {
    props.actions.setImageAnswer(props, e.target.name, value);
  }

  function enableImageAnswer() {
    props.actions.enableImageAnswer(props);
  }

  function nextImage() {
    props.actions.nextImage(props.appState);
  }

  function nextImageQuestion() {
    const end_ms = Moment().valueOf();
    props.actions.nextImageQuestion(props.appState, end_ms);
  }

  function setStartTime() {
    const start_ms = Moment().valueOf();
    props.actions.setImageStartMs(props, start_ms);
  }

  if (!settings.imageInfo.start_ms && settings.hasUserInfo && step1) {
    setStartTime();
  }

  if (settings.imageAnswerDisabled && settings.hasUserInfo) {

    setTimeout(() => {
      enableImageAnswer();
    }, MAGIC.IMAGE_FREEZE_MS);

  }

  return (
    <div>
      <div className={step1 ? '' : 'hidden'}>
        <img src={image_url} className="affectimage" />
        <p>When you are ready to answer a question about this image, please click the "Next" button</p>
        <input type="submit" value="Next" onClick={nextImageQuestion} disabled={settings.imageAnswerDisabled ? 'disabled' : ''} />

      </div>

      <div className={step2 ? '' : 'hidden'}>
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
        <input type="submit" value="Next" onClick={nextImage} />

      </div>
    </div>
  );
};

AffectApp.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default AffectApp;
