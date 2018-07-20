import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  resetGame,
} from '../reducers/game'
import PageScreen from '../components/Page'

const Page = (props) => (
  <PageScreen {...props} />
)

const mapStateToProps = state => ({
  revealed: state.game.revealed
})
const mapDispatchToProps = dispatch => bindActionCreators({
  resetGame,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Page)
