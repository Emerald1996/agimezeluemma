import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addToCart } from '../Redux/cartSlice'


export class ProductChoice extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      product: {
        attributes: {},
      }
    }
  }

  selectAttr = () => {
      const product = {
        name: this.props.data.name,
        prices: this.props.data.prices,
        image: this.props.data.gallery[0],
        brand: this.props.data.brand,
        cartQty: 1,
        attributes: {}
      }
      
      this.props.data.attributes.forEach(attribute => {
        product.attributes[attribute.name] = ''
      });
      
      this.setState({
        product: {
          attributes: product
        }
      })
    }
    
    componentDidMount(){
      document.title = 'product || add to cart'
      this.selectAttr()
    }

    add(e,product){
      e.preventDefault()
      this.props.addToCart(product)
      this.handleChoice()
    }
    
    handleChoice = (attributeName, itemID) => {
      this.setState({
        product: {
          ...this.state.product,
          
          attributes: {
            ...this.state.product.attributes,
            [attributeName]: itemID
            
          }
        }
      })
     
      console.log(this.state.product.attributes)
    }

  render() {
    const product = this.props
    // console.log(product)

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

    if(!this.props.data.inStock){
      return <h3 style={noStock}> Out of stock 😥</h3>
    }

    return (
      <>
      {this.props.data.attributes.map((attribute)=>{ 
        return (
          <div key={attribute.name} id={attribute.name} className="attribute_names">

            <div >
              <h4>{attribute.name}: <span><b>{this.state.product.attributes[attribute.name] || "Select an option"}</b> </span></h4>  
            </div>

            {attribute.items.map((item)=>{
              return (
                <button
                onClick={() => this.handleChoice(attribute.name, item.id )}
                key={item.id} 
                style={{backgroundColor: item.value, border: 'none', padding: '8px 15px' , margin: '3px' , cursor: 'pointer'}}
                
                >
                  {attribute.type === "swatch" ? "" : item.displayValue}
                </button>
              )
            })}
          </div>

        )
      })}
      
      {   
        !Object.values(this.state.product.attributes).some(choice=> choice === "") &&  
        (<button onClick={(e) => this.add(e,(product))} style={addToCartBtn} 
        selected={this.state.product.attributes}
        >ADD TO CART</button>)
      }
        
   
      </>
    )
  }
}


const mapDispatchToProps = ()=>{
        return (
          {addToCart}
          )
        }

export default connect(null, mapDispatchToProps())(ProductChoice)