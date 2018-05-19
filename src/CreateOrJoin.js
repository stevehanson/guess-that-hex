import React, { Component } from 'react';

class CreateOrJoin extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="CreateOrJoin">
        <div className="CreateOrJoin__content">
          <h2>Create or join</h2>
          <div className="CreateOrJoin__buttons">
            <button onClick={() => this.props.onCreate('12345')}>Create Game</button>
            <button onClick={() => this.props.onJoin('12345')}>Join</button>
          </div>
        </div>
      </div>
    )
  }
}

export default CreateOrJoin;
