import React, { Component } from 'react';
import { StyleRoot } from 'radium';
import Game from './Game';
import Landing from './Landing';
import Firebase from './firebase/index';
import tinycolor from 'tinycolor2'
import './App.css';

class App extends Component {
  firebase = new Firebase()
  state = {
    started: false,
    creator: false,
    revealed: false,
    players: [],
    gameId: null,
    guess: null,
  }

  createGame = (name) => {
    const hex = tinycolor.random().toHexString()
    const gameId = this.firebase.createGame(hex)
    this.setState({ hex, gameId, creator: true })
    this.subscribeToAndJoinGame(gameId, name)
  }

  subscribeToAndJoinGame = (gameId, name) => {
    this.firebase.subscribeToAndJoinGame(gameId, name, (gameVals) => {
      // game was reset, clear guess
      if(this.state.revealed && !gameVals.revealed) {
        gameVals.guess = null
      }
      this.setState(gameVals)
    })
  }

  updateGame = (vals) => {
    this.gameRef.set(vals)
  }

  joinGame = (gameId, name) => {
    this.setState({ gameId, creator: false })
    this.subscribeToAndJoinGame(gameId, name)
  }

  submitGuess = (guess) => {
    this.firebase.submitGuess(guess)
    this.setState({ guess })
  }

  startGame = () => {
    this.firebase.updateGame({ started: true })
    this.setState({ started: true })
  }

  resetGame = () => {
    const hex = tinycolor.random().toHexString()
    this.firebase.resetGame(hex, this.state.players)
    this.setState({ guess: null, revealed: false, hex })
  }

  revealAnswer = () => {
    this.firebase.updateGame({ revealed: true })
    this.setState({ revealed: true })
  }

  render() {
    const { gameId, creator, guess, hex, revealed, started, players } = this.state

    return (
      <StyleRoot>
        <div style={styles.content}>
          {gameId ? (
            <Game
              id={gameId}
              creator={creator}
              hex={hex}
              guess={guess}
              started={started}
              revealed={revealed}
              players={players}
              onStart={this.startGame}
              onReset={this.resetGame}
              onSubmit={this.submitGuess}
              onReveal={this.revealAnswer}
            />
          ) : (
            <Landing
              gameId={gameId}
              onJoin={this.joinGame}
              onCreate={this.createGame}
            />
          )}
        </div>
      </StyleRoot>
    )
  }
}

const styles = {
  content: {

  }
}

export default App;
