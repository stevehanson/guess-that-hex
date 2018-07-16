import tinycolor from 'tinycolor2'
import { sample, sampleSize } from 'lodash'
import { sortPlayersByClosest } from '../util/colorCalculations'

const names = [
  'Stephen', 'Dawn', 'Fraser', 'Sam', 'Kyle', 'A really Long Name', 
  'Voldemort', 'Harry Haller', 'Hermoine Granger', 'LongNameWithoutSpaces',
  'Billy Pilgrim', 'Kilgore Trout', 'Zachariah', 'Jessica', 'Susan',
  'Bertuccio', 'José', 'Björn', 'Matilda', 'Jackie', 'Trudy', 'Ben', 'Alice',
  'Abe', 'John', 'Ann', 'Lisa'
]

export const hex = () => tinycolor.random().toHexString()

export const randomName = () => sample(names)

export const getPlayer = (options = {}) => {
  return {
    name: randomName(),
    guess: hex(),
    ...options
  }
}

export const getPlayers = (n, targetHex, options = {}) => {
  const players = []
  const playerNames = sampleSize(names, n)
  for(let i = 0; i < n; i++) {
    const opts = { ...options, name: playerNames[i] }
    players.push(getPlayer(opts))
  }

  if(targetHex) {
    return sortPlayersByClosest(targetHex, players)
  } else {
    return players

  }
} 
