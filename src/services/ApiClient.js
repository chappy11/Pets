import axios from "axios";

export const BASE_URL = 'http://localhost/petsociety/'

const headers = {
    "Content-Type":'text/plain'
}

export const  UserApi = (method) =>{
    return `${BASE_URL}user/${method}`;
}


export const ItemApi = (method) =>{
    return `${BASE_URL}item/${method}`;
} 


export const CategoryApi = (method) =>{
    return `${BASE_URL}category/${method}`
}

export const ShopApi = (method) =>{
    return `${BASE_URL}shop/${method}`;
}

export const SubscriptionApi = (method) =>{
    return `${BASE_URL}subscription/${method}`
}

export const CartApi = (method) =>{
    return `${BASE_URL}cart/${method}`;
}

export const OrderApi = (method) =>{
    return `${BASE_URL}userorder/${method}`;
}