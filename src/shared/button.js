import React from 'react'
import Radium from 'radium'

const Button = ({ onClick, size, style, children, ...props }) => {
  let sizeStyle
  if(size === 'small') {
    sizeStyle = {
      padding: '0.4em 0.7em',
      fontSize: '15px'
    }
  }

  return (
    <button
      style={[styles.button, style, sizeStyle]}
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
