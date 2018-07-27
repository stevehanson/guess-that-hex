import { sortPlayersByClosest } from '../../util/colorCalculations'

export const mapFirebaseGameToGame = (firebaseGame, state) => {
  let players = Object.entries(firebaseGame.players || {}).map(([id, player]) => (
    { ...player, id }
  ))

  if(firebaseGame.revealed) {
    players = sortPlayersByClosest(firebaseGame.hex, players)
  }

  firebaseGame.players = players
  // game was reset, clear guess
  if(state.game.revealed && !firebaseGame.revealed) {
    firebaseGame.guess = null
  }

  return firebaseGame
}
