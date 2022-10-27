import React, { useState } from "react";
import { Row, Container, Col, Modal } from "react-bootstrap";
import {
  Line,
  Navigation,
  SizeBox,
  TextInput,
  Button,
  Loading,
} from "../../components";
import StoreIcon from "@mui/icons-material/Store";
import swal from "sweetalert";
import * as S from "./style";
import { User } from "../../services/User";
import HeaderText from "../../components/HeaderText";
import Subtitle from "../../components/Subtitle";

import { Email } from "../../services/Email";
import usePrompts from "../../hooks/usePrompts";
import {
  isContainNumber,
  isContainNumberAndSpecialCharacter,
  emailIsvalid,
  isMobileNumberValid,
} from "../../utils/String";
import { defaultThemes } from "../../constants/DefaultThemes";

export default function CreateShop() {
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState(null);
  const { alertSuccess, alertError, alertWarning, alertWithCallBack } =
    usePrompts();
  const [sixDigitCode, setSixDigitCode] = useState(null);

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
    shippingFee: 35,
  });

  const [shop, setShop] = useState({});
  const onImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function handleClick() {
    openVerification();
  }

  async function openVerification() {
    setIsOpen(false);
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
      alertWarning("Please fillout all fields");
    } else if (!img) {
      alertWarning("Please choose your logo");
    } else if (!emailIsvalid(user.email)) {
      alertWarning("Invalid Email");
    } else if (!isMobileNumberValid(user.contact)) {
      alertWarning("Invalid Mobile Number");
    } else if (
      isContainNumber(user.firstname) ||
      isContainNumberAndSpecialCharacter(user.firstname)
    ) {
      alertWarning(
        "Invalid Firstname should not contain number and special character"
      );
    } else if (
      isContainNumber(user.middlename) ||
      isContainNumberAndSpecialCharacter(user.middlename)
    ) {
      alertWarning(
        "Invalid Middlename should not contain number and special character"
      );
    } else if (
      isContainNumber(user.lastname) ||
      isContainNumberAndSpecialCharacter(user.lastname)
    ) {
      alertWarning(
        "Invalid Lastname should not contain number and special character"
      );
    } else if (user.password !== user.cpassword) {
      alertWarning("Password do not match");
    } else if (user.password.length < 8) {
      alertWarning("Password should be 8 characters");
    } else {
      try {
        setIsLoading(true);
        const sixDigit = Math.floor(100000 + Math.random() * 900000);
        setSixDigitCode(sixDigit);
        const payload = {
          username: user.username,
          email: user.email,
          code: sixDigit,
        };
        const res = await Email.emailVerification(payload);
        console.log("Response", res);
        if (res.data.status == 1) {
          alertSuccess("We send you a verification code");
          await setIsOpen(true);
          return;
        }
      } catch (e) {
        alertError();
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function handleSubmit() {
    if (code != sixDigitCode) {
      alertError("Invalid code please check you email again");
      return;
    }
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
    if (response.data.status == 1) {
      alertWithCallBack({
        title: "Registered",
        message: "Successfully Registered",
        icon: "success",
        btnTextConfirm: "Login Now",
        onConfirm: () => (window.location.href = "/login"),
      });
    } else {
      swal("Error", response.data.message, "error");
    }
  }

  console.log("CODE", sixDigitCode);
  console.log("INPUTED", code);

  return (
    <>
      <Loading isLoading={isLoading} />
      <Navigation />
      <S.CustomContainer>
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
                onChange={(e) => setCode(e.target.value)}
              />
            </S.InputContainer>

            <SizeBox height={10} />

            <div className="d-grid gap-2">
              <S.VerificationMessage>
                Didn't recieve the code?
              </S.VerificationMessage>

              <S.LinkButton size="sm" onClick={openVerification}>
                Resend
              </S.LinkButton>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit}>Verify</Button>
            <Button
              color={defaultThemes.secondary}
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </Modal.Footer>
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
          <S.CustomColumn md="7">
            <div>
              <HeaderText>
                <StoreIcon /> Create Shop
              </HeaderText>
              <Line />
              <SizeBox height={20} />
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
                    name="password"
                    placeholder="Enter password"
                    label="Password"
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
              </Row>
              <Row>
                <Col>
                  <TextInput
                    name="contact"
                    placeholder="09XXXXXXXXX"
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
              <TextInput
                name="shippingFee"
                type="number"
                placeholder={user.shippingFee}
                label="Shop Shipping Fee"
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
              <Button onClick={handleClick}>Create Shop</Button>
            </div>
          </S.CustomColumn>
        </Row>
      </S.CustomContainer>
    </>
  );
}
