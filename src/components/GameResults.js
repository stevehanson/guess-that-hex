import React from 'react'
import Radium from 'radium'
import tinycolor from 'tinycolor2'
import ResultBox from './ResultBox'
import globalStyle from '../globalStyle'

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
          {players && players.filter(p => p.guess).map((player, index) => (
            <ResultBox
              key={player.id}
              player={player}
              winner={index === 0}
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
    height: `calc(100vh - ${globalStyle.navHeight})`,
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
    '@media (min-width: 500px)': {
      fontSize: '1.3em'
    },
    '@media (min-width: 700px)': {
      fontSize: '2em'
    }
  },
  colorText: {
    textTransform: 'uppercase',
    width: '18px',
    wordWrap: 'break-word',
    '@media (min-width: 500px)': {
      width: 'auto',
      wordWrap: 'normal',
      letterSpacing: '0.05em'
    }
  },
  boxes: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(100vh - ${globalStyle.navHeight})`,
  },
}

export default Radium(GameResults)
