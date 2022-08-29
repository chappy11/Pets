import React,{useState,useEffect} from 'react';
import { Container, Row,Col,Image,Button } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { Navigation, SizeBox, TextInput } from '../../components';
import { BASE_URL } from "../../services/ApiClient";
import { Product } from '../../services/Product';
import swal from 'sweetalert'
import useGetUserFromStorage from '../../hooks/useGetUserFromStorage';
import { Carts } from '../../services/Cart';
export default function ViewProduct(){
    const [data,setData] = useState(null);
    const {id} = useParams();
    const [noItems,setNoItems] = useState(1);
    const {user} = useGetUserFromStorage();
    useEffect(()=>{
        getproduct();
    },[])
    
    const getproduct = async()=>{
        const response = await Product.getProductById(id);
        if(response.data.status == 1){
            setData(response.data.data);
        }
        
    }

    async function handleAddToCart(){
        const payload = {
            user_id:user.user_id,
            product_id:data.product_id,
            no_items:parseInt(noItems),
        }

        const res = await Carts.addToCart(payload);
        if(res.data.status == 1){
            swal("Succes","Successfully Added to you Cart",'success');
        }else{
            swal("Oops","Something went wrong",'error')
        }
    }

    return(
        <>
        <Navigation/>
        <Container>
            <SizeBox height={20}/>
            <h3>Product Info</h3>
            <Row>
                <Col style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <Image width={300} height={350}  src={BASE_URL+data?.productImage}/>
                </Col>
                <Col>
                    <h5>{data?.productName}</h5>
                    <p>{data?.productDescription}</p>
                    <Row>
                        <Col>Price</Col>
                        <Col>{data?.price+" / "+data?.unit}</Col>
                    </Row>
                    <Row>
                        <Col>Stock</Col>
                        <Col>{data?.stock+" "}available</Col>
                    </Row>
                    <Row>
                        <Col>Shop Name</Col>
                        <Col>{data?.shopName}</Col>
                    </Row>
                    <SizeBox height={20}/>
                    <TextInput label="Buy" value={noItems} type="number" onChange={(e)=>setNoItems(e.target.value)}/>
                    <SizeBox height={20}/>
                   <Button onClick={handleAddToCart} >Add To Cart</Button>
                </Col>
            </Row>
        </Container>
        </>
    );
}