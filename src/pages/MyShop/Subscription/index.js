import React,{useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import {Row,Col,Card,Container,Button} from 'react-bootstrap';
import useGetSubscription from '../../../hooks/useGetSubscription';
import useGetUserFromStorage from '../../../hooks/useGetUserFromStorage';
import * as S from './style';
import {Subscription as Sub } from '../../../services/Subscription';
export default function Subscription(){
    const [sub,setSub] = useState(null);
    const {user} = useGetUserFromStorage()
   
    useEffect(()=>{
        getSubs();
    },[user,setSub])

    const getSubs = async()=>{
        const response = await Sub.getSubscriptionById(user?.subscription_id);
        console.log(response);
        if(response.data.status == 1){
            setSub(response.data.data);
        }else{
            setSub(null);
        }
    }


    return(
        <Sidebar>
            <h3>My Subscription</h3>
            <S.MainView>
                {user?.subscription_id !== "0" ? (
                    <Card>
                        <Card.Body>
                            <Card.Title>My Subscription</Card.Title>
                            {sub?.subscriptionName}
                        </Card.Body>
                    </Card>
                ):(
                    <Button onClick={()=>window.location.href="/choosesubscription"}>Subscribe Now</Button>
                )}
            </S.MainView>
        </Sidebar>
    );
}