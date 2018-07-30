import firebase from './setup'
import { transformObjectToArrayWithId } from '../reducers/game/util'
import moment from 'moment'

class Firebase {
  createGame(gameVals) {
    const gamesRef = firebase.database().ref('games');
    const gameRef = gamesRef.push(gameVals)
    return gameRef.key
  }

  subscribeToAndJoinGame(gameId, playerName, onUpdate) {
    let playerAdded = false
    this.gameId = gameId
    this.gameRef = firebase.database().ref(`games/${gameId}`)
    this.gameRef.on('value', snapshot => {
      const game = snapshot.val()
      if(game && !playerAdded) {
        playerAdded = true
        this.addPlayerToGame(playerName)
        return // this is necessary so we don't call onUpdate with race condition
      }

      onUpdate(game)
    })
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

  fetchLatestGames() {
    return new Promise((resolve, reject) => {
      const gamesRef = firebase.database().ref('games').limitToLast(10)
      gamesRef.once('value', function(snapshot) {
        let games = transformObjectToArrayWithId(snapshot.val())
        games = games.map(game => {
          game.players = transformObjectToArrayWithId(game.players)
          return game
        })

        let currentGames = games.filter(game => {
          const recent = moment().subtract(30, 'minutes')
          return game.createdAt && moment(game.createdAt).isAfter(recent)
        })

        resolve(currentGames.reverse())
      });
    })
  }
}

export default Firebase
