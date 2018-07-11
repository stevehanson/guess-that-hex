import React from 'react'
import tinycolor from 'tinycolor2'
import ResultBox from '../ResultBox'

const GameResults = ({ players, hex }) => {
  const colorStyle = {
    ...styles.colorContainer,
    color: tinycolor.mostReadable(hex, ['#444', '#fff']).toHexString(),
    backgroundColor: hex
  }

  return (
    <div style={styles.container}>
      <div style={colorStyle}>
        <span style={styles.colorText}>{hex}</span>
      </div>
      <div style={styles.boxesContainer}>
        <div style={styles.boxes}>
          {players && players.map(player => (
            <ResultBox
              key={player.id}
              player={player}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    overflow: 'hidden'
  },
  boxesContainer: {
    overflowY: 'scroll',
    width: '100%',
    flex: 2
  },
  colorContainer: {
    display: 'flex',
    flex: 1,
    width: '100px',
    height: '100vh',
    fontSize: '25px',
    fontWeight: 600,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    '@media (minWidth: 500px)': {
      fontSize: '1em'
    },
    '@media (minWidth: 700px)': {
      fontSize: '1.3em'
    }
  },
  colorText: {
    width: '18px',
    wordWrap: 'break-word'
  },
  boxes: {
    // display: 'grid',
    // gridTemplateColumns: '1fr 1fr',
    // gridTemplateRows: 'auto',
    // height: 'calc(100vh - 52px)'
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  },
}

export default GameResults
