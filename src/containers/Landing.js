import React, { Component } from 'react';
import { connect } from 'react-redux'
import { createGame, joinGame, fetchLatestGames } from '../reducers/game'
import LandingScreen from '../components/Landing'

class Landing extends Component {
  state = {
    option: null,
    gameId: null,
    joinAsCreator: this.joinAsCreator()
  }

  componentWillMount() {
    const gameId = this.props.match.params.id
    const path = this.props.match.path
    let option = path.startsWith('/new') ? 'new' : 'join'
    this.setState({ gameId, option })
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.path !== prevProps.match.path) {
      const gameId = this.props.match.params.id
      const path = this.props.match.path
      console.log('updated', path)
      let option = path.startsWith('/new') ? 'new' : 'join'
      this.setState({ gameId, option })
    }
  }

  // back-door
  joinAsCreator() {
    const search = window.location.search
    if(search.includes('creator=false')) {
      localStorage.setItem('gth:creator', false)
    }

    const creator = search.includes('creator=true')
      || localStorage.getItem('gth:creator') === 'true'

    if(creator) {
      localStorage.setItem('gth:creator', true)
    }

    return creator
  }

  render() {
    const { option, gameId, joinAsCreator } = this.state
    return (
      <LandingScreen
        option={option}
        gameId={gameId}
        joinAsCreator={joinAsCreator}
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
