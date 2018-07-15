import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  startGame,
  resetGame,
  submitGuess,
  revealAnswer,
} from '../reducers/game'
import GameScreen from '../components/Game'

class Game extends Component {
  componentDidMount() {
    // redirect if someone navigates straight here
    // if(!this.props.players.length) {
    //   this.props.history.push(`/join/${this.props.match.params.id}`)
    // }
  }

  render() {
    return <GameScreen {...this.props} />
  }
}

const mapStateToProps = state => {
  return state.game
}

const mapDispatchToProps = dispatch => bindActionCreators({
  startGame,
  resetGame,
  submitGuess,
  revealAnswer,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)
