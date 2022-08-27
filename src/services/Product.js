import { ItemApi } from "./ApiClient";
import axios from 'axios';


export const Product = {
    getProductByShopId:async(shop_id) =>{
        const data = await axios.get(ItemApi(`myproducts/${shop_id}`));
        
        return data;
    },
    addProduct:async(formdata) =>{
        const headers = {
            'Content-Type':'multipart/form-data'
          }

          const data = await axios.post(ItemApi(`createproduct`),formdata,{headers});

          return data;
    }
}