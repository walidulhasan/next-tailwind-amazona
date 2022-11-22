
import Layout from "../components/Layout";
import React from "react"
import axios from 'axios';
import { useEffect, useState } from "react";
import ProductItem from "../components/ProductItem";
export default function Home() {

  const [product,setProduct]=useState([]);
  async function getProduct() {
    try {
      const response = await axios.get('https://localhost:7266/api/Product');
      setProduct(response.data)
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProduct();
  },[]);
  return (
      <Layout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {product.map((products)=>(
            <ProductItem product={products} key={products.productId}></ProductItem>
          ))}
        </div>
      </Layout>
  )
}
