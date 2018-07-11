import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { StyleRoot } from 'radium';

import tinycolor from 'tinycolor2'

import WaitingForPlayers from '../WaitingForPlayers'
import GameGuessing from '../GameGuessing'
import GameResults from '../components/GameResults'

const noop = () => {}
const hex = () => tinycolor.random().toHexString()
const players = [
  { name: 'Stephen', guess: hex() },
  { name: 'Dawn', guess: 'yellow', },
  { name: 'Frasier', guess: hex() },
  { name: 'A Really Long Name' }
]

const RadiumDecorator = (storyFn) => (
  <StyleRoot>
    { storyFn() }
  </StyleRoot>
);

addDecorator(RadiumDecorator)

storiesOf('GameResults', module)
  .add('with results', () => (
    <GameResults players={players} hex={hex()} />
  ))
  .add('with medium number of players', () => (
    <GameResults players={players.concat(players)} hex={hex()} />
  ))
  .add('with lots of players', () => (
    <GameResults players={players.concat(players).concat(players)} hex={hex()} />
  ));

storiesOf('WaitingForPlayers', module)
  .add('with players as creator', () => (
    <WaitingForPlayers players={players} creator={true} onStart={noop} />
  ))
  .add('with players', () => (
    <WaitingForPlayers players={players} creator={false} onStart={noop} />
  ))


storiesOf('GameGuessing', module)
  .add('game', () => (
    <GameGuessing hex={hex} players={players} onReveal={noop} creator={true} />
  ));
