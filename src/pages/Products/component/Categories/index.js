import React, { useEffect, useMemo, useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { Title, SizeBox, Container } from "../../../../components";
import { Category as Cat } from "../../../../services/Category";
import * as S from "./style";

export default function Categories(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await Cat.getCategory();

    if (resp.data.status == 1) {
      const categoriesWithStatus = [];
      resp.data.data.forEach((val) => {
        const payload = {
          ...val,
          isActive: true,
        };
        categoriesWithStatus.push(payload);
      });
      setCategories(categoriesWithStatus);
    }
  };

  const handleCheck = (id, isCheck) => {
    const newState = categories.map((val) =>
      val.category_id === id ? { ...val, isActive: !isCheck } : val
    );

    setCategories(newState);
    props.filterByCategory(newState);
  };

  return (
    <Row>
      <Col md={3}>
        <SizeBox height={20} />
        <Container>
          <S.CategoryContainer>
            <S.TitleText>Category</S.TitleText>
          </S.CategoryContainer>

          <SizeBox height={20} />
          {categories.map((val, i) => (
            <S.CategoryContainer>
              <S.Category
                onClick={() => handleCheck(val.category_id, val.isActive)}
                checked={val.isActive}
                label={val.category_name}
              />
            </S.CategoryContainer>
          ))}
        </Container>
      </Col>
      <Col>{props.children}</Col>
    </Row>
  );
}
