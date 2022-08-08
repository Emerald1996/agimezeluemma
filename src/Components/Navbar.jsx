import React, { Component } from 'react'
import Navigation from './Navigation'
import Logo from "../Assets/logo.svg"
import Cart from "../Assets/cart.svg"
import CurrencySwitch from './CurrencySwitch'
import "../Styles/Navbar.css"
import homeLogo from "../Assets/homebutton.svg"



export class Navbar extends Component {
  render() {
    const categoryNames = this.props.categories
    return (
      <div className='navbar'>
        <div className='left-nav'>
            
             <a href="/"> <img src={homeLogo} alt={homeLogo} className="home-btn"/></a>
            
              
            <Navigation categories={ categoryNames} />
        </div>
        <img src={Logo} alt={Logo}/>

        <div className='right-nav'>
            <CurrencySwitch/>
            <img src={Cart} alt={Cart} className='cart'/>
        </div>
      </div>
    )
  }
}

export default Navbar