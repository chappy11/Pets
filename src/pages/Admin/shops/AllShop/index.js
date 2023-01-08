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
  Print,
} from "../../../../components";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import usePrompts from "../../../../hooks/usePrompts";
import { BASE_URL } from "../../../../services/ApiClient";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function AllShop() {
  const [data, setData] = useState([]);
  const { alertError } = usePrompts();
  const [isPrint, setIsPrint] = useState(false);
  const { user } = useGetUserFromStorage();
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
          <Button
            onClick={() => (window.location.href = `/shop/${val.user_id}`)}
          >
            View
          </Button>
        </td>
      </tr>
    ));
  }, [data]);

  const displayPrint = useMemo(() => {
    if (isPrint) {
      return (
        <>
          <Print
            fullName={
              user?.firstname + " " + user?.middlename + " " + user?.lastname
            }
            cancelText={"Cancel"}
            onCancel={() => setIsPrint(false)}
            textHeader="List of Shops"
          >
            <Table variant="bordered">
              <thead>
                <tr>
                  <th>Shop Name</th>
                  <th>Owner Name</th>
                  <th>Date Created</th>
                  <th>Shop Email</th>
                </tr>
              </thead>

              <tbody>
                {data.map((val, i) => (
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
        </>
      );
    }
  }, [isPrint]);

  return (
    <Sidebar>
      <Container>
        {displayPrint}
        {!isPrint && (
          <>
            <SizeBox height={20} />
            <S.Headers>
              <S.ItemContainer>
                <HeaderText>List Of Shops</HeaderText>
              </S.ItemContainer>
              <S.ItemContainer justification="flex-end">
                <Button onClick={() => setIsPrint(true)}>Print</Button>
              </S.ItemContainer>
            </S.Headers>
            <SizeBox height={20} />

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
          </>
        )}
      </Container>
    </Sidebar>
  );
}
