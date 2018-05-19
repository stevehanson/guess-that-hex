import React, { Component } from 'react';
import logo from './logo.png';

class Landing extends Component {
  constructor() {
    super()
    this.state = {
      option: '',
      gameId: '',
      name: ''
    }
  }

  gameIdChanged = (e) => {
    this.setState({ gameId: e.target.value })
  }

  nameChanged = (e) => {
    this.setState({ name: e.target.value })
  }

  renderOptions = () => {
    return (
      <div style={styles.actions}>
        <button
          style={{...styles.button, ...styles.actionButton}}
          onClick={() => this.setState({ option: 'new' })}
        >New Game</button>
        <button
          style={{...styles.button, ...styles.actionButton}}
          onClick={() => this.setState({ option: 'join' })}
        >Join Game</button>
      </div>
    )
  }

  renderForm = () => {
    const { onCreate, onJoin } = this.props
    const { option, gameId, name } = this.state
    const buttonText = (option === 'new') ? 'Create Game' : 'Join Game'
    const submit = () => {
      option === 'new' ? onCreate(name) : onJoin(gameId, name)
    }

    return (
      <form style={styles.form} onSubmit={submit}>
        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="name">Your Name</label>
          <input className="input" style={styles.input} value={name} onChange={this.nameChanged} />
        </div>
        {option === 'join' && (
          <div style={styles.formGroup}>
            <label style={styles.label}  htmlFor="gameid">Game ID</label>
            <input style={styles.input} className="input" value={gameId} onChange={this.gameIdChanged} />
          </div>
        )}

        <input
          type="submit"
          value={buttonText} />
      </form>
    )
  }

  render() {
    const { option, gameId, name } = this.state

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <img src={logo} style={styles.logo} alt="guess that hex" />
          </div>
          <div style={{...styles.content, ...styles.pad}}>
            <h2 style={styles.heading}>Welcome to Guess that Hex!</h2>
            {option ? this.renderForm() : this.renderOptions()}
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  page: {
    backgroundColor: 'tomato',
    minHeight: '100vh',
    width: '100%',
    padding: '4em 0'
  },
  container: {
    backgroundColor: '#fafafa',
    borderRadius: '4px',
    overflow: 'hidden',
    width: "480px",
    maxWidth: "98%",
    margin: '4em auto'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    background: '#eee',
    padding: '1.7em 0 0'
  },
  heading: {
    textAlign: 'center'
  },
  pad: {
    padding: '2em 3em'
  },
  logo: {
    width: '300px',
    height: '92px',
    marginBottom: '-1.1em'
  },
  createContainer: {
    marginBottom: '2em'
  },
  formGroup: {
    marginBottom: '1em'
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.2em'
  },
  input: {
    width: '100%'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    border: 'none',
    backgroundColor: 'tomato',
    padding: '0.9em 1em',
    color: 'white',
    borderRadius: '2px',
    fontSize: '16px'
  },
  actionButton: {
    margin: '0 0.5em'
  }
}

export default Landing;
