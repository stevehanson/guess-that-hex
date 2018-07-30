import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { StyleRoot } from 'radium';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../theme'

import WaitingForPlayers from '../components/WaitingForPlayers'
import GameGuessing from '../components/GameGuessing'
import GameResults from '../components/GameResults'
import Landing from '../components/Landing'
import Page from '../components/Page'
import { hex, getPlayers } from './utils'
import '../index.css'

const noop = () => {}
const RadiumDecorator = (storyFn) => (
  <StyleRoot>
    { storyFn() }
  </StyleRoot>
);

const MaterialDecorator = (storyFn) => (
  <MuiThemeProvider theme={theme}>
    { storyFn() }
  </MuiThemeProvider>
);

addDecorator(RadiumDecorator)
addDecorator(MaterialDecorator )

storiesOf('Page', module)
  .add('with basic nav', () => {
    return (
      <Page />
    )
  })

storiesOf('GameResults', module)
  .add('with results', () => {
    const gameHex = hex()
    return (
      <GameResults
        players={getPlayers(3, gameHex)}
        hex={gameHex}
      />
    )
  })
  .add('with medium number of players', () => {
    const gameHex = hex()
    return (
      <GameResults
        players={getPlayers(6, gameHex)}
        hex={gameHex}
      />
    )
  })
  .add('with lots of players', () => {
    const gameHex = hex()
    return (
      <GameResults
        players={getPlayers(25, gameHex)}
        hex={gameHex}
      />
    )
  });

storiesOf('Landing', module)
  .add('initial state', () => (
    <Landing
      createGame={noop}
      joinGame={noop}
      fetchLatestGames={noop}
    />
  ))
  .add('with gameId passed', () => (
    <Landing
      createGame={noop}
      joinGame={noop}
      fetchLatestGames={noop}
      option="join"
      gameId="12345"
    />
  ))
  .add('creating game', () => (
    <Landing
      createGame={noop}
      joinGame={noop}
      fetchLatestGames={noop}
      option="create"
    />
  ))

const finishFirst = (players) => {
  delete players[0].guess
  return players
}
storiesOf('WaitingForPlayers', module)
  .add('with players as creator', () => (
    <WaitingForPlayers
      players={getPlayers(4)}
      creator={true}
      onStart={noop}
    />
  ))
  .add('with players', () => (
    <WaitingForPlayers
      players={getPlayers(4)}
      creator={false}
      onStart={noop}
    />
  ))
  .add('with lots of players', () => (
    <WaitingForPlayers
      players={getPlayers(25)}
      creator={false}
      onStart={noop}
    />
  ))


storiesOf('GameGuessing', module)
  .add('game', () => (
    <GameGuessing
      hex={hex()}
      players={finishFirst(getPlayers(4))}
      onReveal={noop}
      creator={true}
    />
  ))
  .add('with lots of players', () => (
    <GameGuessing
      hex={hex()}
      players={finishFirst(getPlayers(25))}
      onReveal={noop}
      creator={true}
    />
  ));
