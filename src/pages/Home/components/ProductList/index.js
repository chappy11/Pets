import { Row, Col, Image } from "react-bootstrap";
import useGetAllProducts from "../../../../hooks/useGetAllProducts";
import { BASE_URL } from "../../../../services/ApiClient";
import * as S from "./style";
import { SizeBox, Container, Text } from "../../../../components";
import { formatCurrency } from "../../../../utils/Money";
import { useMemo } from "react";

const image = require("../../../../asset/pic1.jpg");

export default function ProductList() {
  const { products } = useGetAllProducts();

  const limitproducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  return (
    <S.Section>
      {" "}
      <Container>
        <S.BodyText>Welcome Shoppers</S.BodyText>

        <SizeBox height={20} />
        <Row
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {limitproducts.map((val, idx) => (
            <S.CustomizeCard
              onClick={() =>
                (window.location.href = `/viewproduct/${val.product_id}`)
              }
            >
              <S.ImageContainer style={{ width: "100%", height: "150px" }}>
                <S.CardImage src={BASE_URL + val.productImage} />
              </S.ImageContainer>
              <S.CardBody>
                <SizeBox height={20} />
                <S.Title>{val.productName}</S.Title>
                <SizeBox height={5} />
                <S.Subtitle>{formatCurrency(+val.price)}</S.Subtitle>
              </S.CardBody>
            </S.CustomizeCard>
          ))}
        </Row>
        <SizeBox height={20} />
        <S.SeeMore>
          <a href="/products">See More</a>
        </S.SeeMore>
      </Container>
    </S.Section>
  );
}
