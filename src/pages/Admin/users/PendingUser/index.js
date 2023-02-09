import {
  SizeBox,
  Button,
  Loading,
  Print,
  HeaderText,
} from "../../../../components";

import { Table } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";
import { User } from "../../../../services/User";
import swal from "sweetalert";
import Sidebar from "../../component/Sidebar";
import { defaultThemes } from "../../../../constants/DefaultThemes";
import usePrompts from "../../../../hooks/usePrompts";
import Container from "../../../../components/Container";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import * as S from "./style";
export default function PendingUser() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { alertError } = usePrompts();
  const [isPrint, setIsPrint] = useState(false);
  const { user: users } = useGetUserFromStorage();
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    getUser();
  }, [isLoading]);

  const getUser = async () => {
    try {
      const response = await User.getusers(2, 0);
      console.log(response);
      if (response.data.status == 1) {
        setUser(response.data.data);
      } else {
        setUser([]);
      }
    } catch (e) {
      alertError();
      setIsLoading(false);
    }
  };

  const handleApproved = async (user_id) => {
    try {
      setIsLoading(true);
      const payload = {
        user_id: user_id,
        status: 1,
      };
      const res = await User.updateStatus(payload);

      if (res.data.status == 1) {
        swal("Succcess", "Successfully Activated", "success");
        getUser();
      } else {
        swal("Error", "Something went wrong please try again later", "error");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const printData = useMemo(() => {
    if (isPrint) {
      return (
        <Print
          fullName={
            users?.firstname + " " + users?.middlename + " " + users?.lastname
          }
          cancelText={"Cancel"}
          onCancel={() => setIsPrint(false)}
          textHeader={"List Of Inactive Users"}
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
              {user.map((val, i) => (
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
        <Loading isLoading={isLoading} />
        <Container>
          {printData}
          {!isPrint && (
            <>
              <SizeBox height={20} />
              <S.Headers>
                <S.ItemContainer>
                  <HeaderText>Inactive Users</HeaderText>
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
                <tbody>
                  {user.map((val, i) => (
                    <tr>
                      <td>{val.user_id}</td>
                      <td>{val.username}</td>
                      <td>
                        {val.firstname +
                          " " +
                          val.middlename +
                          " " +
                          val.lastname}
                      </td>
                      <td>{val.email}</td>
                      <td>
                        <Button
                          onClick={() =>
                            (window.location.href = `/customer/${val.user_id}`)
                          }
                        >
                          View
                        </Button>
                      </td>
                      <td>
                        <Button
                          isLoading={isLoading}
                          color={defaultThemes.primary}
                          onClick={() => handleApproved(val.user_id)}
                        >
                          Activate
                        </Button>
                        <SizeBox width={5} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {user.length < 1 && <p className="text-center">No Data found</p>}
            </>
          )}
        </Container>
      </Sidebar>
    </>
  );
}
