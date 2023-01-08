import { People } from "@mui/icons-material";

import React from "react";
import { useEffect } from "react";
import { useState, useMemo, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  HeaderText,
  Line,
  Print,
  SizeBox,
} from "../../../../components";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import { User } from "../../../../services/User";
import Sidebar from "../../component/Sidebar";
import * as S from "./style";

export default function AllUser() {
  const [data, setData] = useState([]);
  const [isPrint, setIsPrint] = useState(false);
  const { user } = useGetUserFromStorage();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await User.getusers(2, 3);

    if (res.data.status == 1) {
      setData(res.data.data);
    }
  };

  const isNoDataFound = useMemo(() => {
    return data.length < 1 && <p className="text-center">No Data Found</p>;
  }, [data]);

  const status = useCallback(
    (stat) => {
      if (stat == "0") {
        return "text-danger";
      }

      return "text-success";
    },
    [data]
  );

  const displayData = useMemo(() => {
    return data.map((val, i) => (
      <tr>
        <td>{val.user_id}</td>
        <td>{val.username}</td>
        <td>{val.firstname + " " + val.middlename + " " + val.lastname}</td>
        <td>{val.email}</td>
        <td className={status(val.user_status)}>
          {val.user_status === "0" ? "Inactive" : "Active"}
        </td>
        <td>
          <Button
            onClick={() => (window.location.href = `/customer/${val.user_id}`)}
          >
            View
          </Button>
        </td>
      </tr>
    ));
  }, [data]);

  const printData = useMemo(() => {
    if (isPrint) {
      return (
        <Print
          fullName={
            user?.firstname + " " + user?.middlename + " " + user?.lastname
          }
          cancelText={"Cancel"}
          onCancel={() => setIsPrint(false)}
          textHeader={"List Of Users"}
        >
          <SizeBox height={20} />
          <Table variant="bordered">
            <thead>
              <tr>
                <td>User ID</td>
                <td>Username</td>
                <td>Name</td>
                <td>Email</td>
              </tr>
            </thead>
            <tbody>
              {data.map((val, i) => (
                <tr>
                  <td>{val.user_id}</td>
                  <td>{val.username}</td>
                  <td>
                    {val.firstname + " " + val.middlename + " " + val.lastname}
                  </td>
                  <td>{val.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Print>
      );
    }
  }, [isPrint]);

  return (
    <>
      <Sidebar>
        <Container>
          {printData}
          {!isPrint && (
            <>
              <SizeBox height={20} />
              <S.Headers>
                <S.ItemContainer>
                  <HeaderText>All Users</HeaderText>
                </S.ItemContainer>
                <S.ItemContainer justification="flex-end">
                  <Button onClick={() => setIsPrint(true)}>Print</Button>
                </S.ItemContainer>
              </S.Headers>
              <SizeBox height={20} />

              <Table>
                <thead>
                  <tr>
                    <td>User ID</td>
                    <td>Username</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>View</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>{displayData}</tbody>
              </Table>
            </>
          )}
        </Container>
      </Sidebar>
    </>
  );
}
