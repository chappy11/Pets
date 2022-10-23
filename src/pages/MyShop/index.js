import React from "react";
import Sidebar from "./components/Sidebar";
import {
  Container,
  DashBoardCard,
  HeaderText,
  SizeBox,
  Title,
} from "../../components";
import * as S from "./style";
import { defaultThemes } from "../../constants/DefaultThemes";
import { Col, Row } from "react-bootstrap";
import dayjs from "dayjs";
import { getDateRange } from "../../utils/date";
import useGetAllSuccessTransaction from "../../hooks/useGetAllSuccessTransaction";
import { formatCurrency } from "../../utils/Money";
import useGetAllOrdersByShop from "../../hooks/useGetAllOrdersByShop";

export default function MyShop() {
  const { totalSales } = useGetAllSuccessTransaction();
  const { orders, dataCounts } = useGetAllOrdersByShop();
  console.log(dataCounts);
  return (
    <Sidebar>
      <Container>
        <Title>Dash Board</Title>
        <Row>
          <Col>
            <DashBoardCard
              title={"Total Income"}
              subtitle={formatCurrency(+totalSales?.all)}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Today Income"}
              subtitle={formatCurrency(+totalSales?.day)}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Week`"}
              subtitle={formatCurrency(+totalSales?.week)}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Month"}
              subtitle={formatCurrency(+totalSales?.month)}
              color={defaultThemes.color001}
            />
          </Col>
        </Row>
        <SizeBox height={20} />
        <HeaderText>Total Orders: {dataCounts?.all}</HeaderText>
        <Row>
          <Col>
            <DashBoardCard
              title={"Pending"}
              subtitle={dataCounts?.pending}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Accepted"}
              subtitle={dataCounts?.accepted}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Packed"}
              subtitle={dataCounts?.packed}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"On Delivery"}
              subtitle={dataCounts?.delivered}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Received"}
              subtitle={dataCounts?.success}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Canceled"}
              subtitle={dataCounts?.cancel}
              color={defaultThemes.color001}
            />
          </Col>
        </Row>
      </Container>
    </Sidebar>
  );
}
