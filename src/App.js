import React, { Component } from 'react';
import Game from './Game';
import Landing from './Landing';
import Firebase from './firebase/index';
import './App.css';

class App extends Component {
  firebase = new Firebase()
  state = {
    started: false,
    creator: false,
    revealed: false,
    players: [],
    gameId: null
  }

  createGame = (name) => {
    const hex = '#'+Math.floor(Math.random()*16777215).toString(16)
    const gameId = this.firebase.createGame(hex)
    this.setState({ hex, gameId, creator: true })
    this.subscribeToAndJoinGame(gameId, name)
  }

  subscribeToAndJoinGame = (gameId, name) => {
    this.firebase.subscribeToAndJoinGame(gameId, name, (gameVals) => {
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

  startGame = () => {
    this.firebase.updateGame({ started: true })
    this.setState({ started: true })
  }

  revealAnswer = () => {
    this.firebase.updateGame({ revealed: true })
    this.setState({ revealed: true })
  }

  playerHexChanged = (player, hex) => {
    console.log('hex changed', player, hex)
  }

  render() {
    const { gameId, creator, hex, revealed, started, players } = this.state

    return (
      <div>
        <div style={styles.content}>
          {gameId ? (
            <Game
              id={gameId}
              creator={creator}
              hex={hex}
              started={started}
              revealed={revealed}
              players={players}
              onStart={this.startGame}
              onReveal={this.revealAnswer}
              onPlayerHexChanged={this.playerHexChanged}
            />
          ) : (
            <Landing onJoin={this.joinGame} onCreate={this.createGame} />
          )}
        </div>
      </div>
    )
  }
}

const styles = {
  content: {

  }
}

export default App;
