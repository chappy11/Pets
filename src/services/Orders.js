import axios from "axios"
import { OrderApi } from "./ApiClient"

export const Orders ={
    checkout:async(payload)=>{
        const headers ={
            "Content-Type":'text/plain'
        }
        const data = await axios.post(OrderApi('createorder'),payload,{headers});

        return data;
    }
}
