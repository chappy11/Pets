import Sidebar from "../components/Sidebar";
import {Table,Row,Col,Button,ButtonGroup} from 'react-bootstrap'
import { SizeBox } from "../../../components";
import { getItem, KEY } from "../../../utils/storage";
import {Product as ProductAPi} from '../../../services/Product';
import {BASE_URL} from '../../../services/ApiClient';
import { useEffect, useState } from "react";
import * as S from './style';

export default function Product(){
    const [products,setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts = async() =>{
        const shopData = await getItem(KEY.ACCOUNT);
        
        const response = await ProductAPi.getProductByShopId(shopData.shop_id);

        if(response.data.status == '1'){
            setProducts(response.data.data);
        }
    }

    function handleAddProduct(){
        window.location.href="/addproduct";
    }
    return(
        <Sidebar>
            <SizeBox height={20}/>
            <Row>
                <Col>
                    <h3>Products</h3>
                </Col>
                <Col className="justify-content-end align-items-end">
                    <Button className="float-right" onClick={handleAddProduct}>Add New Product</Button>
                </Col>
            </Row>
            <Table responsive>
                <thead>
                    <tr>
                        <th>
                            Image
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Description
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
                    </tr>
                </thead>
                <tbody>
                    
                    {products.map((val,i)=>(
                        <tr>
                            <td><img src={BASE_URL+""+val.productImage} alt="product" style={{width:100,height:100}}/></td>
                            <td>{val.productName}</td>
                            <td>{val.productDescription}</td>
                            <td>{val.stock}</td>
                            <td>{val.price}</td>
                            <td>
                                <ButtonGroup className="me-2">
                                    <Button variant='info'>Update</Button>
                                    <Button variant='danger'>Delete</Button>
                                </ButtonGroup>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Sidebar>
    );
}