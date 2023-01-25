import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MessageBox from "./component/MessageBox";
import MessageList from "./component/Messagelist";
import * as S from './style';
export default function Message() {
  const { id } = useParams();

  return (
  <S.Container>
   <Row>
      <Col md="3">
        <MessageList conn_id={id} />
      </Col>
      <Col md="9">
        <MessageBox conn_id={id} />
      </Col>
    </Row>
  </S.Container>
  );
}
