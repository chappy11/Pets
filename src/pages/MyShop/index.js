import React from "react";
import Sidebar from "./components/Sidebar";
import { Container, DashBoardCard, Title } from "../../components";
import * as S from "./style";
import { defaultThemes } from "../../constants/DefaultThemes";
import { Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { getDateRange } from "../../utils/date";

export default function MyShop() {
  const week = getDateRange("month");

  console.log(week.lastDate);

  return (
    <Sidebar>
      <Container>
        <Title>Dash Board</Title>
        <Row>
          <Col>
            <DashBoardCard
              title={"Today Income"}
              subtitle="100"
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Week`"}
              subtitle="100"
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Month"}
              subtitle="100"
              color={defaultThemes.color001}
            />
          </Col>
        </Row>
      </Container>
    </Sidebar>
  );
}
