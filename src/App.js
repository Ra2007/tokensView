import React, { Component } from 'react';
import {erc20abi} from './erc20abi';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'enter account adress'
     }
  }

 viewTokens(event) {
  			event.preventDefault();
        let results = '';
        const accountAddress = this.state.value;
        const contractAdress = '0xa74476443119A942dE498590Fe1f2454d7D4aC0d';
        const simpleContract = window.web3.eth.contract(erc20abi);
        const contractInterface = simpleContract.at(contractAdress);
        contractInterface.totalSupply.call(function (err, totalSupply) {
  				contractInterface.decimals.call(function (err, decimals) {
  					contractInterface.name.call(function (err, name) {
  						contractInterface.balanceOf.call(accountAddress, function (err, balance) {

  							const percentOwned = balance.div(totalSupply).mul(100);
  							const divisor = new window.web3.BigNumber(10).toPower(decimals);
  							totalSupply = totalSupply.div(divisor);
  							balance = balance.div(divisor);
              	results = '<b>Token:</b> ' + name + '<br /><br />';
  							results += 'Account: ' + accountAddress + '<br />Quantity: ' + balance.round(5) + '<br />Percentage: ' + percentOwned.round(5) + '%';

                document.getElementById('tokens').innerHTML = results;

  						});
  					});
  				});
  			});
    }

  hahdleChange(event) {
    this.setState({value: event.target.value})
  }

  render() {
    return (<div>
      <input type="text" value={this.state.value} onChange={this.hahdleChange.bind(this)} /><br />
      <button onClick={this.viewTokens.bind(this)}>Tokens</button>
      <div id="tokens" ></div>
      </div>
    );
  }
}
export default App;
