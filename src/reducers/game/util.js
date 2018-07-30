import { sortPlayersByClosest } from '../../util/colorCalculations'

export const transformObjectToArrayWithId = obj => (
  Object.entries(obj || {}).map(([id, vals]) => ({ ...vals, id }))
)

export const mapFirebasePlayers = (firebaseGame) => ( 
  transformObjectToArrayWithId(firebaseGame.players)
)

export const mapFirebaseGames = (firebaseGames) => {
  let games = transformObjectToArrayWithId(firebaseGames)
  return games.map(game => {
    game.players = transformObjectToArrayWithId(game.players)
    return game
  })
}

export const mapFirebaseGameToGame = (firebaseGame, state) => {
  console.log('unmapped players', firebaseGame.hex, firebaseGame.players)
  let players = mapFirebasePlayers(firebaseGame)
  if(firebaseGame.revealed) {
    players = sortPlayersByClosest(firebaseGame.hex, players)
  }

  firebaseGame.players = players
  // game was reset, clear guess
  if(state.game.revealed && !firebaseGame.revealed) {
    firebaseGame.guess = null
  }

  console.log('mapped players', firebaseGame.players)

  return firebaseGame
}
