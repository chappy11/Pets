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
  Print,
} from "../../../../components";
import * as S from "./style";
import { BASE_URL } from "../../../../services/ApiClient";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";

export default function PendingShop() {
  const [shop, setShop] = useState([]);
  const [isPrint, setIsPrint] = useState(false);
  const { user } = useGetUserFromStorage();

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

  const printData = useMemo(() => {
    if (isPrint) {
      return (
        <Print
          fullName={
            user?.firstname + " " + user?.middlename + " " + user?.lastname
          }
          cancelText={"Cancel"}
          onCancel={() => setIsPrint(false)}
          textHeader="List Of Inactive Shops"
        >
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
            <tbody>
              {shop.map((val, i) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
        </Print>
      );
    }
  }, [isPrint, shop]);

  return (
    <Sidebar>
      <Container>
        {printData}
        {!isPrint && (
          <>
            <SizeBox height={20} />
            <S.Headers>
              <S.ItemContainer>
                <HeaderText>List Of Inactive Shops</HeaderText>
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
