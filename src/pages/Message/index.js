import React from "react";
import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MessageBox from "./component/MessageBox";
import MessageList from "./component/Messagelist";

export default function Message() {
  const { id } = useParams();
  return (
    <Row>
      <Col md="3">
        <MessageList reciever_id={id} />
      </Col>
      <Col md="9">
        <MessageBox reciever_id={id} />
      </Col>
    </Row>
  );
}
