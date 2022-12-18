import React from "react";
import Sidebar from "./components/Sidebar";
import {
  Container,
  DashBoardCard,
  HeaderText,
  SizeBox,
  Title,
} from "../../components";

import { defaultThemes } from "../../constants/DefaultThemes";
import { Col, Row } from "react-bootstrap";

import useGetAllSuccessTransaction from "../../hooks/useGetAllSuccessTransaction";
import { formatCurrency } from "../../utils/Money";
import useGetAllOrdersByShop from "../../hooks/useGetAllOrdersByShop";

export default function MyShop() {
  const { totalSales } = useGetAllSuccessTransaction();
  const { orders, dataCounts } = useGetAllOrdersByShop();

  return (
    <Sidebar>
      <Container>
        <Title>Dash Board</Title>
        <Row>
          <Col>
            <DashBoardCard
              title={"Total Income"}
              subtitle={formatCurrency(+totalSales?.all)}
              color={defaultThemes.secondary}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Today Income"}
              subtitle={formatCurrency(+totalSales?.day)}
              color={defaultThemes.secondary}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Week`"}
              subtitle={formatCurrency(+totalSales?.week)}
              color={defaultThemes.secondary}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Month"}
              subtitle={formatCurrency(+totalSales?.month)}
              color={defaultThemes.secondary}
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
              color={defaultThemes.pending}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Accepted"}
              subtitle={dataCounts?.accepted}
              color={defaultThemes.accepted}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Packed"}
              subtitle={dataCounts?.packed}
              color={defaultThemes.packed}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"On Delivery"}
              subtitle={dataCounts?.delivered}
              color={defaultThemes.deliver}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Received"}
              subtitle={dataCounts?.success}
              color={defaultThemes.success}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"Canceled"}
              subtitle={dataCounts?.cancel}
              color={defaultThemes.cancel}
            />
          </Col>
        </Row>
      </Container>
    </Sidebar>
  );
}
