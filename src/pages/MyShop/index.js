import React, { useMemo } from "react";
import Sidebar from "./components/Sidebar";
import {
  Container,
  DashBoardCard,
  HeaderText,
  SizeBox,
  Title,
} from "../../components";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { defaultThemes } from "../../constants/DefaultThemes";
import { Col, Row } from "react-bootstrap";

import useGetAllSuccessTransaction from "../../hooks/useGetAllSuccessTransaction";
import { formatCurrency } from "../../utils/Money";
import useGetAllOrdersByShop from "../../hooks/useGetAllOrdersByShop";
import * as S from "./style";

export default function MyShop() {
  const { totalSales } = useGetAllSuccessTransaction();
  const { orders, dataCounts } = useGetAllOrdersByShop();
  // console.log("Data", totalSales?.weeklySet);
  // const displayGraph = useMemo(() => {
  //   if (totalSales?.weeklySet) {
  //     console.log("NISUD", totalSales.weeklySet);
  //     return (
  //       <div style={{ width: "100%" }}>
  //         <ResponsiveContainer width="100%" height={100}>
  //           <BarChart
  //             width={500}
  //             height={300}
  //             data={totalSales?.weeklySet}
  //             // margin={{
  //             //   top: 5,
  //             //   right: 30,
  //             //   left: 20,
  //             //   bottom: 5,
  //             // }}
  //           >
  //             <Bar
  //               dataKey={totalSales?.weeklySet ? "day" : ""}
  //               fill="#8884d8"
  //             />
  //           </BarChart>{" "}
  //         </ResponsiveContainer>
  //       </div>
  //     );
  //   }
  // }, [totalSales?.weeklySet]);

  return (
    <Sidebar>
      <Container>
        <S.HeaderText>
          <HeaderText color={defaultThemes.white}>Dashboard</HeaderText>
        </S.HeaderText>
        <Row>
          <Col>
            <DashBoardCard
              title={"Today Income"}
              subtitle={formatCurrency(+totalSales?.day)}
              color={defaultThemes.color001}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Week"}
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
              subtitle={"Pending Transaction"}
              title={dataCounts?.pending}
              color={defaultThemes.pending}
              onClick={() => (window.location.href = "/pending")}
            />
          </Col>
          <Col>
            <DashBoardCard
              subtitle={"Accepted"}
              title={dataCounts?.accepted}
              color={defaultThemes.accepted}
              onClick={() => (window.location.href = "/accepted")}
            />
          </Col>
          <Col>
            <DashBoardCard
              subtitle={"Packed"}
              title={dataCounts?.packed}
              color={defaultThemes.packed}
              onClick={() => (window.location.href = "/packed")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <DashBoardCard
              subtitle={"On Delivery"}
              title={dataCounts?.delivered}
              color={defaultThemes.deliver}
              onClick={() => (window.location.href = "/deliver")}
            />
          </Col>
          <Col>
            <DashBoardCard
              subtitle={"Received"}
              title={dataCounts?.success}
              color={defaultThemes.success}
              onClick={() => (window.location.href = "/success")}
            />
          </Col>
          <Col>
            <DashBoardCard
              subtitle={"Canceled"}
              title={dataCounts?.cancel}
              color={defaultThemes.cancel}
              onClick={() => (window.location.href = "/canceled")}
            />
          </Col>
        </Row>
        {totalSales?.weeklySet}
      </Container>
    </Sidebar>
  );
}
