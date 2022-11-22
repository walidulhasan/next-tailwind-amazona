import { useRouter } from "next/router";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import Link from "next/link";
import { Store } from "../../utils/Store";
export default function ProductScreen() {
  const {state,dispatch}=useContext(Store)
  const { query } = useRouter();
  const { slug } = query;
  const [product, setProduct] = useState([]);
  async function getProduct() {
    try {
      const response = await axios.get("https://localhost:7266/api/Product");
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProduct();
  }, []);
  const productData = product.find((x) => x.slug === slug);
  if (!productData) {
    return <div>Product NOt Found</div>;
  }
  const addToCartHandler=()=>{
    const existItem=state.cart.cartItems.find((x)=>x.slug===productData.slug);
    const quantity=existItem?existItem.quantity+1:1;
    if (productData.stock<quantity) {
        alert('Sorry, Product is out of stock')
        return;
    }
    dispatch({type:'CART_ADD_ITEM',payload:{...productData,quantity}});
  }
  return (
    <Layout title={productData.name}>
      <div className="py-2">
        <Link href="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Back to Product</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={productData.imageUrl}
            alt={productData.name}
            width={640}
            height={640}
          ></Image>
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{productData.name}</h1>
            </li>
            <li>Category: {productData.categoryId}</li>
            <li>Stock: {productData.stock}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>${productData.price}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{productData.stock > 0 ? <b className="text-green-900">In Stock</b> : <b className="text-red-600">Unavailable</b>}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCartHandler}>Add to Cart</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
