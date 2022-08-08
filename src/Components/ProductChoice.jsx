import React, { Component } from 'react'


export class ProductChoice extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         product: {
            attributes: {}
         },
      }
    }
    productDetails = () => {
      // const product = {
      //   name: this.props.data.name,
      //   prices: this.props.data.prices,
      //   img: this.props.data.gallery[0],
      //   attributes: {},
      //   brand: this.props.data.brand,
      // }

      // this.props.data.attributes.forEach((attribute)=>{
      // return  product.attributes[attribute.name] = ""
      // })

      // this.setState({product: product})
      
    }

    componentDidMount(){
        this.productDetails()
        document.title = 'product || add to cart'
    }

  render() {


    
    return (
      <>
      {this.props.data.attributes.map((attribute)=>{
        return (
          <div key={attribute.name} className="attribute_names">

            <div key={attribute.name}>
              <h4>{attribute.name}: <span>Select {attribute.name} of your choice</span></h4>  
            </div>

            {attribute.items.map((item)=>{
              return (
                <button style={{backgroundColor: item.value, padding: '5px 8px' , margin: '3px' , cursor: 'pointer'}}>
                  {attribute.type === "swatch" ? "" : item.displayValue}
                </button>
              )
            })}
          </div>

        )
      })}
     
   
      </>
    )
  }
}


export default ProductChoice