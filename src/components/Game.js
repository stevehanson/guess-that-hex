import React from 'react'
import GameGuessing from './GameGuessing'
import GameResults from './GameResults'
import WaitingForPlayers from './WaitingForPlayers'

const Game = (props) => {
  const {
    id,
    startGame,
    creator,
    started,
    revealed,
    hex,
    guess,
    players,
    submitGuess,
    revealAnswer 
  } = props

  if(!started) {
    return (
      <WaitingForPlayers
        gameId={id}
        players={players}
        creator={creator}
        onStart={startGame}
      />
    )
  } 

  if(guess && revealed) {
    return (
      <GameResults
        players={players}
        hex={hex}
      />
    )
  } else {
    return (
      <GameGuessing
        creator={creator}
        guess={guess}
        hex={hex}
        onReveal={revealAnswer}
        onSubmit={submitGuess}
        players={players}
      />
    )
  }
}

export default Game
