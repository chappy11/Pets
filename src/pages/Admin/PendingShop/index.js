import React,{useEffect, useState} from 'react';
import Sidebar from "../component/Sidebar";
import {Container,Table,Button} from 'react-bootstrap';
import { Shop } from "../../../services/Shop";
import {User} from '../../../services/User';
import swal from 'sweetalert';
export default function PendingShop(){
    const [shop,setShop] = useState([]);

    useEffect(()=>{
        getShop();
    },[])

    const getShop = async()=>{
        const res = await Shop.getpendingshop();

        if(res.data.status == 1){
            setShop(res.data.data);
        }else{
            setShop([]);
        }
    }
    
    const handleApproved = async(user_id) =>{
        const payload = {
            user_id:user_id,
            status:1
        }
            const res = await User.updateStatus(payload)
    
            if(res.data.status == 1){
                getShop();
                swal("Succcess","Successfully Approved",'success');
            }else{
                swal("Error","Something went wrong please try again later",'error');
            }
       }
    return(
        <Sidebar>
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <td>User ID</td>
                            <td>Shop Name</td>
                            <td>Shop Description</td>
                            <td>Shop Email</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {shop.map((val,i)=>(
                            <tr>
                                <td>{val.user_id}</td>
                                <td>{val.shopName}</td>
                                <td>{val.shopDescription}</td>
                                <td>{val.shopEmail}</td>
                                <td><Button onClick={()=>handleApproved(val.user_id)}>Approved</Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </Sidebar>
    )
}