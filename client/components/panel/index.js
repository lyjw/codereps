import React, { Component } from 'react';

class Panel extends Component {

  render() {
    const {user} = this.props
    let adminLinks

    if (user.role === "admin") {
      adminLinks =
          <div id='admin-links'>
            <div>
              <h4>Admin Actions</h4>
            </div>
            <div className='admin-link'>
              <a href="/packs">
                <i className="fa fa-search" aria-hidden="true"></i>
                &nbsp;&nbsp;View Challenge Packs
              </a>
            </div>
            <div className='admin-link'>
              <a href="/packs/new">
                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                &nbsp;&nbsp;Add Challenge Pack
              </a>
            </div>
            <div className='admin-link'>
              <a href="/challenges/new">
                <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                &nbsp;&nbsp;Add Challenge
              </a>
            </div>
          </div>
    }

    return (
      <div id="user-panel">
        <div id="main-panel">
          <div className="name-header">
            <h4>{ user.name }</h4>
            <span className="glyphicon glyphicon-cog toggle-settings" ariaHidden="true"></span>
          </div>
          <div id="user-settings">
            <div className="row">
              <div className="col-md-4 col-md-offset-1">
                <span className="settings-heading">Experience</span>
              </div>
              <div className="col-md-7">
                <p>{ user.experience }</p>
              </div>
              <div className="col-md-4 col-md-offset-1">
                <span className="settings-heading">Languages</span>
              </div>
              <div className="col-md-7">
                <p>{ user.languages }</p>
              </div>
              <div className="col-md-10 col-md-offset-1 text-center">
                <hr />
                <div>
                  Reps in Queue - <strong>{ user.challengeRecords.length }</strong> reps
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
            <div className='stats-value'>{ user.streakCount.length }</div>
          </div>
          <div className='stats-container text-center'>
            <div className='stats-heading'>Reps Completed</div>
            <div className='stats-value'>{ user.repsCompleted }</div>
          </div>

          { adminLinks }

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
