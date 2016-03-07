import React, {PropTypes} from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import RadioGroup from 'react-radio-group';
import GENDERS from '../constants/Genders';
import RACES from '../constants/Races';
import * as MAGIC from '../constants/Magic';
import * as FBC from '../constants/Firebase';
import Moment from 'moment';

function AffectApp(props) {

  const settings = props.appState;

  if (settings.imagesRemaining.length < 1) {
    return (
      <div>noop</div>
    );
  }

  const step1 = !settings.imageInfo.end_ms;
  const step2 = !step1;
  let next_image_url;

  const [image_number, image_question, image_url] = settings.imagesRemaining[0];

  if (settings.imagesRemaining.length > 1) {
    next_image_url = settings.imagesRemaining[1][2];
  }

  /* kludge warning:
  ** This assumes browser behavior of downloading the hidden image and soon re-use cached image
  ** There is probably a more reliable way
  */
  function preloadNextImage() {

    if (!next_image_url) {
      return (
        <span></span>
      );
    }
    return (
      <img className="hidden" src={next_image_url} />
    );
  }

  function saveStateRadio(value, e) {
    props.actions.setImageAnswer(props, e.target.name, value);
  }

  function enableImageAnswer() {
    props.actions.enableImageAnswer(props);
  }

  function drainImageQueue() {
    props.actions.drainImageQueue(props);
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

  if (step1 && settings.hasUserInfo && !settings.imageTimeout) {
    const timeout = setTimeout(() => {
      nextImageQuestion();
    }, MAGIC.IMAGE_MAX_MS);

    // Kludge: setImmediate should be removed and logic done in state logic
    setImmediate(() => props.actions.updateStateKey(props.appState, 'imageTimeout', timeout));
  }

  if (!settings.imageInfo.start_ms && settings.hasUserInfo && step1) {
    setImmediate(() => setStartTime());
  }

  if (settings.imageAnswerDisabled && settings.hasUserInfo && !settings.imageFreeze) {

    const timeout = setTimeout(() => {
      enableImageAnswer();
    }, MAGIC.IMAGE_FREEZE_MS);
    setImmediate(() => props.actions.updateStateKey(props.appState, 'imageFreeze', timeout));

  }

  function isMissingInfo() {

    if (settings.imageInfo.answer) {
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
      <div className={step1 ? '' : 'hidden'}>
        <img src={image_url} className="affectimage" />
        <p>Press next to continue</p>
        <input type="submit" value="Next" onClick={nextImageQuestion} disabled={settings.imageAnswerDisabled ? 'disabled' : ''} />
        <button onClick={drainImageQueue} className={FBC.ENV === 'production' ? 'hidden' : ''}>Test Only: Skip Images</button>
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
        <input type="submit" value={submitButtonText()} onClick={nextImage} disabled={submitDisableValue()} />
        {preloadNextImage()}
      </div>
    </div>
  );
}

AffectApp.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

export default AffectApp;
