import React, { Component } from 'react';

class GameStatus extends Component {
  render() {
    const { started, revealed } = this.props
    return (
      <div className="GameStatus">
        <div className="GameStatus__content">
          {!started && (
            <div className="GameStatus__waiting">
              Waiting for game to start...
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default GameStatus
