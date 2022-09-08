import Sidebar from "../components/Sidebar";
import {Table,Row,Col,Button,ButtonGroup, Modal, Form} from 'react-bootstrap'
import { SizeBox, TextInput } from "../../../components";
import { getItem, KEY } from "../../../utils/storage";
import {Product as ProductAPi} from '../../../services/Product';
import {BASE_URL} from '../../../services/ApiClient';
import { useCallback, useEffect, useMemo, useState } from "react";
import * as S from './style';
import useModal from "../../../hooks/useModal";
import swal from "sweetalert";


export const Content = (props) =>{
    const displayError = useMemo(()=>{
        return props.error ? (
            <Form.Text className="text-danger">
                 {props.error}
             </Form.Text>
        ):null
    },[props])
    return(
    <>
        <TextInput type="number" name="" label="test" onChange={props.onChange}/>
        {displayError}
    </>    
    )
}

export default function Product(){
    const [products,setProducts] = useState([]);
    const [currentItem,setCurrentItem] = useState(null);
    const [error,setError] = useState(null);
    const [noItems,setNoItems] = useState(0);

    useEffect(()=>{
        setError(null);
    },[noItems])

    useEffect(()=>{
        getProducts();
    },[])

    const handleSubmit = () =>{
        if(noItems < 1){
            setError('Please specify number of items');
            return;
        }   
    }

    const getProducts = async() =>{
        const shopData = await getItem(KEY.ACCOUNT);
        
        const response = await ProductAPi.getProductByShopId(shopData.shop_id);

        if(response.data.status == '1'){
            setProducts(response.data.data);
        }
    }

    const onChange = (e) =>{
        setNoItems(e.target.value);
    }
   
    function handleAddProduct(){
        window.location.href="/addproduct";
    }

    const itemAvailability = useCallback((stock)=>{
        if(stock < 0){
            return <p style={{color:'red'}}>Sold Out</p>;
        }

        return <p style={{color:'green'}}>Available</p>;
    },[])

    function handleModal(item,updateType){
        setCurrentItem({...item,updateType});
        setIsOpen(true)
    }

    console.log(error);
    const {isOpen,setIsOpen,displayModal} = useModal({content:<Content error={error} onChange={onChange}/>,handleSubmit,});
    return(
        <Sidebar>
            <SizeBox height={20}/>
            {displayModal}
            <Button onClick={()=>setIsOpen(true)}>Open Mdoal</Button>
            <Row>
                <Col>
                    <h3>Products</h3>
                </Col>
                <Col className="justify-content-end align-items-end">
                    <Button className="float-right" onClick={handleAddProduct}>Add New Product</Button>
                </Col>
            </Row>
            <SizeBox height={20}/>
            <Table responsive={'md'} bordered={true}>
                <thead>
                    <tr>
                        <th>
                            Date Created
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Name
                        </th>
                       
                        <th>
                            Quantity
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Status
                        </th>
                        <th>
                            Date Updated
                        </th>
                        <th>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                    {products.map((val,i)=>(
                        <tr>
                            <td>{val.p_createdAt}</td>
                            <td><img src={BASE_URL+""+val.productImage} alt="product" style={{width:50,height:50}}/></td>
                            <td>{val.productName}</td>
                            <td>{val.stock} {val.unit}</td>
                            <td>{val.price}</td>
                            <td >{itemAvailability(val.stock)}</td>
                            <td>{val.p_updateAt}</td>
                            <td>
                                <ButtonGroup className="me-2">
                                    <Button variant='success' size={'sm'} onClick={()=>handleModal(val,"in")}>Stock In </Button>
                                    <Button variant='danger' size={'sm'}>Stock out</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sidebar>
    );
}