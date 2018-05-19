import React, { Component } from 'react';

class GameControls extends Component {
  render() {
    const { id, started, revealed } = this.props
    return (
      <div className="GameControls">
        <div className="GameControls__controls">
          {!started && (
            <div>
              <div style={styles.gameIdContainer}>
                <div style={styles.gamedIdText}>Other players can join by entering this game ID:</div>
                <div style={styles.gameId}>
                  <pre>{id}</pre>
                </div>
                <button onClick={this.props.onStart}>Start Game!</button>
              </div>
            </div>
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

const styles = {
  gameIdContainer: {
    marginTop: '2em',
    textAlign: 'center',
  },
  gameIdText: {

  },
  gameId: {
    fontSize: '2em',
    marginBottom: '1em'
  }
}

export default GameControls
