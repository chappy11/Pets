import { HeaderText } from "../../components";
import Sidebar from "./component/Sidebar";
import { Container, Row, Col } from "react-bootstrap";
import DashBoardCard from "../../components/DashBoardCard";
import { defaultThemes } from "../../constants/DefaultThemes";
import { useState } from "react";
import { DashBoard } from "../../services/DashBoard";
import { useEffect } from "react";
export default function Admin() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

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
      </Container>
    </Sidebar>
  );
}
