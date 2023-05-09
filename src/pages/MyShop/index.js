import React, { useMemo, useState } from "react";
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
import * as S from "./style";
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import useGetSaleable from "../../hooks/useGetSaleable";

ChartJS.register(BarElement, Tooltip, CategoryScale, Legend, LinearScale);
export default function MyShop() {
  const { totalSales } = useGetAllSuccessTransaction();
  const { orders, dataCounts } = useGetAllOrdersByShop();
  const [currentTable, setCurrentTable] = useState("y");
  const { products, sales } = useGetSaleable();
  console.log(totalSales?.yearly?.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const data = {
    labels:
      currentTable === "w"
        ? totalSales?.weeklySet?.dataLabels
        : totalSales?.yearly?.labels,
    datasets: [
      {
        label: currentTable === "w" ? "Daily Income" : "Monthly Income",
        data:
          currentTable === "w"
            ? totalSales?.weeklySet?.data
            : totalSales?.yearly?.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const dats = {
    labels: products,
    datasets: [
      {
        label: "Most Saleable Products",
        data: sales,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {};
  const displayGraph = useMemo(() => {
    if (data) {
      // console.log("NISUD", totalSales.weeklySet);
      return (
        <div>
          <Bar data={dats} options={options}></Bar>
        </div>
      );
    }
  }, [products, sales, options]);
  console.log(products, sales);
  return (
    <Sidebar>
      <Container>
        <HeaderText color={defaultThemes.secondary}>Dashboard</HeaderText>
        <Row>
          <Col>
            <DashBoardCard
              title={"Today Income"}
              subtitle={formatCurrency(+totalSales?.day)}
              color={defaultThemes.color001}
              onClick={() =>{}}
            />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Week"}
              subtitle={formatCurrency(+totalSales?.week)}
              color={defaultThemes.color001}
              onClick={() => setCurrentTable("w")}
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
        <Row>
          <Col>
            <S.EmplyCont />
          </Col>
          <Col>
            <DashBoardCard
              title={"This Year"}
              subtitle={formatCurrency(+totalSales?.year)}
              color={defaultThemes.color001}
              onClick={() => setCurrentTable("y")}
            />
          </Col>
          <Col>
            <S.EmplyCont />
          </Col>
        </Row>
        <Bar data={data} options={options}></Bar>
        <SizeBox height={20} />

        {displayGraph}
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
        {/* <div style={{ width: "100%" }}>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart width={150} height={40} data={totalSales?.weeklySet}>
              <Bar dataKey="day" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}
      </Container>
    </Sidebar>
  );
}
