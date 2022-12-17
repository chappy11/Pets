import { Avatar } from "@mui/material";
import React, { useState, useEffect, useMemo } from "react";
import { Table } from "react-bootstrap";
import {
  Container,
  SizeBox,
  Button,
  HeaderText,
  Print,
} from "../../../../components";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import usePrompts from "../../../../hooks/usePrompts";
import { BASE_URL } from "../../../../services/ApiClient";
import { Shop } from "../../../../services/Shop";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function ActiveShop() {
  const [data, setData] = useState([]);
  const [isPrint, setIsPrint] = useState(false);
  const { alertSuccess, alertError } = usePrompts();
  const { user } = useGetUserFromStorage();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await Shop.getActiveShop();

      setData(res.data.data);
    } catch (e) {
      console.log(e);
      alertError();
    }
  };

  const updateStatus = async (id) => {
    try {
      const payload = {
        user_id: id,
        status: 0,
      };

      const res = await User.updateStatus(payload);
      if (res.data.status == 1) {
        alertSuccess(res.data.message);
        getData();
        return;
      }
    } catch (e) {
      alertError();
    }
  };

  const printData = useMemo(() => {
    if (isPrint) {
      return (
        <>
          <Print
            fullName={
              user?.firstname + " " + user?.middlename + " " + user?.lastname
            }
            cancelText={"Cancel"}
            onCancel={() => setIsPrint(false)}
          >
            <HeaderText alignText="center">Active Shops</HeaderText>
            <SizeBox height={20} />
            <Table>
              <thead>
                <tr>
                  <td>Shop Name</td>
                  <td>Shop Owner</td>
                  <td>Date Created</td>
                  <td>Shop Email</td>
                </tr>
              </thead>
              <tbody>
                {data.map((val) => (
                  <tr key={val.user_id}>
                    <td>
                      <S.Container>
                        <Avatar src={BASE_URL + val.logo} />
                        <SizeBox width={20} />
                        {val.shopName}
                      </S.Container>
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
                  </tr>
                ))}
              </tbody>
            </Table>
          </Print>
        </>
      );
    }
  }, [isPrint]);

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr key={val.user_id}>
        <td>
          <S.Container>
            <Avatar src={BASE_URL + val.logo} />
            <SizeBox width={20} />
            {val.shopName}
          </S.Container>
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
          <Button onClick={() => handlestatus(val.user_id)}>Deactivate</Button>
        </td>
      </tr>
    ));
  }, [data]);

  function handlestatus(id) {
    updateStatus(id);
  }
  return (
    <Sidebar>
      <Container>
        {printData}
        {!isPrint && (
          <>
            <SizeBox height={20} />
            <S.Headers>
              <S.ItemContainer>
                <HeaderText>Active Shops</HeaderText>
              </S.ItemContainer>
              <S.ItemContainer justification={"flex-end"}>
                <Button onClick={() => setIsPrint(true)}>Print</Button>
              </S.ItemContainer>
            </S.Headers>
            <SizeBox height={20} />
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
          </>
        )}
      </Container>
    </Sidebar>
  );
}
