import React from 'react';

import { SideDiv } from './style'

const Settings = ({ handleSimulations, updateState, ...config }) => {

    const handleClick = () => {
        handleSimulations()
    }
    return (
        <form>
            <label>
                Playing as the:
                <select name='side'>
                    <option value="good">Free People</option>
                    <option value="bad">Shadow</option>
                </select>
            </label>
            <br />
            <br />
            <label>
                You are:
                <select name='stance'>
                    <option value="attack">Attacking</option>
                    <option value="defend">Defending</option>
                </select>
            </label>
            <br />
            <br />
            <label>
                Against a:
                <select terrain='territory' onChange={updateState}>
                    <option value="field">Field</option>
                    <option value="fort">Fortification</option>
                    <option value="strong">Stronghold</option>
                </select>
            </label>

            <SideDiv> 
                Regulars:
                <input min='0' max='10' name='attackReg' type='number' value={config.attackReg} onChange={updateState}/>
                Elites:
                <input min='0' max='10' name='attackElite' type='number' value={config.attackElite} onChange={updateState}/>
                Leadership:
                <input min='0' max='5' name='attackLeader' type='number' value={config.attackLeader} onChange={updateState}/>
            </SideDiv>

            <p>VS</p>

            <SideDiv> 
                Regulars:
                <input min='0' max='10' name='defendReg' type='number' value={config.defendReg} onChange={updateState}/>
                Elites:
                <input min='0' max='10' name='defendElite' type='number' value={config.defendElite} onChange={updateState}/>
                Leadership:
                <input min='0' max='5' name='defendLeader' type='number' value={config.defendLeader} onChange={updateState}/>
            </SideDiv>

            <br />

            <p>Simulations to run:</p>
            <input min='100' max='10000' step='100' name='simulations' type='number' value={config.simulations} onChange={updateState}/>
            
            <br />
            <br />

            <button type="button" onClick={() => handleClick()}>Calculate</button>
        </form>
  );
}

export default Settings;
