import { HeaderText, SizeBox } from "../../components";
import Sidebar from "./component/Sidebar";
import { Row, Col } from "react-bootstrap";
import DashBoardCard from "../../components/DashBoardCard";
import { defaultThemes } from "../../constants/DefaultThemes";
import { useState } from "react";
import { DashBoard } from "../../services/DashBoard";
import { useEffect } from "react";
import Container from "../../components/Container";
import { OrderApi } from "../../services/ApiClient";
import { Orders } from "../../services/Orders";
export default function Admin() {
  const [data, setData] = useState(null);

  const getData = async () => {
    try {
      const resp = await DashBoard.getAdminDashboard();

      if (resp.data.status == 1) {
        setData(resp.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOrders = async (status) => {
    try {
      const data = await Orders.getAllOrderByStatus(status);

      return data;
    } catch (e) {
      console.log(e);
    }
  };

  function getOrd(status) {
    return getOrders(status).length;
  }

  useEffect(() => {
    getData();
  }, []);

  const statuses = [
    {
      count: getOrders(0).length,
      name: "Pending",
      color: defaultThemes.pending,
    },
    {
      count: getOrders(1).length,
      name: "Accepted",
      color: defaultThemes.accepted,
    },
    {
      count: getOrders(2).length,
      name: "Packed",
      color: defaultThemes.packed,
    },
    {
      count: getOrders(3).length,
      name: "Delivered",
      color: defaultThemes.deliver,
    },
    {
      count: getOrders(5).length,
      name: "Success",
      color: defaultThemes.success,
    },
    {
      count: getOrders(4).length,
      name: "Cancel",
      color: defaultThemes.cancel,
    },
  ];

  console.log("WWW", statuses);

  return (
    <Sidebar>
      <Container>
        <HeaderText>Hello Admin</HeaderText>
        <Row>
          <Col md={4}>
            <DashBoardCard
              title={data?.customers}
              subtitle="Customers"
              color={defaultThemes.color001}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={data?.shops}
              subtitle="Shops"
              color={defaultThemes.secondary}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={data?.product}
              subtitle="Item Selling"
              color={defaultThemes.secondary}
            />
          </Col>
        </Row>
        <SizeBox height={20} />
        <Row>
          {/* {statuses.map((val) => (
            <Col md={4}>
              <DashBoard
                title={val.count}
                subtitle={val.name}
                color={val.color}
              />
            </Col>
          ))} */}
        </Row>
      </Container>
    </Sidebar>
  );
}
