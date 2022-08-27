import { CategoryApi } from "./ApiClient";
import axios from 'axios';

export const Category = {
    getCategory:async()=>{
        const data = await axios.get(CategoryApi("getcategories")); 

        return data;
    }
}