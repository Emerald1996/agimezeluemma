import React, { Component } from 'react'
import ProductChoice from '../Components/ProductChoice'
import "../Styles/ProductDescriptionPage.css"
import { addToCart } from '../Redux/cartSlice'
import { connect } from "react-redux"


export class ProductDescriptionPage extends Component {

   constructor(props) {
   super(props)
 
   this.state = {
      imageArrIndex: 0,
      hideModal: false
   }
 }

 imageOnclick = (index) =>{
    this.setState({imageArrIndex: index})
  }

  hideModal = () => {
    this.setState({hideModal: !this.state.hideModal})
  }
 
  
  render() {
  const product = this.props

   const addToCartBtn = {
      width: '100%',
      padding: '18px',
      marginTop: '20px',
      backgroundColor: 'rgba(19, 238, 19,0.9)',
      borderRadius: '2rem',
      color: 'white',
      cursor: 'pointer',
      border: 'none'
    }

    const noStock = {
      color: 'rgb(255, 0, 0)',
      fontSize: '30px',
      textTransform: 'uppercase'
    }
  
     return (
          <>
          
            
            {!this.state.hideModal &&<div className="outer-modal">
              <div className="product_desc_page">
              <h1 onClick={()=>this.hideModal()} className="modalBtn">❌</h1>
              <div className='product_image'>
                <img src={product.data.gallery[this.state.imageArrIndex]} alt={product.data.name} />
                
                <div className='small_image'>
                {product.data.gallery.map((img, index)=>{
                  return <img src={img} key={img}  alt={img}  onClick={()=>this.imageOnclick(index)}/>
                })}
                </div>
              </div>

              <div className="product_info">
                  <h1>{product.data.name}</h1>
                  <h2>Price: ${product.data.prices[0].amount}</h2>
                  <h2>Brand: {product.data.brand}</h2>
                  <ProductChoice data={product.data} key={product.id}/>

                   {!this.props.data.inStock ? 
      
                    (<h3 style={noStock}> Out of stock 😥</h3>) :  
                    (<button style={addToCartBtn} onClick={ () => this.props.addToCart((product)) }>ADD TO CART </button>)
                  }
                  
              </div>

            </div>
            
            </div>}
            
         

          </>
         )
  }
}



const mapDispatchToProps = ()=>{
        return (
          {addToCart}
        )
      }

export default connect(null, mapDispatchToProps())(ProductDescriptionPage)