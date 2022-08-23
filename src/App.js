import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./Pages/CartPage";
import Navbar from "./Components/Navbar";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import Error from "./Components/Error";
import Loading from "./Components/Loading";
import CategoryPage from "./Pages/CategoryPage";
import Home from "./Pages/Home";
import {  totalSum } from "./Redux/cartSlice";
import { connect } from "react-redux";

class App extends Component {

  render() {
 
      return (
      <div>
        <>
           <Query query={GET_DATA}>
            {({error , loading , data}) => {
              if(error) return <Error />
              if(loading) return <Loading />
              if(data) 

              return (
                <>
                  <Router>
                    <Navbar categories={data.categories} />

                    <Routes>
                      <Route path="/" element={<Home />} />
                      
                      {data.categories.map((category) => {
                        return (
                          <Route
                            path={`${category.name}`}
                            element={
                              <CategoryPage
                                key={category.id}
                                products={category.products}
                                name={category.name}
                              />
                            }
                          />
                        );
                      })}
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="*" element={<Error />} />
                    </Routes>
                  </Router>
                </>
              );
            }}
          </Query>
         </>
      </div>
 
 );
  }
}



const GET_DATA = gql`
  {
    categories {
      name
      products {
        id
        name
        brand
        inStock
        gallery
        description
        prices {
          amount
          currency {
            symbol
            label
          }
        }
        attributes {
          type
          name
          items {
            value
            displayValue
            id
          }
        }
      }
    }
  }
`;


const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = () => {
  return {
    totalSum,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
