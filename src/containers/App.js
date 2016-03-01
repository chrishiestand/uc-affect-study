// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserInfoApp from '../components/UserInfoApp';
import AffectApp from '../components/AffectApp';
import QualitativeApp from '../components/QualitativeApp';
import * as actions from '../actions/userInfoActions';

class App extends React.Component {

  render() {
    const step1 = !this.props.appState.hasUserInfo;
    const step2 = false;
    const step3 = false; //this.props.imagesRemaining;
    const step4 = false; //this.props.complete;

    return (
      <div>
        <div className={step1 ? '' : 'hidden'}>
          <h2>Welcome to the UC Affect Study</h2>
          <UserInfoApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step2 ? '' : 'hidden'}>
        <h1>AffectApp</h1>
          <AffectApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step3 ? '' : 'hidden'}>
          <h1>AffectApp</h1>
          <QualitativeApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step4 ? '' : 'hidden'}>
          <h1>Complete</h1>
          <p>All done, thank you!</p>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    appState: state.affectStudyAppState
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
