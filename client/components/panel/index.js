import React, { Component } from 'react';

class Panel extends Component {
  render() {
    return (
      <div id="user-panel">
        <div id="main-panel">
          <div className="name-header">
            <h4>{ this.props.user.name }</h4>
            <span className="glyphicon glyphicon-cog toggle-settings" ariaHidden="true"></span>
          </div>
          <div id="user-settings">
            <div className="row">
              <div className="col-md-4 col-md-offset-1">
                <span className="settings-heading">Experience</span>
              </div>
              <div className="col-md-7">
                <p>{ this.props.user.experience }</p>
              </div>
              <div className="col-md-4 col-md-offset-1">
                <span className="settings-heading">Languages</span>
              </div>
              <div className="col-md-7">
                <p>{ this.props.user.languages }</p>
              </div>
              <div className="col-md-10 col-md-offset-1 text-center">
                <hr />
                <div>
                  You are currently working on <br /><strong>{ this.props.user.challengeRecords.length }</strong> reps.
                </div>
                <a href="/users/settings">
                  <button className="btn btn-default">Edit Settings</button>
                </a>
              </div>
            </div>
          </div>
          <hr />
          <div className='stats-container text-center'>
            <div className='stats-heading'>Current Streak</div>
            <div className='stats-value'>{ this.props.user.streakCount.length }</div>
          </div>
          <div className='stats-container text-center'>
            <div className='stats-heading'>Reps Completed</div>
            <div className='stats-value'>{ this.props.user.repsCompleted }</div>
          </div>
          <div id='user-footer'>
            <a href='/users/logout'>Log Out</a>
          </div>
        </div>
        <div id="side-panel">
          <span className="glyphicon glyphicon-triangle-right toggle-panel" ariaHidden="true"></span>
        </div>
      </div>
    );
  }
}

export default Panel;
