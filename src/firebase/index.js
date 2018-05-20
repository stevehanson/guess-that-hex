import firebase from './setup';

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
      const players = game.players
      game.players = Object.entries(players || {}).map(([id, player]) => (
        { ...player, id }
      ))
      console.log(game.players)
      console.log(game)
      onUpdate(game)
    });

    this.addPlayerToGame(playerName)
  }

  addPlayerToGame(name) {
    this.playerRef = firebase.database().ref(`games/${this.gameId}/players`).push({ name })
    this.playerId = this.playerRef.key
    console.log('player id: ' + this.playerId)
  }

  submitGuess(guess) {
    this.playerRef.set({ guess })
  }

  updateGame(values) {
    this.gameRef.set(values)
  }
}

export default Firebase
