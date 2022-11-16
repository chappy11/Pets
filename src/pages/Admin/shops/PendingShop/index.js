import React, { useEffect, useState, useMemo } from "react";

import { Table } from "react-bootstrap";
import { Shop } from "../../../../services/Shop";
import { User } from "../../../../services/User";
import { Avatar } from "@mui/material";
import swal from "sweetalert";
import Sidebar from "../../component/Sidebar";
import {
  Button,
  SizeBox,
  Container,
  HeaderText,
  Line,
} from "../../../../components";
import * as S from "./style";
import { BASE_URL } from "../../../../services/ApiClient";

export default function PendingShop() {
  const [shop, setShop] = useState([]);

  useEffect(() => {
    getShop();
  }, []);

  const getShop = async () => {
    const res = await Shop.getpendingshop();

    if (res.data.status == 1) {
      setShop(res.data.data);
    } else {
      setShop([]);
    }
  };

  const handleApproved = async (user_id) => {
    const payload = {
      user_id: user_id,
      status: 1,
    };
    const res = await User.updateStatus(payload);

    if (res.data.status == 1) {
      swal("Succcess", "Successfully Approved", "success");
      getShop();
    } else {
      swal("Error", "Something went wrong please try again later", "error");
    }
  };

  const displayData = useMemo(() => {
    return shop.map((val, i) => (
      <tr key={val.user_id}>
        <td>
          <S.NameContainer>
            <Avatar src={BASE_URL + val.logo} />
            <SizeBox width={10} />
            {val.shopName}
          </S.NameContainer>
        </td>
        <td>
          {val.ownerFirstName +
            " " +
            val.ownerMiddleName +
            " " +
            val.ownerLastName}
        </td>
        <td>{val.createAt}</td>
        <td>{val.shopEmail}</td>
        <td>
          <Button
            onClick={() => (window.location.href = `/shop/${val.user_id}`)}
          >
            View
          </Button>
        </td>
        <td>
          <Button onClick={() => handleApproved(val.user_id)}>Approved</Button>
        </td>
      </tr>
    ));
  }, [shop]);

  return (
    <Sidebar>
      <Container>
        <HeaderText>Pending List</HeaderText>
        <Line />
        <Table>
          <thead>
            <tr>
              <td>Shop Name</td>
              <td>Shop Owner</td>
              <td>Date Created</td>
              <td>Shop Email</td>
              <td>View</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
