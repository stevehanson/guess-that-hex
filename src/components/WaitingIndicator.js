import React, { Component } from 'react'
import globalStyle from '../globalStyle'

class WaitingIndicator extends Component {
  state = { loadingDots: '' }

  componentDidMount() {
    this.interval = setInterval(() => {
      let loadingDots = this.state.loadingDots
      if(loadingDots.length === 5) {
        loadingDots = ''
      } else {
        loadingDots += '.'
      }
      this.setState({ loadingDots })
    }, 600)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { loadingDots} = this.state

    return (
      <span style={styles.loadingDots}>{loadingDots}&nbsp;</span>
    )
  }
}

const styles = {
  loadingDots: {
    fontFamily: 'georgia, serif',
    fontSize: '1.4em',
    fontWeight: 900,
    height: '35px',
    color: globalStyle.colors.primary,
    marginTop: '0.5em'
  }
}

export default WaitingIndicator
