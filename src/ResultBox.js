import React from 'react';
import Radium from 'radium'
import tinycolor from 'tinycolor2'

const ResultBox = ({ player }) => {
  const styles = getStyles(player.guess)
  const boxStyle = [styles.box, { backgroundColor: player.guess }]

  return (
    <div style={boxStyle}>
      <div style={styles.boxGuess}>{player.guess}</div>
      <div style={styles.boxName}>{player.name}</div>
      {player.winner && (
        <h2>🎉 WINNER! 🎉</h2>
      )}
    </div>
  )
}

const getStyles = (guess) => (
  {
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
      color: tinycolor.mostReadable(guess, ['#444', '#fff']).toHexString(),
      marginBottom: '0.5em'
    },
    boxName: {
      fontSize: '1.5em',
      fontWeight: '800',
      color: tinycolor.mostReadable(guess, ['#444', '#fff']).toHexString(),
    }
  }
)

export default Radium(ResultBox)
