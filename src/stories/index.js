import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { StyleRoot } from 'radium';


import WaitingForPlayers from '../WaitingForPlayers'
import GameGuessing from '../GameGuessing'
import GameResults from '../components/GameResults'
import Landing from '../components/Landing'
import { hex, getPlayers } from './utils'
import '../index.css'

const noop = () => {}
const RadiumDecorator = (storyFn) => (
  <StyleRoot>
    { storyFn() }
  </StyleRoot>
);

addDecorator(RadiumDecorator)

storiesOf('GameResults', module)
  .add('with results', () => (
    <GameResults players={getPlayers(3)} hex={hex()} />
  ))
  .add('with medium number of players', () => (
    <GameResults players={getPlayers(6)} hex={hex()} />
  ))
  .add('with lots of players', () => (
    <GameResults players={getPlayers(15)} hex={hex()} />
  ));

storiesOf('Landing', module)
  .add('initial state', () => (
    <Landing
      createGame={noop}
      joinGame={noop}
    />
  ))
  .add('with gameId passed', () => (
    <Landing
      createGame={noop}
      joinGame={noop}
      option="join"
      gameId="12345"
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
