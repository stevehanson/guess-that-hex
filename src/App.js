import React, { Component } from 'react';
import Game from './Game';
import CreateOrJoin from './CreateOrJoin';
import logo from './logo.svg';
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

  createGame = (id) => {
    this.setState({ gameId: id, creator: true })
  }

  joinGame = (id) => {
    this.setState({ gameId: id, creator: false })
  }

  startGame = () => {
    this.setState({ started: true })
  }

  revealAnswer = () => {
    this.setState({ revealed: true })
  }

  render() {
    const { gameId, creator, revealed, started } = this.state

    if(gameId) {
      return (
        <Game
          id={gameId}
          creator={creator}
          started={started}
          revealed={revealed}
          onStart={this.startGame}
          onReveal={this.revealAnswer}
        />
      )
    } else {
      return (
        <CreateOrJoin
          onJoin={this.joinGame}
          onCreate={this.createGame}
        />
      )
    }
  }
}

export default App;
