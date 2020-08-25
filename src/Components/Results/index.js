import React from 'react';

import { LeftMargin } from './style'

const Results = ({ win, draw, lose, simulations }) => {

  const calculateHP = (result) => {
    let totalHP = 0
    for (const [key, value] of Object.entries(result.units)) {
      let health = +key[0] + +key[2]*2
      health *= value
      totalHP += health
    }

    return totalHP/simulations

  }
  return (
    <div>
      <p>Wins: {win.amount} - {(win.amount/simulations * 100).toFixed(2)}%</p>
      <p>Average HP remaining: {calculateHP(win)}</p>
      {Object.keys(win.units).sort((a, b) => win.units[b] - win.units[a] ).map((key, i) => {
        if (key[2] === '0') {
          return <LeftMargin key={i}>Regulars: {key[0]}, Quantity: {win.units[key]}</LeftMargin>;
        } else {
          return <LeftMargin key={i}>Regulars: {key[0]} + Elites: {key[2]}, Quanitity: {win.units[key]}</LeftMargin>;
        }
      })}

      <p>Loses: {lose.amount} - {(lose.amount/simulations * 100).toFixed(2)}%</p>
      {Object.keys(lose.units).map((key, i) => {
        if (key[2] === '0') {
          return <LeftMargin key={i}>Regulars: {key[0]}, Quanitity: {lose.units[key]}</LeftMargin>;
        } else {
          return <LeftMargin key={i}>Regulars: {key[0]} + Elites: {key[2]}, Quanitity: {lose.units[key]}</LeftMargin>;
        }
      })}

      <p>Draws: {draw} - {(draw/simulations * 100).toFixed(2)}%</p>
    </div>
  );
}

export default Results;
