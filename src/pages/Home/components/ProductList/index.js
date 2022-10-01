import { Card, CardGroup, Row, Col, Container, Image } from "react-bootstrap";
import useGetAllProducts from "../../../../hooks/useGetAllProducts";
import { BASE_URL } from "../../../../services/ApiClient";
import * as S from "./style";
import { SizeBox, Button } from "../../../../components";
import { formatCurrency } from "../../../../utils/Money";

const image = require('../../../../asset/pic1.jpg');

const products = [
  {
    product_id:1,
    productImage:image,
    productName:"Ret",
    category_name:"Dog",
    stock:1,
    price:200.00
  },
  {
    product_id:1,
    productImage:image,
    productName:"Ret",
    category_name:"Dog",
    stock:1,
    price:200.00
  },
  {
    product_id:1,
    productImage:image,
    productName:"Ret",
    category_name:"Dog",
    stock:1,
    price:200.00
  },
  {
    product_id:1,
    productImage:image,
    productName:"Ret",
    category_name:"Dog",
    stock:1,
    price:200.00
  }
];
export default function ProductList() {
  // const { products } = useGetAllProducts();

  return (
    <Container>
      <S.BodyText>Welcome Shoppers</S.BodyText>

      <SizeBox height={20} />
      <Row style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {products.map((val, idx) => (
          <S.CustomizeCard
            onClick={() =>
              (window.location.href = `/viewproduct/${val.product_id}`)
            }
          >
            <S.ImageContainer style={{ width: "100%", height: 200 }}>
              {/* <S.CardImage src={BASE_URL + val.productImage} /> */}
              <S.CardImage src={val.productImage} />
            </S.ImageContainer>

            <Card.Body>
              <S.Title>{val.productName}</S.Title>
              <S.Subtitle>{val.category_name}</S.Subtitle>
              <S.Subtitle>{formatCurrency(val.price)}</S.Subtitle>
            </Card.Body>
          </S.CustomizeCard>
        ))}
      </Row>
    </Container>
  );
}
