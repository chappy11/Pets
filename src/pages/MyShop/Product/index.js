import Sidebar from "../components/Sidebar";
import {Table,Row,Col,Button,ButtonGroup} from 'react-bootstrap'
import { SizeBox } from "../../../components";
import { getItem, KEY } from "../../../utils/storage";
import {Product as ProductAPi} from '../../../services/Product';
import {BASE_URL} from '../../../services/ApiClient';
import { useCallback, useEffect, useMemo, useState } from "react";
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

    const itemAvailability = useCallback((stock)=>{
        if(stock < 0){
            return 'Sold Out';
        }

        return 'Available';
    },[])
    
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
            <Table responsive={'md'}>
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
                            <td color="green">{itemAvailability(val.stock)}</td>
                            <td>{val.p_updateAt}</td>
                            <td>
                                <ButtonGroup className="me-2">
                                    <Button variant='primary'>View</Button>
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