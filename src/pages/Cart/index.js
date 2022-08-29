import React,{useEffect, useState} from 'react'
import { Container, Form,Stack,Image,Row,Col,Button } from 'react-bootstrap';
import { Navigation, SizeBox, TextInput } from '../../components';
import useGetCartItems from '../../hooks/useActiveItem';
import { BASE_URL,  } from '../../services/ApiClient';
import { Carts } from '../../services/Cart';
import { getItem, KEY } from '../../utils/storage';
import IconButton from '@mui/material/IconButton';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
export default function Cart(){
    const [item,setItem] = useState([]);    
    const [isHalf,setHalf] = useState(0);

    useEffect(()=>{
        getCart();
    },[])

    const getCart = async()=>{
        const user = await getItem(KEY.ACCOUNT)
        const resp = await Carts.mycart(user?.user_id);

        if(resp.data.status == 1){
            setItem(resp.data.data);
        }else{
            setItem([]);
        }
    }

    const displayTotal = () =>{
        let total = 0;
        const activeItem = item.filter(x=>x.item_status === "1");
        
        activeItem.forEach(val=>{
            total += parseFloat(val.totalAmount);
        })
        
        return total;
    }

    async function updateStatus(cart_id,status){
        const payload = {
            cart_id:cart_id,
            status:status,
        }

        const response = await Carts.updateStatus(payload);
    
        if(response.data.status == 1){
            getCart();
        }
    }

    async function increment(cart_id){
        const payload = {
            cart_id
        }
        const response = await Carts.increment(payload);

        if(response.data.status == 1){
            getCart();
        }
    }

    async function decrement(cart_id){
        const payload = {
            cart_id
        }
        const response = await Carts.decrement(payload);

        if(response.data.status == 1){
            getCart();
        }
    }

    function handleCheckout(){
        window.location.href="/checkout";
    }

    return(
        <>
        <Navigation/>
        <SizeBox height={20}/>
    
        <Container>
        <h4>My Cart</h4>
        <SizeBox height={20}/>
            {item.map((val)=>(
              <>
              <Row>
                <Col sm={2}>
 
                <Form.Check onClick={()=>updateStatus(val.cart_id,val.item_status)} checked={val.item_status === '1'}/>
                
                </Col>
                
                <Col>
                    <Image src={BASE_URL+val.productImage} width={100} height={100} />
                </Col>
                <Col>
                    <h5 key={val?.shop_id}>{val.productName}</h5>
               </Col>
                <Col>
                    <Stack direction="horizontal">
                        <IconButton onClick={()=>increment(val.cart_id)}>
                            <ControlPointIcon/>
                        </IconButton>         
                        
                        <p>{val.noItem}</p>
                    
                        <IconButton onClick={()=>decrement(val.cart_id)}>
                            <RemoveCircleOutlineIcon/>
                    </IconButton>
                    
                    </Stack>
                </Col>            
                <Col>
                    <p>{val.totalAmount}</p>
                </Col>
              </Row>
              <SizeBox height={20}/>
              </>
            ))}
            <h3 style={{textAlign:'right'}}>Total{" "+Number(displayTotal()).toFixed(2)}</h3>
            <Button onClick={handleCheckout}>Checkout</Button>
        </Container>
        </>
    );
}