import { useEffect,useState } from 'react';
import {Product} from '../services/Product';

export default function useGetAllProducts(){
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])
    const getProducts = async()=>{
        const response = await  Product.displayProducts();

        if(response.data.status == 1){
            setProducts(response.data.data);
        }else{
            setProducts([]);
        }
    }
    return{
        products,
    }
}