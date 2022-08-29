import {useEffect, useState} from 'react';
import { Carts } from '../services/Cart';
import { getItem, KEY } from '../utils/storage';


export default function useActiveItem(){
    const [item,setItem] = useState([])
    
  
    useEffect(()=>{
        getCart();
    },[])
  
    const getCart = async()=>{
        const user = await getItem(KEY.ACCOUNT)
        const resp = await Carts.activecart(user?.user_id);
        console.log(resp);
        if(resp.data.status == 1){
            setItem(resp.data.data);
        }else{
            setItem([]);
        }
    }

    return{
        item,
    }
}