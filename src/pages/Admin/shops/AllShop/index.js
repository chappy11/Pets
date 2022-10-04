import { Avatar } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState, useMemo } from "react";
import { Table } from "react-bootstrap";
import {
  Button,
  HeaderText,
  Line,
  SizeBox,
  Container,
} from "../../../../components";
import usePrompts from "../../../../hooks/usePrompts";
import { BASE_URL } from "../../../../services/ApiClient";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function AllShop() {
  const [data, setData] = useState([]);
  const { alertSuccess, alertError } = usePrompts();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await User.getusers(1, 3);

      if (response.data.status == 1) {
        setData(response.data.data);
      }
    } catch (e) {
      alertError();
    }
  };

  const displayData = useMemo(() => {
    return data.map((val, i) => (
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
          <Button>View</Button>
        </td>
      </tr>
    ));
  }, [data]);

  return (
    <Sidebar>
      <Container>
        <HeaderText>Shop List</HeaderText>
        <SizeBox height={10} />
        <Line />
        <SizeBox height={20} />
        <Table>
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Owner Name</th>
              <th>Date Created</th>
              <th>Shop Email</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>{displayData}</tbody>
        </Table>
      </Container>
    </Sidebar>
  );
}
