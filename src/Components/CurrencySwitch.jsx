import React, { Component } from 'react'

export class CurrencySwitch extends Component {
  render() {
    return (
      <div>
        <select >
            <option value="$ USD">$ USD</option>
            <option value="£ GBP">£ GBP</option>
            <option value="A$ AUD">A$ AUD</option>
            <option value="¥ JPY">¥ JPY</option>
            <option value="₽ RUB">₽ RUB</option>
            
        </select>
      </div>
    )
  }
}

export default CurrencySwitch