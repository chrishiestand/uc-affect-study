// This file bootstraps the app with the boilerplate necessary
// to support hot reloading in Redux
import React, {PropTypes} from 'react';
import _Promise from 'bluebird';
import Firebase from 'firebase';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WarningApp from '../components/WarningApp';
import UserInfoApp from '../components/UserInfoApp';
import AffectApp from '../components/AffectApp';
import QualitativeApp from '../components/QualitativeApp';
import * as appActions from '../actions/appActions';
import * as Export from '../businessLogic/export';

process.on('unhandledRejection', err => { throw err; });

class App extends React.Component {

  componentDidMount() {
    this.setupExport();
    this.runExport();
  }

  async setupExport() {
    /*eslint no-console: 0*/

    let ref = this.props.appState.exportRef;

    try {
      await ref.authAnonymously();
    }
    catch(error) {
      console.error('failed to anonymously auth');
      return setTimeout(this.setupExport.bind(this), 1000);
    }

    console.log('successful anon auth');
    this.props.actions.authExport();
  }

  async runExport() {

    const settings        = this.props.appState;
    const ref             = settings.exportRef;
    const userid          = settings.uniqueUid;
    const userInfoExport  = settings.userInfoExport;
    const userImageExport = settings.userImageExport;

    const num_exports = Export.getNumToExport(settings);

    if (!userid || !ref || !num_exports) {
      return setTimeout(this.runExport.bind(this), 1000);
    }

    try {
      await Export.exportImageInfo_P(ref, userid, userImageExport);
      await Export.exportUserInfo_P(ref, userid, userInfoExport);
    }
    catch(error) {
      console.error(error);
      return setTimeout(this.runExport.bind(this), 1000);
    }

    console.log('successful export');

    this.props.actions.unsetExports(settings, userInfoExport, userImageExport);
    return setTimeout(this.runExport.bind(this), 1000);
  }

  render() {
    const settings    = this.props.appState;
    const num_exports = Export.getNumToExport(settings);

    const step1   = !settings.warning_accepted;
    const step2   = !step1 && !settings.hasUserInfo;
    const step3   = !step1 && !step2 && settings.imagesRemaining.length;
    const step4   = !step1 && !step2 && !step3 && !settings.complete;
    const step5   = settings.complete && num_exports < 1;
    const loading = !step1 && !step2 && !step3 && !step4 && !step5;

    return (
      <div>

        <div className={step1 ? '' : 'hidden'}>
          <WarningApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step2 ? '' : 'hidden'}>
          <h2>Welcome to the UC Affect Study</h2>
          <UserInfoApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step3 ? '' : 'hidden'}>
          <AffectApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step4 ? '' : 'hidden'}>
          <QualitativeApp appState={this.props.appState} actions={this.props.actions}/>
        </div>

        <div className={step5 ? '' : 'hidden'}>
          <h1>Complete</h1>
          <p>All done, thank you!</p>
          <p>Refresh the page to start over</p>
        </div>

        <div className={loading ? '' : 'hidden'}>
          <h1>Do not close this browser window, please wait.</h1>
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
    actions: bindActionCreators(appActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
