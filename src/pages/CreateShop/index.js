import React, { useState } from "react";
import { Row, Container, Col, Button, Modal } from "react-bootstrap";
import { Navigation, SizeBox, TextInput } from "../../components";
import swal from "sweetalert";
import * as S from "./style";
import { User } from "../../services/User";
import HeaderText from "../../components/HeaderText";
import Subtitle from "../../components/Subtitle";
import { Text } from "../../components/HeaderText/style";
import { Email } from "../../services/Email";
import { AlertModal } from "../../components/AlertModal";
export default function CreateShop() {
  const [img, setImg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    cpassword: "",
    email: "",
    contact: "",
    firstname: "",
    middlename: "",
    lastname: "",
    name: "",
    description: "",
    address: "",
  });

  const [shop, setShop] = useState({});
  const onImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  async function openVerification() {
    if (
      user.username === "" ||
      user.password === "" ||
      user.cpassword === "" ||
      user.email === "" ||
      user.contact === "" ||
      user.firstname === "" ||
      user.middlename === "" ||
      user.lastname === "" ||
      user.name === "" ||
      user.description === "" ||
      user.address === ""
    ) {
      swal("Warning", "Fill out all fields", "warning");
    } else if (user.password !== user.cpassword) {
      swal("Warning", "Password do not match");
    } else {
      try {
        const sixDigit = Math.floor(100000 + Math.random() * 900000);
        const payload = {
          email: user.email,
          code: sixDigit,
        };
        const res = await Email.emailVerification(payload);
        if (res.data.status == 1) {
          AlertModal.success({ message: "We send you a verification code" });
          await setIsOpen(true);
          return;
        }
      } catch (e) {}
    }
  }
  async function handleSubmit() {
    console.log(user);

    const formdata = new FormData();
    formdata.append("username", user.username);
    formdata.append("password", user.password);
    formdata.append("firstname", user.firstname);
    formdata.append("middlename", user.middlename);
    formdata.append("lastname", user.lastname);
    formdata.append("shopDescription", user.description);
    formdata.append("shopName", user.name);
    formdata.append("address", user.address);
    formdata.append("shopEmail", user.email);
    formdata.append("contact", user.contact);
    formdata.append("shopLogo", img);

    const response = await User.createshop(formdata);
    console.log("WEW", response);
    if (response.data.status == 1) {
      swal("Success", response.data.message, "success").then((val) => {
        window.location.href = "/login";
      });
    } else {
      swal("Error", response.data.message, "error");
    }
  }

  return (
    <>
      <Navigation />
      <Container>
        <Modal show={isOpen} aria-labelledby="contained-modal-title-vcenter">
          <Modal.Header>
            <HeaderText>Email Verification</HeaderText>
          </Modal.Header>
          <Modal.Body>
            <Subtitle>
              Please Check your email we send you a verfication code
            </Subtitle>
            <SizeBox height={5} />
            <S.InputContainer>
              <TextInput
                type="number"
                placeholder="Enter the 6 Digit code here"
              />
            </S.InputContainer>

            <SizeBox height={10} />

            <div className="d-grid gap-2">
              <S.VerificationMessage>
                Didn't recieve the code?
              </S.VerificationMessage>

              <Button variant="link" size="sm">
                Resend
              </Button>
              <Button>Verify</Button>
              <Button variant="danger" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <SizeBox height={20} />
        <Row>
          <Col lg="3">
            <S.ImageContainer>
              {img ? (
                <S.Image src={URL.createObjectURL(img)} alt="LOGO" />
              ) : (
                <S.NoImage />
              )}
            </S.ImageContainer>
            <SizeBox height={15} />
            <TextInput type="file" name="img" onChange={onImageChange} />
          </Col>
          <Col md="7">
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
                  type="password"
                  name="cpassword"
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  label="Password"
                  onChange={onChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <TextInput
                  name="contact"
                  placeholder="Enter contact number"
                  label="Contact Number"
                  onChange={onChange}
                />
              </Col>
              <Col>
                <TextInput
                  name="email"
                  placeholder="Enter your Email"
                  label="Shop Email Address"
                  onChange={onChange}
                />
              </Col>
            </Row>
            <SizeBox height={10} />

            <SizeBox height={15} />
            <HeaderText>Shop Details</HeaderText>
            <TextInput
              name="name"
              placeholder="Enter shop name"
              label="Shop Name"
              onChange={onChange}
            />
            <SizeBox height={10} />
            <TextInput
              name="description"
              placeholder="Enter shop description"
              label="Shop Description"
              onChange={onChange}
            />
            <SizeBox height={15} />
            <HeaderText>Personal Information</HeaderText>
            <SizeBox height={12} />
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
            <TextInput
              name="address"
              label="Address"
              placeholder="St. Brgy City"
              onChange={onChange}
            />
            <SizeBox height={15} />
            <Button onClick={openVerification}>Register</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
