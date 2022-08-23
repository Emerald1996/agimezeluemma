import React, { Component } from 'react'
import { connect } from 'react-redux'
import "../Styles/CartPage.css"
import { Link } from 'react-router-dom'
import { deleteCartItem , addToCart , decreaseCartQty , totalSum } from '../Redux/cartSlice'

export class CartPage extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       imageIndex: 0,
        
    }
  }


   componentDidMount() {
    document.title = "cart"

  }


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

  

    console.log('cart',cart)
    return (
      <div  className="cart-items-container">
        
        <>
       {cart.cartItems.length === 0 ?
        (
          <Link to="/all" className='cont-shopping'>
          <h1>Your cart is empty</h1>
          <h4>⬅Click To Start Shopping</h4>
        </Link>) :
       ( <h1 className='cart-update'> {`My Cart: (${cart.cartItems.length})`} {cart.cartItems.length > 1 ? 'items':'item'}</h1>
       
         )
        }

        <hr />

        {cart.cartItems.map((cartItem)=>{
       
          return (
            <div key={cartItem.id} >

         <div className="cart-items">

              <div className="cart-info">
                <h3>{cartItem.data.name}</h3>
                <p>{cartItem.brand}</p>
                <h4>${( cartItem.data.prices[0].amount * cartItem.cartQty).toFixed(2)}</h4>

                <div className="cart-swatches">
                  
                   {Object.values(cartItem.data.attributes).map((attribute) => {
                    return (
                      <span key={attribute}>
                        {attribute.name}: <b>{attribute.items.map((item=>
                          <>
                          <button
                           style={{backgroundColor: item.value, border: 'none', padding: '8px 15px' , margin: '3px' , cursor: 'pointer'}}
                          >
                            {attribute.type === "swatch" ? "" : item.displayValue}
                          </button>
                          </>
                          ))}</b> 
                      </span>
                    );
                  })}
               </div>

               <div className="delete-btn">
                <button onClick={() => this.props.deleteCartItem((cartItem))}>🗑Remove</button>
               </div>

              </div>

              <div className="cart-item-qty">
                <button onClick={() => this.props.addToCart((cartItem))}>+</button>
                <h5>{cartItem.cartQty}</h5>
                <button onClick={() => this.props.decreaseCartQty((cartItem))}>-</button>
              </div>

              <div className="cart-image">
                <img src={cartItem.data.gallery[this.state.imageIndex]} alt={cartItem.data.name} 
                      className="slide-images" />
 
              </div>
            

          </div>
          <hr />
          

          </div>
        )})
        
      }
        </>
        

<div className="sum-up-container">
  <h3>Quantity: <span>{cart.cartItems.length}</span></h3>
  <h3>Total amount= {currentCurrency} {totalAmount.toFixed(2)}</h3>

 
     
  <button className="order">
    Order
  </button>
 </div>
</div>
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
    totalSum
  }
}

export default connect(mapStateToProps , mapDispatchToProps())(CartPage)