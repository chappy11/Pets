import { SizeBox, Button, Loading } from "../../../../components";

import { Table, Image, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { User } from "../../../../services/User";
import swal from "sweetalert";
import Sidebar from "../../component/Sidebar";
import { defaultThemes } from "../../../../constants/DefaultThemes";
import usePrompts from "../../../../hooks/usePrompts";
export default function PendingUser() {
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { alertError, alertSuccess } = usePrompts();
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
      isLoading(false);
    }
  };

  const handleApproved = async (user_id) => {
    setIsLoading(true);
    const payload = {
      user_id: user_id,
      status: 1,
    };
    const res = await User.updateStatus(payload);

    if (res.data.status == 1) {
      swal("Succcess", "Successfully Approved", "success");
      getUser();
    } else {
      swal("Error", "Something went wrong please try again later", "error");
    }
    setIsLoading(false);
  };

  return (
    <Sidebar>
      <Loading isLoading={isLoading} />
      <Container>
        <SizeBox height={20} />
        <h3>Pending User</h3>
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
                  {val.firstname + " " + val.middlename + " " + val.lastname}
                </td>
                <td>{val.email}</td>
                <td>
                  <Button onClick={() => (window.location.href = "/")}>
                    View
                  </Button>
                </td>
                <td>
                  <Button
                    color={defaultThemes.primary}
                    onClick={() => handleApproved(val.user_id)}
                  >
                    Approved
                  </Button>
                  <SizeBox width={5} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {user.length < 1 && <p className="text-center">No Data found</p>}
      </Container>
    </Sidebar>
  );
}
