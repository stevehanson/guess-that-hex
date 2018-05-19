import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './App'
import Landing from './Landing'

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders the landing page', () =>  {
  const component = shallow(<App />)
  expect(component.find(Landing).length).toBe(1)
  expect(component.html()).toContain('Welcome to Guess that Hex')
  expect(toJson(component)).toMatchSnapshot()
})

test('renders a game as the creator', () => {
  jest.mock('./firebase/index')
  const component = mount(<App />)
  component.instance().createGame("Bill")
  console.log(component.html())
  expect(component.state('creator')).toBeTruthy()
  expect(component.html()).toContain('Other players can join by entering this game ID')
})

test('can join a game', () => {
  jest.mock('./firebase/index')
  const component = mount(<App />)
  component.instance().joinGame("abc", "Bill")
  console.log(component.html())
  expect(component.state('creator')).toBeFalsy()
  expect(component.html()).toContain("Waiting for game to start")
})

test('can create a new game', () =>  {
  const component = mount(<App />)
  component.find('#new').simulate('click')
  console.log(component.html())
  expect(toJson(component)).toMatchSnapshot()
})
