import { Card, CardGroup,Row,Col,Container,Button,Image } from "react-bootstrap";
import useGetAllProducts from "../../../../hooks/useGetAllProducts";
import { BASE_URL } from "../../../../services/ApiClient";


export default function ProductList(){
    const {products} = useGetAllProducts();
    
    

    return(
        <Container>
        <Row style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            {products.map((val, idx) => (
        
                <Card style={{width:250,margin:10,padding:0,height:300}}>
                <div style={{width:'100%',height:200}}>
                <Image   src={BASE_URL+val.productImage}  style={{width:'100%',height:'150px'}}/>
                </div>
                
                <Card.Body>
                    <Card.Title>{val.productName}</Card.Title>
                    <Card.Subtitle>{val.category_name}</Card.Subtitle>
                    <Card.Text>
                        &#8369; {val.price}
                    </Card.Text>
                    <Button onClick={()=>window.location.href=`/viewproduct/${val.product_id}`}>View Product</Button>
                </Card.Body>
                </Card>
            ))}
      </Row>
        </Container>
     
    );
}