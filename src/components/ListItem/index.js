import React from "react";
import { Row, Col } from "react-bootstrap";
import * as S from "./style";
export default function ListItem(props) {
  return (
    <Row direction="horizontal" gap={5}>
      <Col>
        <S.Label>{props.label}</S.Label>
      </Col>
      <Col>
        <S.Value>{props.value}</S.Value>
      </Col>
    </Row>
  );
}
