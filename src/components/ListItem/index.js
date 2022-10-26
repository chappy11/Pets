import React from "react";
import { Row, Col } from "react-bootstrap";
import * as S from "./style";
export default function ListItem(props) {
  return (
    <Row direction="horizontal" gap={5}>
      <Col>
        <S.Label>{props.label}</S.Label>
      </Col>
      <S.ValueContainer alignment={props ? props.alignment : "flex-start"}>
        <S.Value>{props.value}</S.Value>
      </S.ValueContainer>
    </Row>
  );
}
