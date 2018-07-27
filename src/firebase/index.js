import firebase from './setup';

class Firebase {
  createGame(gameVals) {
    const gamesRef = firebase.database().ref('games');
    const gameRef = gamesRef.push(gameVals)
    return gameRef.key
  }

  subscribeToAndJoinGame(gameId, playerName, onUpdate) {
    this.gameId = gameId
    this.gameRef = firebase.database().ref(`games/${gameId}`)
    this.gameRef.on('value', snapshot => onUpdate(snapshot.val()))
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
