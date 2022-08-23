import React, { Component } from 'react'
import { addToCart , deleteCartItem, decreaseCartQty} from '../Redux/cartSlice'
import { connect } from 'react-redux'
import "../Styles/MiniCart.css"
import { Link } from 'react-router-dom'

export class MiniCart extends Component {
  
  render() {
    const {cart,currentCurrency} = this.props

    const totalAmount = cart.cartItems.reduce((total, cartItem) => {
			cartItem.data.prices.forEach(({ currency, amount }) => {
				if (currency.symbol === currentCurrency) {
					total = total + amount * cartItem.cartQty;
				}
			});
			return total;
		}, 0);
 
   
    return (
      <>
      <div className="toggle-cart-body" >

        <div className='toggle-cart'>
          
            <h1 className="mini-cart-heading">My cart: {`${cart.cartItems.length}`} {cart.cartItems.length > 1 ? 'items':'item'}</h1>

          <div className="mini-cart-page">
            {cart.cartItems.map((cartItem) => {
              
              return <>
              <div className="mini-cart-info">
                <h3>{cartItem.data.name}</h3>
                <p>{cartItem.data.brand}</p>
                <h4>{cartItem.data.prices[0].currency.symbol}{ ( cartItem.data.prices[0].amount * cartItem.cartQty).toFixed(2)}</h4>

                <div className="mini-cart-swatches">
                  {/* {Object.values(cartItem.data.attributes).map((attribute) => {
                    return (
                      <span key={attribute}>
                        {attribute.name}: <b>{attribute.name}</b>  {" "}
                      </span>
                    );
                  })} */}
                </div>
              </div>


                <div className="mini-cart-item-qty">
                  <button onClick={() => this.props.addToCart((cartItem))}>+</button>
                    <h5>{cartItem.cartQty}</h5>
                  <button onClick={() => this.props.decreaseCartQty((cartItem))}>-</button>
                </div>

                <div className="mini-cart-image">
                  <div className="mini-cart-image-display">
                      <img src={cartItem.data.gallery} alt={cartItem.data.name} 
                      className="mini-cart-images" />
                    </div>
                </div>

              </>
            })}
          </div>
            
          <div className="mini-cart-total">
            <h3>Total:</h3>
            <h3>{currentCurrency} {totalAmount.toFixed(2)}</h3>
          </div>

          <div className="mini-cart-btn">
              <button>
                <Link to="/cart" className='cart-link'>
                  view cart
                </Link>
              </button>
            <button>
               <Link to="/checkout" className='cart-link'>
                  check out
                </Link>
            </button>
          </div>
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    currentCurrency: state.cart.currentCurrency,
  }
}

const mapDispatchToProps = () => {
  return {
    addToCart,
    deleteCartItem,
    decreaseCartQty,
  }
}

export default connect(mapStateToProps , mapDispatchToProps())(MiniCart)