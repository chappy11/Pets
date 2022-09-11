import axios from 'axios';
import {CartApi} from './ApiClient'
export const Carts ={
    
    addToCart:async(payload)=>{
        const headers ={
            "Content-Type":'text/plain'
        }
        const data = await axios.post(CartApi('addtocart'),payload,{headers});
        console.log(data);
        return data;
    },

    mycart:async(user_id)=>{
        
        const data = await axios.get(CartApi(`mycart/${user_id}`));

        return data;
    },

    updateStatus:async(payload)=>{
        const headers={
            "Content-Type":"text/plain"
        }
        const data = await axios.post(CartApi('updateItemStatus'),payload,{headers});

        return data;
    },

    increment:async(payload)=>{
        const headers={
            "Content-Type":"text/plain"
        }
        const data = await axios.post(CartApi('increament'),payload,{headers});

        return data;
    },

    decrement:async(payload)=>{
        const headers={
            "Content-Type":"text/plain"
        }
        const data = await axios.post(CartApi('decreament'),payload,{headers});

        return data;
    },

    activecart:async(user_id)=>{
        const resp = await axios.get(CartApi(`activeItem/${user_id}`));

        return resp;
    }
}