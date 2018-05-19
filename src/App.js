import React, { Component } from 'react';
import Game from './Game';
import Landing from './Landing';
import firebase from './firebase';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      started: false,
      creator: false,
      gameId: null
    }
  }

  createGame = (name) => {
    const hex = '#'+Math.floor(Math.random()*16777215).toString(16)
    const gamesRef = firebase.database().ref('games');
    const gameRef = gamesRef.push({
      hex,
      started: false,
      revealed: false,
      players: []
    })

    this.setState({ hex, gameId: gameRef.key, creator: true })
    this.subscribeToGame(gameRef.key)
    this.addPlayerToGame(gameRef.key, name)
  }

  subscribeToGame = (id) => {
    this.gameRef = firebase.database().ref(`games/${id}`)
    this.gameRef.on('value', (snapshot) => {
      const game = snapshot.val()
      console.log(game)
      this.setState(game)
    });
  }

  addPlayerToGame = (id, name) => {
    firebase.database().ref(`games/${id}/players`).push({ name })
  }

  updateGame = (vals) => {
    this.gameRef.set(vals)
  }

  joinGame = (id, name) => {
    this.setState({ gameId: id, creator: false })
    this.subscribeToGame(id)
    this.addPlayerToGame(id, name)
  }

  startGame = () => {
    this.updateGame({ started: true })
    this.setState({ started: true })
  }

  revealAnswer = () => {
    this.updateGame({ revealed: true })
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
