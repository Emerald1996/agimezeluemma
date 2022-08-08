import React, { Component } from 'react'
import ProductListItem from './ProductListItem';
import "../Styles/ProductList.css"

export class ProductList extends Component {
  render() {
    const products = this.props.products;
    const categoryName = this.props.category;
    return (
      <div>
        <ul className='product_list'>
        {products.map(product => (
          <ProductListItem
            key={product.id}
            product={product}
            category={categoryName || product.category}
          />
        ))}
      </ul>
      </div>
      
    )
  }
}

export default ProductList