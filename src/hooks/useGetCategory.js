import { useEffect, useState } from "react";
import { Category } from "../services/Category";

export default function useGetCategory(){
    const [category,setCategory] = useState([]);

    useEffect(()=>{
        getCategoriesList();
    },[])

    const getCategoriesList = async() =>{
        const response = await Category.getCategory();
        if(response.data.status == '1'){
            setCategory(response.data.data);
        }else{
            setCategory([]);
        }
        
    }

    return{
        category
    }

}