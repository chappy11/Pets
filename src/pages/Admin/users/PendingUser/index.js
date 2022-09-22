import { SizeBox } from "../../../../components";

import { Table, Image, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { User } from "../../../../services/User";
import swal from "sweetalert";
import Sidebar from "../../component/Sidebar";
export default function PendingUser() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await User.getpendinguser();
    console.log(response);
    if (response.data.status == 1) {
      setUser(response.data.data);
    } else {
      setUser([]);
    }
  };

  const handleApproved = async (user_id) => {
    const payload = {
      user_id: user_id,
      status: 1,
    };
    const res = await User.updateStatus(payload);

    if (res.data.status == 1) {
      getUser();
      swal("Succcess", "Successfully Approved", "success");
    } else {
      swal("Error", "Something went wrong please try again later", "error");
    }
  };

  return (
    <Sidebar>
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
              <td>Action</td>
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
                  <Button onClick={() => handleApproved(val.user_id)}>
                    Approved
                  </Button>
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
