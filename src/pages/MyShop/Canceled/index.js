import { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import { Container, HeaderText, Text, Button } from "../../../components";
import Sidebar from "../components/Sidebar";
import React from "react";
import { formatCurrency } from "../../../utils/Money";
import { getItem, KEY } from "../../../utils/storage";
import { Orders } from "../../../services/Orders";

export default function Canceled() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);
      const response = await Orders.getShopOrder(user.shop_id, "4");

      setData(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const displayData = useMemo(
    () =>
      data?.map((val) => (
        <tr>
          <td>{val.createAt}</td>

          <td>{val.referenceNo}</td>
          <td>{`${val.firstname} ${val.middlename} ${val.lastname}`}</td>
          <td>{formatCurrency(parseFloat(val.shopordertotal))}</td>
          <td className="text-danger">canceled</td>
          <td>
            <Button
              onClick={() =>
                (window.location.href = `/viewordershop/${val.order_id}/${val.shopReference}`)
              }
            >
              View
            </Button>
          </td>
        </tr>
      )),
    [data]
  );
  return (
    <Sidebar>
      <Container>
        <HeaderText>Canceled Order</HeaderText>
        <Table>
          <thead>
            <tr>
              <th>Date Created</th>
              <th>Reference Number</th>
              <th>Customer Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
