import React from 'react';
import Radium from 'radium'
import tinycolor from 'tinycolor2'

const ResultBox = ({ player }) => {
  const styles = getStyles(player.guess)
  const hex = tinycolor(player.guess).toHexString()
  const boxStyle = [styles.box, { backgroundColor: hex }]

  return (
    <div className="ResultBox" style={boxStyle}>
      <div style={styles.boxGuess}>{player.guess}</div>
      <div style={styles.boxName}>{player.name}</div>
      {player.winner && (
        <h2 style={styles.winner}>
          <span role="img" aria-label="tada">🎉</span>&nbsp;
          Winner!&nbsp;
          <span role="img" aria-label="tada">🎉</span>&nbsp;
        </h2>
      )}
    </div>
  )
}

const getStyles = (guess) => (
  {
    box: {
      border: '1px solid #f3f3f3',
      display: 'flex',
      flex: 1,
      minHeight: '110px',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    },
    boxGuess: {
      fontSize: '1.5em',
      textTransform: 'uppercase',
      fontWeight: '800',
      color: tinycolor.mostReadable(guess, ['#444', '#fff']).toHexString(),
      marginBottom: '0.5em',
      '@media (min-width: 500px)': {
        fontSize: '2em'
      }
    },
    boxName: {
      fontSize: '1em',
      fontWeight: '800',
      color: tinycolor.mostReadable(guess, ['#444', '#fff']).toHexString(),
      '@media (min-width: 500px)': {
        fontSize: '1.5em'
      }
    },
    winner: {
      color: tinycolor.mostReadable(guess, ['#444', '#fff']).toHexString(),
      position: 'absolute',
      top: 0,
      left: '1em',
      fontSize: '1em',
      fontWeight: '400',
      '@media (min-width: 500px)': {
        fontSize: '1.2em'
      }
    }
  }
)

export default Radium(ResultBox)
