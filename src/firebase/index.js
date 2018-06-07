import firebase from './setup';
import { compact } from 'lodash'
import { closestColor } from '../util/colorCalculations'

class Firebase {
  createGame(hex) {
    const gamesRef = firebase.database().ref('games');
    const gameRef = gamesRef.push({
      hex,
      started: false,
      revealed: false,
      players: []
    })

    return gameRef.key
  }

  subscribeToAndJoinGame(gameId, playerName, onUpdate) {
    this.gameId = gameId
    this.gameRef = firebase.database().ref(`games/${gameId}`)
    this.gameRef.on('value', snapshot => {
      const game = snapshot.val()
      const players = Object.entries(game.players || {}).map(([id, player]) => (
        { ...player, id }
      ))

      if(game.revealed) {
        const colors = compact(players.map(p => p.guess))
        const winnerColor = closestColor(game.hex, colors)
        players.find(p => p.guess === winnerColor).winner = true
      }

      game.players = players
      onUpdate(game)
    });

    this.addPlayerToGame(playerName)
  }

  addPlayerToGame(name) {
    this.playerRef = firebase.database().ref(`games/${this.gameId}/players`).push({ name })
    this.playerId = this.playerRef.key
  }

  submitGuess(guess) {
    console.log(`submitting ${guess}`)
    this.playerRef.update({ guess })
  }

  updateGame(values) {
    this.gameRef.update(values)
  }

  resetGame(hex, players) {
    players.forEach(player => {
      console.log('updating player ', player.name)
      firebase.database().ref(`games/${this.gameId}/players/${player.id}`).update({ guess: null })

    })
    this.updateGame({ started: true, revealed: false, hex })
  }
}

export default Firebase
