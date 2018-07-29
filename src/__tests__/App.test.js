import React from 'react'
import ReactDOM from 'react-dom'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from '../App'
import Landing from '../components/Landing'

beforeAll(() => {
  jest.mock('../firebase/index')
  window.localStorage = { getItem: ()=>{}, setItem: ()=>{} }
})

test('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('renders the landing page by default', () =>  {
  const component = mount(<App />)
  expect(component.find(Landing).length).toBe(1)
})
