import React from "react";
import { useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { BASE_URL } from "../../../services/ApiClient";
import Sidebar from "../components/Sidebar";
import { Orders } from "../../../services/Orders";
import { getItem, KEY } from "../../../utils/storage";
import { useEffect } from "react";
import { formatCurrency } from "../../../utils/Money";
import HeaderText from "../../../components/HeaderText";
import swal from "sweetalert";
import { SizeBox } from "../../../components";

export default function PendingList() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const res = await Orders.getShopOrder(user.shop_id, "0");
    console.log("DATA", res.data.data);
    if (res.data.status == 1) {
      setOrder(res.data.data);
    }
  };

  const handleUpdate = async (id) => {
    const payload = {
      id,
      status: "1",
    };
    const resp = await Orders.updateStatus(payload);

    if (resp.data.status == 1) {
      getData();
      swal("Success", resp.data.message, "success");
      return;
    }

    swal("Error", resp.data.message, "error");
  };
  return (
    <>
      <Sidebar>
        <Container>
          <SizeBox height={20} />
          <HeaderText>Pending List</HeaderText>
          <Table responsive={"md"} bordered={true}>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>Reference Number</th>
                <th>Customer Name</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {order.map((val, i) => (
                <tr>
                  <td>{val.createAt}</td>

                  <td>{val.referenceNo}</td>
                  <td>
                    {`${val.firstname} ${val.middlename} ${val.lastname}`}
                  </td>
                  <td>{formatCurrency(parseFloat(val.totalAmount))}</td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() => handleUpdate(val.shoporder_id)}
                    >
                      Packed
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Sidebar>
    </>
  );
}
