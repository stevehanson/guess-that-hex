import React, { Component } from 'react';

class GameControls extends Component {
  render() {
    const { started, revealed } = this.props
    return (
      <div className="GameControls">
        <div className="GameControls__controls">
          {!started && (
            <button
              onClick={this.props.onStart}
            >Start Game!</button>
          )}
          {started && !revealed && (
            <button onClick={this.props.onReveal}>
              Reveal color!
            </button>
          )}
        </div>
      </div>
    )
  }
}

export default GameControls
