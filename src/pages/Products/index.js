import React, { useMemo } from "react";
import { Container, Navigation, SizeBox } from "../../components";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import * as S from "./style";
import Categories from "./component/Categories";
import { Row } from "react-bootstrap";
import { BASE_URL } from "../../services/ApiClient";
import { formatCurrency } from "../../utils/Money";

export default function Products() {
  const { products, filterByCategory } = useGetAllProducts();

  const display = useMemo(() => {
    return products.map((val) => (
      <S.CustomizeCard
        onClick={() =>
          (window.location.href = `/viewproduct/${val.product_id}`)
        }
      >
        <S.ImageContainer style={{ width: "100%", height: "150px" }}>
          <S.CardImage src={BASE_URL + val.productImage} />
        </S.ImageContainer>
        <SizeBox height={20} />
        <S.Title>{val.productName}</S.Title>
        <SizeBox height={5} />
        <S.Subtitle>{formatCurrency(+val.price)}</S.Subtitle>
      </S.CustomizeCard>
    ));
  }, [products]);
  return (
    <>
      <Navigation />
      <Categories filterByCategory={filterByCategory}>
        <SizeBox height={10} />
        <Container>
          <SizeBox height={20} />
          <S.TextTitle>Product List</S.TextTitle>
          <Row>{display}</Row>
        </Container>
      </Categories>
    </>
  );
}
