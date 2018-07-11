import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { StyleRoot } from 'radium';

import { Button, Welcome } from '@storybook/react/demo';

import tinycolor from 'tinycolor2'

import WaitingForPlayers from '../WaitingForPlayers'
import GameGuessing from '../GameGuessing'

const noop = () => {}
const hex = tinycolor.random().toHexString()
const players = [{ name: 'Stephen' }, { name: 'Dawn', guess: 'yellow', }, { name: 'Frasier', guess: '#ff0044' }]

const RadiumDecorator = (storyFn) => (
  <StyleRoot>
    { storyFn() }
  </StyleRoot>
);

addDecorator(RadiumDecorator)

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

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));
