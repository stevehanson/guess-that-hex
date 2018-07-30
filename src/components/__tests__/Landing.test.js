import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Landing from '../Landing'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'

const props = {
  createGame: jest.fn(),
  joinGame: jest.fn(),
  fetchLatestGames: jest.fn(),
  option: 'join',
  games: []
}

beforeAll(() => {
  jest.mock('../../firebase/index')
  window.localStorage = { getItem: ()=>{}, setItem: ()=>{} }
})

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Landing {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders the landing page', () =>  {
  const component = mount(<Landing {...props} />)
  expect(component.html()).toContain('Join Game')
  expect(component.html()).toContain('Select a game below')
  expect(component.html()).toContain('No recent games found')
})

test('can create a game', () => {
  const createProps = { ...props, option: 'new' }
  const component = mount(<Landing {...createProps} />)
  component.find('input#name').simulate('change', { target: { value: 'Bill' } })
  component.find('form').simulate('submit')
  expect(props.createGame).toBeCalledWith('Bill');
})

test('can join a game by selecting from the list', () => {
  const games = [
    { id: 'abc1', createdAt: moment().subtract(5, 'minutes'), createdBy: 'Stephen', players: [{}, {}] },
    { id: 'abc2', createdAt: moment().subtract(8, 'minutes'), createdBy: 'Alice', players: [] },
  ]
  const joinProps = { ...props, games }
  const component = mount(<Landing {...joinProps} />)

  const game = component.find(ListItem).first()
  expect(game.html()).toContain('Stephen')
  expect(game.html()).toContain('5 minutes ago')
  expect(game.html()).toContain('2 players')

  game.simulate('click')
  expect(component.html()).toContain('Almost ready')
  component.find('input#name').simulate('change', { target: { value: 'Bill' } })
  component.find('form').simulate('submit')
  expect(props.joinGame).toBeCalledWith('abc1', 'Bill');
})

test('can join a game by ID', () => {
  const component = mount(<Landing {...props} />)
  const joinById = component.find(ListItem).last()

  expect(joinById.html()).toContain('Join other game')
  joinById.simulate('click')

  expect(component.html()).toContain('Almost ready')
  component.find('input#name').simulate('change', { target: { value: 'Alice' } })
  component.find('input#game-id').simulate('change', { target: { value: 'abc2' } })
  component.find('form').simulate('submit')
  expect(props.joinGame).toBeCalledWith('abc2', 'Alice');
})
