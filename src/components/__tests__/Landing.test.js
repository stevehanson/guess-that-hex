import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import Landing from '../Landing'

const props = {
  createGame: jest.fn(),
  joinGame: jest.fn()
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
  expect(component.html()).toContain('Welcome, friend')
})

test('can create a game', () => {
  const component = mount(<Landing {...props} />)
  component.find('#new-game Button').simulate('click')
  component.find('input#name').simulate('change', { target: { value: 'Bill' } })
  component.find('form').simulate('submit')
  expect(props.createGame).toBeCalledWith('Bill');
})

test('can join a game', () => {
  const component = mount(<Landing {...props} />)
  component.find('#join-game Button').simulate('click')
  component.find('input#name').simulate('change', { target: { value: 'Bill' } })
  component.find('input#game-id').simulate('change', { target: { value: 'abc1' } })
  component.find('form').simulate('submit')
  expect(props.joinGame).toBeCalledWith('abc1', 'Bill');
})
