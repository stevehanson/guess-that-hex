import React, { Component } from 'react'
import Radium from 'radium'

const Button = ({ onClick, style, children, ...props }) => {
  return (
    <button
      style={[styles.button, style]}
      onClick={onClick}
      {...props}
    >{children}</button>
  )
}

const styles = {
  button: {
    border: 'none',
    backgroundColor: '#00aced',
    cursor: 'pointer',
    padding: '0.9em 1em',
    color: 'white',
    borderRadius: '2px',
    fontSize: '16px',
    ':hover': {
      backgroundColor: '#00bcfd',
      transition: 'all 100ms'
    }
  }
}

export default Radium(Button)
