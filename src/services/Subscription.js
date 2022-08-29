import axios from 'axios';
import { BASE_URL, SubscriptionApi } from './ApiClient';

export const Subscription = {
    getSubscription:async()=>{
        const data =  await axios.get(SubscriptionApi('getsubscriptions'));
        
        return data;
    },
    getSubscriptionById:async(sub_id)=>{
        const data = await axios.get(SubscriptionApi(`getsubscription/${sub_id}`));

        return data;
    }   
}