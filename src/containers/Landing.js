import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createGame, joinGame, fetchLatestGames } from '../reducers/game'
import LandingScreen from '../components/Landing'

class Landing extends Component {
  state = {
    option: null,
    gameId: null
  }

  componentWillMount() {
    const gameId = this.props.match.params.id
    const path = this.props.match.path
    let option = null
    if(path.startsWith('/join')) {
      option = 'join'
    } else if(path.startsWith('/new')) {
      option = 'new'
    }

    this.setState({ gameId, option })
  }

  render() {
    const { option, gameId } = this.state
    return (
      <LandingScreen 
        option={option}
        gameId={gameId}
        {...this.props}
      />
    )
  }
}

const mapStateToProps = state => ({
  games: state.game.latestGames,
  loadingGames: state.game.loadingGames
})
const mapDispatchToProps = { createGame, joinGame, fetchLatestGames }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing)
