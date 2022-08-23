import React, { Component } from 'react'
import ProductDescriptionPage from '../Pages/ProductDescriptionPage';
import "../Styles/ProductListItem.css"



export class ProductListItem extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       selected: null
    }
  }
  render() {
    const product = this.props.product;
    

    const availabilityStock = product.inStock ? "item_list" : 'no_item'
    const noStock = !product.inStock ? 'no_stock': 'item_list'

    
    
    return (
      <>
      
        <div className={availabilityStock}>
          <div className='products' onClick={(e)=>{ this.setState({selected: product.id})}}>
            <img
                src={product.gallery[0]}
                title={product.name}
                alt={product.name}
                width="350px"
                height="200px"
              />
              <hr />
            {!product.inStock && (
              <p className={noStock}>Out of stock</p>
            )}
            <div className='product_tag'>
              <h3>{product.name}</h3>
              <p>{product.prices[0].currency.symbol}{product.prices[0].amount}</p>
            </div>
          </div>
         </div>
        <div>
        </div>
          {this.state.selected && 
           <ProductDescriptionPage productId ={this.state.selected} data={this.props.product} id={product.id} />}
      </>

    )
  }
}



export default ProductListItem

