import { HeaderText, SizeBox } from "../../components";
import Sidebar from "./component/Sidebar";
import { Row, Col, Table } from "react-bootstrap";
import DashBoardCard from "../../components/DashBoardCard";
import { defaultThemes } from "../../constants/DefaultThemes";
import { useState, useMemo } from "react";
import { DashBoard } from "../../services/DashBoard";
import { useEffect } from "react";
import Container from "../../components/Container";
import { OrderApi } from "../../services/ApiClient";
import { Orders } from "../../services/Orders";
import useGetAllStatusCount from "../../hooks/useGetAllStatusCount";
import useGetAllTransaction from "../../hooks/useGetAllTransaction";
export default function Admin() {
  const [data, setData] = useState(null);
  const { data: dataCount } = useGetAllStatusCount();
  const { data: dataStatus, sendRequest } = useGetAllTransaction();
  const [currentStatus, setCurrentStatus] = useState("Pending");
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

  async function getStatus(status, statusNo) {
    setCurrentStatus(status);
    await sendRequest(statusNo);
  }

  const displayData = useMemo(() => {
    if (dataCount) {
      return (
        <>
          <Col md={4}>
            <DashBoardCard
              title={"Pending Order"}
              subtitle={dataCount?.pending}
              color={defaultThemes.pending}
              onClick={() => getStatus("Pending", 0)}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={"Accepted Order"}
              subtitle={dataCount?.accepted}
              color={defaultThemes?.accepted}
              onClick={() => getStatus("Accepted", 1)}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={"Ready For Delivery"}
              subtitle={dataCount?.packed}
              color={defaultThemes.packed}
              onClick={() => getStatus("Packed", 2)}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={"Out For Delivery"}
              subtitle={dataCount?.deliver}
              color={defaultThemes.deliver}
              onClick={() => getStatus("Delivered", 3)}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={"Received Orders"}
              subtitle={dataCount?.success}
              color={defaultThemes.success}
              onClick={() => getStatus("Success", 5)}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={"Cancel Orders"}
              subtitle={dataCount?.cancel}
              color={defaultThemes.cancel}
              onClick={() => getStatus("Cancel", 4)}
            />
          </Col>
        </>
      );
    }
  }, [dataCount]);

  const displayDataTable = useMemo(() => {
    return dataStatus?.map((val, i) => (
      <tr>
        <td>{val.shopReference}</td>
        <td>{val.shopName}</td>
        <td>{val.firstname + " " + val.middlename + " " + val.lastname}</td>
        <td>{val.shopordertotal}</td>
        <td>{val.createAt}</td>
      </tr>
    ));
  }, [data, sendRequest]);

  useEffect(() => {
    getData();
  }, []);

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
              onClick={() => (window.location.href = "/users")}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={data?.shops}
              subtitle="Shops"
              color={defaultThemes.color001}
              onClick={() => (window.location.href = "/shops")}
            />
          </Col>
          <Col md={4}>
            <DashBoardCard
              title={data?.product}
              subtitle="Item Selling"
              color={defaultThemes.color001}
              onClick={() => (window.location.href = "/items")}
            />
          </Col>
        </Row>
        <SizeBox height={20} />
        <Row>{displayData}</Row>
        <SizeBox height={20} />
        <HeaderText>{currentStatus + " Orders"}</HeaderText>
        <Table>
          <thead>
            <tr>
              <td>Reference No</td>
              <td>Shop Name</td>
              <td>Buyer Name</td>
              <td>Total Order Amount </td>
              <td>Order Date</td>
            </tr>
          </thead>
          <tbody>{displayDataTable}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
