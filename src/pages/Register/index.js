import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Stack,
  Navbar,
  ButtonGroup,
} from "react-bootstrap";
import { Navigation, SizeBox, TextInput, Button } from "../../components";
import * as S from "./style";
import swal from "sweetalert";
import { User } from "../../services/User";
import HeaderText from "../../components/HeaderText";
import Text from "../../components/Text";
import { Link } from "react-router-dom";

export default function Register() {
  const [img, setImage] = useState(null);

  const [user, setUser] = useState({
    username: "",
    password: "",
    cpassword: "",
    email: "",
    contact: "",
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    birthdate: "",
    address: "",
  });

  const onImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function register() {
    console.log(user);
    if (
      user.username === "" ||
      user.password === "" ||
      user.cpassword === "" ||
      user.email === "" ||
      user.contact === "" ||
      user.firstname === "" ||
      user.middlename === "" ||
      user.lastname === "" ||
      user.gender === "" ||
      user.birthdate === "" ||
      user.address === ""
    ) {
      swal("Warning", "Fill out all fields");
    } else if (user.password !== user.cpassword) {
      swal("Warning", "Password do not match");
    } else {
      const formdata = new FormData();
      formdata.append("username", user.username);
      formdata.append("password", user.password);
      formdata.append("firstname", user.firstname);
      formdata.append("mi", user.middlename);
      formdata.append("lastname", user.lastname);
      formdata.append("gender", user.gender);
      formdata.append("birthdate", user.birthdate);
      formdata.append("address", user.address);
      formdata.append("email", user.email);
      formdata.append("contact", user.contact);
      formdata.append("profilePicture", img);

      const response = await User.register(formdata);
      if (response.data.status == "1") {
        swal("Success", response.data.message, "success").then((val) => {
          window.location.href = "/login";
        });
      } else {
        swal("Error", response.data.message, "error");
      }
    }
  }

  return (
    <>
      <Navigation />
      <Container>
        <Row>
          <Col lg="3">
            <SizeBox height={50} />
            <S.ImageContainer>
              {img ? (
                <S.Image src={URL.createObjectURL(img)} alt={"Profile Pic"} />
              ) : (
                <S.defaultImage />
              )}
            </S.ImageContainer>

            <TextInput type="file" name="img" onChange={onImageChange} />
          </Col>
          <Col lg="7">
            <SizeBox height={50} />
            <HeaderText>Account Details</HeaderText>
            <Row>
              <Col>
                <TextInput
                  name="username"
                  placeholder="Enter username"
                  label="Username"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  name="password"
                  placeholder="Enter password"
                  label="Password"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  name="cpassword"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  onChange={onChange}
                />
              </Col>
            </Row>
            <SizeBox height={10} />
            <Row>
              <Col>
                <TextInput
                  name="email"
                  placeholder="Enter email"
                  label="Email"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  name="contact"
                  placeholder="Enter contact number"
                  label="Contact Number"
                  onChange={onChange}
                />
              </Col>
            </Row>
            <SizeBox height={18} />
            <HeaderText>Personal Information</HeaderText>
            <Row>
              <Col>
                <TextInput
                  name="firstname"
                  placeholder="Enter firstname"
                  label="Firstname"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  name="middlename"
                  placeholder="Enter middlename"
                  label="Middlename"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  name="lastname"
                  placeholder="Enter lastname"
                  label="Lastname"
                  onChange={onChange}
                />
              </Col>
            </Row>
            <SizeBox height={10} />
            <Row>
              <Col>
                <Form.Label>Gender</Form.Label>
                <Form.Select name="gender">
                  <option value="">Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Col>
              <Col>
                <TextInput
                  label="Birthdate"
                  type="date"
                  name="birthdate"
                  onChange={onChange}
                />
              </Col>
            </Row>
            <SizeBox height={10} />
            <TextInput
              name="address"
              label="Address"
              placeholder="St. Brgy City"
              onChange={onChange}
            />
            <SizeBox height={15} />
            <Row>
              <Col>
                {" "}
                <Button onClick={register}>Register</Button>{" "}
              </Col>
              <Col>
                <Text>Register as a</Text>
                <Text>Shop Onwer</Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
