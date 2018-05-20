import React, { Component } from 'react';
import Radium from 'radium'
import Button from './shared/button'
import logo from './logo.png';
import globalStyle from './globalStyle'

class Landing extends Component {
  constructor(props) {
    super()
    this.state = {
      option: '',
      gameId: '',
      name: localStorage.getItem('gth:name') || ''
    }
    
  }

  componentDidMount() {
    let path = window.location.pathname.substr('1')
    console.log(path)
    if(path.length) {
      path = decodeURIComponent(path)
      console.log(path)
      this.setState({ gameId: path, option: 'join' })
    }
  }

  gameIdChanged = (e) => {
    this.setState({ gameId: e.target.value })
  }

  nameChanged = (e) => {
    const name = e.target.value
    this.setState({ name })
    localStorage.setItem('gth:name', name)
  }

  renderOptions = () => {
    return (
      <div style={styles.actions}>
        <Button
          id="new"
          key="new"
          style={{...styles.button, ...styles.actionButton}}
          onClick={() => this.setState({ option: 'new' })}
        >New Game</Button>
        <Button
          id="join"
          key="join"
          style={{...styles.button, ...styles.actionButton}}
          onClick={() => this.setState({ option: 'join' })}
        >Join Game</Button>
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
          <label style={[globalStyle.label, styles.label]} htmlFor="name">Your Name</label>
          <input style={[globalStyle.input, styles.input]} value={name} onChange={this.nameChanged} />
        </div>
        {option === 'join' && (
          <div style={styles.formGroup}>
            <label style={[globalStyle.label, styles.label]}  htmlFor="gameid">Game ID</label>
            <input style={[globalStyle.input, styles.input]} value={gameId} onChange={this.gameIdChanged} />
          </div>
        )}

        <Button type="submit" style={styles.submit}>{buttonText}</Button>
        <a
          role="button"
          style={styles.back}
          onClick={() => this.setState({ option: null })}
          key="back"
        >
          &laquo; Back
        </a>
      </form>
    )
  }

  render() {
    const { option } = this.state

    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.header}>
            <img src={logo} style={styles.logo} alt="guess that hex" />
          </div>
          <div style={styles.content}>
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
    width: "540px",
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
    marginBottom: '2em'
  },
  form: {
    marginTop: '2em'
  },
  content: {
    padding: '2em 4em'
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
    marginBottom: '1.5em'
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '0.2em'
  },
  input: {
    width: '100%',
  },
  back: {
    color: "#888",
    marginLeft: '1em',
    textDecoration: 'none',
    ':hover': {
      color: globalStyle.colors.primary,
      transition: 'all 200ms'
    }
  },
  submit: {
    marginTop: '1.5em'
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    margin: '2em 0 1em'
  },
  actionButton: {
    margin: '0 0.5em'
  }
}

export default Radium(Landing);
