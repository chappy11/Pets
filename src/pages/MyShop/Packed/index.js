import React from "react";
import { useState } from "react";
import { Table, Button } from "react-bootstrap";
import { BASE_URL } from "../../../services/ApiClient";
import Sidebar from "../components/Sidebar";
import { Orders } from "../../../services/Orders";
import { getItem, KEY } from "../../../utils/storage";
import { useEffect } from "react";
import { formatCurrency } from "../../../utils/Money";
import HeaderText from "../../../components/HeaderText";
import swal from "sweetalert";
import { Container, SizeBox } from "../../../components";

export default function Packed() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const res = await Orders.getShopOrder(user.shop_id, "2");

    if (res.data.status == 1) {
      setOrder(res.data.data);
    }
  };

  const handleUpdate = async (id) => {
    const payload = {
      id,
      status: "3",
    };
    const resp = await Orders.updateStatus(payload);

    if (resp.data.status == 1) {
      filterNewData(id);
      swal("Success", resp.data.message, "success");
      return;
    }

    swal("Error", resp.data.message, "error");
  };

  const filterNewData = (id) => {
    const newData = order.filter((val) => val.shoporder_id !== id);

    setOrder(newData);
  };

  return (
    <>
      <Sidebar>
        <Container>
          <SizeBox height={20} />
          <HeaderText>Packing Orders</HeaderText>
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
                  <td>{formatCurrency(parseFloat(val.shopordertotal))}</td>
                  <td>
                    <Button
                      onClick={() =>
                        (window.location.href = `/viewordershop/${val.order_id}/${val.shopReference}`)
                      }
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="dark"
                      onClick={() => handleUpdate(val.shoporder_id)}
                    >
                      Out for Delivery
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
