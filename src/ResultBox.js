import React, { Component } from 'react';
import Radium from 'radium'

const ResultBox = ({ player }) => {
  const boxStyle = [styles.box, { backgroundColor: player.guess }]
  return (
    <div style={boxStyle}>
      <div style={styles.boxGuess}>{player.guess}</div>
      <div style={styles.boxName}>{player.name}</div>
    </div>
  )
}

const styles = {
  box: {
    border: '1px solid #f3f3f3',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxGuess: {
    fontSize: '2em',
    textTransform: 'uppercase',
    fontWeight: '800',
    color: '#888',
    marginBottom: '0.5em'
  },
  boxName: {
    fontSize: '1.5em',
    fontWeight: '800',
    color: '#555'
  }
}

export default Radium(ResultBox)
