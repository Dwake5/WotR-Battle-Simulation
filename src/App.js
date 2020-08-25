import React, { Component } from 'react';
import Settings from './Components/Settings'
import Results from './Components/Results'

import runSimulation from './MainFunction'

import { MainDiv, H1 } from './style'

class App extends Component {
  state = {
    attackReg: 4,
    attackElite: 0,
    attackLeader: 0,
    defendReg: 0,
    defendElite: 0,
    defendLeader: 0,
    simulations: 100,
    terrain: 'field',
    win: {
      amount: 0,
      units: {}
    },
    lose: {
      amount: 0,
      units: {}
    },
    draw: 0,
    noElites: 0,
  }

  updateState = e => {
    this.setState({ [e.target.name]: e.target.value})
  };

  handleSimulations = () => {
    const { attackReg, attackElite, attackLeader, defendReg, defendElite, defendLeader, simulations, terrain } = this.state
    let runSimulations = simulations
    let noElites = 0
    let draw = 0
    let win = {
      amount: 0,
      units: {}
    }
    let lose = {
      amount: 0,
      units: {}
    }
    for (let k = 0; k < runSimulations; k++) {
      let result = runSimulation(+attackReg, +attackElite, +attackLeader, +defendReg, +defendElite, +defendLeader, terrain)
      let units = result[1]

      if (result[0] === 'Draw') {
        draw++
      } 

      if (result[0] === 'Win') {
        win.amount++
        let key = [units[0],units[1]]
        if ([key] in win.units) {
          win.units[key]++
        } else {
          win.units[key] = 1
        }
      }

      if (result[0] === 'Lost') {
        lose.amount++
        let key = [units[3],units[4]]
        if ([key] in lose.units) {
          lose.units[key]++
        } else {
          lose.units[key] = 1
        }
      }

      if (result[0] === 'No elites') {
        noElites++
      }
    }
    this.setState({
      win: win,
      lose: lose,
      draw: draw,
      noElites: noElites
    })
  }

  render() {
    const { win, lose, draw, noElites, simulations } = this.state
    return (
      <MainDiv>
        <H1>WOTR battle simulator</H1>
        <Settings handleSimulations={this.handleSimulations} updateState={this.updateState} {...this.state}/>
        { (win.amount + lose.amount + draw) > 0 &&
        <Results 
          win={win}
          lose={lose}
          draw={draw}
          noElites={noElites}
          simulations={simulations}
        />}
      </MainDiv>
    )
  }

}

export default App;
