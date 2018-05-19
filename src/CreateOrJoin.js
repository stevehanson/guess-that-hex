import React, { Component } from 'react';

class CreateOrJoin extends Component {
  constructor() {
    super()
    this.state = {
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

  render() {
    const { gameId, name } = this.state

    return (
      <div className="CreateOrJoin">
        <div className="CreateOrJoin__content">
          <h2>Create or join</h2>
          <div style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="name">Your Name</label>
              <input className="input" style={styles.input} value={name} onChange={this.nameChanged} />
            </div>
            <div style={styles.actions}>
              <button onClick={() => this.props.onCreate(name)}>Create Game</button>
            </div>
            <div style={styles.joinContainer}>
              <form>
                <div style={styles.formGroup}>
                  <label style={styles.label}  htmlFor="gameid">Game ID</label>
                  <input className="input" value={gameId} onChange={this.gameIdChanged} />
                </div>

                <button onClick={() => this.props.onJoin(gameId, name)}>Join</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
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
}

export default CreateOrJoin;
