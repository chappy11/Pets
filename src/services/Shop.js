import { ShopApi } from "./ApiClient";
import axios from 'axios'

export const Shop = {
    getpendingshop:async()=>{
        const data = await axios.get(ShopApi('getpendingshop'));
        return data;
    }
}