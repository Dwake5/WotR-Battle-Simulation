const runSimulation = ( attReg, attElite, attLeader, defReg, defElite, defLeader, terrain ) => {
    
  const rollXDiceHitOn = ( diceRolled, hitOn ) => {
    let results = [0,0,0,0,0,0]
    for (let i = 0; i < diceRolled; i++) {
        let roll = Math.floor(Math.random()*6)
        results[roll]++
    }

    return results.slice(hitOn-1).reduce((acc, val) => acc + val);
  }

  let units = [attReg, attElite, attLeader, defReg, defElite, defLeader]
  // console.log(units)

  // Check for a draw and then lose/win. Kill the approiate leaders. Return the result and units.
  const checkForWin = () => {
    if ((units[0] + units[1] <= 0) && (units[3] + units[4] <= 0)) {
      units[2] = 0
      units[5] = 0
      return ['Draw', units]
    } 
    if (units[0] + units[1] <= 0) {
      units[2] = 0
      return ['Lost', units]
    } 
    if (units[3] + units[4] <= 0) {
      units[5] = 0
      // console.log(units)
      return ['Win', units]
    } 
  }

  // See if there is already a win condition.
  checkForWin()

  const getCombatStrength = side => {
    if (side === 'attack') {
        let attStrength = units[0] + units[1]
        return Math.min(attStrength, 5)
    } else if (side === 'defend') {
        let defStrength = units[3] + units[4]
        return Math.min(defStrength, 5)
    }
  }

  const handleDamage = (units, damage) => {

    if (damage === 0) return units
  
    let reg = units[0]
    let elite = units[1]
  
    // reduce regular whilst over 5 regulars
    while (damage > 0 && reg > 5) {
      damage--
      reg--
    }
  
    // reduce elites whilst there are elites
    while (damage > 0 && elite > 0) {
      if (damage > 2) {
        elite--
        damage-=2
      } else {
        elite--
        reg++
        damage--
      }
    }
    // reduce remaining regulars
    if (damage > 0) {
      reg -= damage
      damage = 0
    }
  
    let newUnits = [Math.max(reg, 0), elite]

    return newUnits
  }

  const areBothSidesAlive = () => {
    let result = true
    if (units[0] + units[1] <= 0) result = false
    if (units[3] + units[4] <= 0) result = false
    return result
  }

  const oneRoundOfCombat = (hitOn=5) => {
    let attCombatStrength = getCombatStrength('attack')
    let attUnitDamage = rollXDiceHitOn(attCombatStrength, hitOn)
    let attLeadersRoll = Math.min(units[2], (attCombatStrength - attUnitDamage))
    let attLeaderDamage = rollXDiceHitOn(attLeadersRoll, hitOn)
    let attTotalDamage = attUnitDamage + attLeaderDamage

    let defCombatStrength = getCombatStrength('defend')
    let defUnitDamage = rollXDiceHitOn(defCombatStrength, 5)
    let defLeadersRoll = Math.min(units[5], (defCombatStrength - defUnitDamage))
    let defLeaderDamage = rollXDiceHitOn(defLeadersRoll, 5)
    let defTotalDamage = defUnitDamage + defLeaderDamage

    let attUnits = handleDamage([units[0], units[1]], defTotalDamage)
    let defUnits = handleDamage([units[3], units[4]], attTotalDamage)

    units = [attUnits, units[2], defUnits, units[5]].flat()
  }
    
  if (terrain === 'field') {
    do {
      oneRoundOfCombat()
    } while (areBothSidesAlive())

  } else if (terrain === 'fort') {
      oneRoundOfCombat(6)
      while (areBothSidesAlive()){
        oneRoundOfCombat()
      }

  } else if (terrain === 'strong') {
      oneRoundOfCombat(6)
      while (areBothSidesAlive() && units[1] > 0) {
        units[1]--
        units[0]++
        oneRoundOfCombat(6)
      }
      if (units[1] === 0) return ['No elites', units]
  }

  return checkForWin()
}

export default runSimulation