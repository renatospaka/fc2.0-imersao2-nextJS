// @flow 
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import * as React from 'react';
import { Product } from '../../models/product';

interface ProductShowProps {
  product: Product
};

const ProductShow: NextPage<ProductShowProps> = (props) => {
  const {product} = props
  const router = useRouter()
  if (router.isFallback) {
    //está associado ao "fallback: true"
    return <div>Carregando...</div>
  }
  return (
    <div>
      {product.name} - {product.price}
    </div>
  );
};

export default ProductShow;

export const getStaticProps: GetStaticProps = async (context) => {
  const {
    params: {id}
  } = context
  
  //const {data} = await axios.get(`http://host.docker.internal:3000/products/${id}`)
  const {data} = await axios.get(`${process.env.API_NEST_URL}/products/${id}`)
  return {
    props: {
      product: data 
    },
    //ISR - Incremental Server Rendering (em segundos)
    revalidate: 20
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: {id: "6"} },
      //{ params: {id: "1"} },
      //{ params: {id: "5"} },
      { params: {id: "3"} },
    ],
    fallback: true
    //if true => catch if though 1 and 5
  }
}