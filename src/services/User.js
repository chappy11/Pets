import { UserApi } from "./ApiClient";
import axios from 'axios';

export const User = {
    login:async(payload)=>{
        const headers = {
            "Content-Type":"text/plain"
        }
        const data =  await axios.post(UserApi('login'),payload,{headers});

        return data;
    },
    register:async(payload)=>{
        const headers = {
            'Content-Type':'multipart/form-data'
          }
        
          const data = await axios.post(UserApi('signupcustomer'),payload,{headers});

          return data;
    },
    createshop:async(payload)=>{
        const headers = {
            'Content-Type':'multipart/form-data'
          }
        
          const data = await axios.post(UserApi('createshop'),payload,{headers});

          return data;
    },

    getpendinguser:async()=>{
        const data = await axios.get(UserApi('getpendingcustomer'));
        
        return data;
    },

    updateStatus:async(payload)=>{
        const headers = {
            "Content-Type":"text/plain"
        }
        const data = await axios.post(UserApi('updatestatus'),payload,{headers});
        
        return data;
    }
}