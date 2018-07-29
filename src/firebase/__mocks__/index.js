class Firebase {

  simulateUpdate(gameVals) {
    this.onUpdate(gameVals)
  }
  createGame(gameVals) {
    return 'abcd'
  }

  subscribeToAndJoinGame(gameId, playerName, onUpdate) {
    this.gameId = gameId
    this.onUpdate = onUpdate
    this.addPlayerToGame(playerName)
  }

  addPlayerToGame(name) {
  }

  submitGuess(guess) {
  }

  updateGame(values) {
  }

  resetGame(hex, players) {
  }
}

export default Firebase
