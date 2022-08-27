import { useEffect, useState } from "react";
import { getItem, KEY } from "../utils/storage";

export default function useGetUserFromStorage(){
    const [user,setUser] = useState(null);

    useEffect(()=>{
        getUser();
    },[])

    const getUser = async()=>{
        const data = await getItem(KEY.ACCOUNT);
        console.log(data);
        if(data){
            setUser(data);
            return;
        }

        return null;

    }
    return{
        user
    };
}