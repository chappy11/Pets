import React, { useState } from "react";
import { Container, Row, Col, Form, Modal } from "react-bootstrap";
import {
  Navigation,
  SizeBox,
  TextInput,
  Button,
  Loading,
  Line,
} from "../../components";
import * as S from "./style";

import { User } from "../../services/User";
import HeaderText from "../../components/HeaderText";
import Text from "../../components/Text";

import usePrompts from "../../hooks/usePrompts";
import {
  emailIsvalid,
  isContainNumberAndSpecialCharacter,
  isContainNumber,
  isInvalidMobileNumber,
} from "../../utils/String";
import { Email } from "../../services/Email";
import { defaultThemes } from "../../constants/DefaultThemes";
import { Pets, TrySharp } from "@mui/icons-material";

export default function Register() {
  const [img, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [sixDigitCode, setSixDigitCode] = useState(null);
  const [code, setCode] = useState("");
  const { alertSuccess, alertError, alertWarning, alertWithCallBack } =
    usePrompts();
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

  function validaDate() {
    openVerification();
  }

  function isInvalidateMobileNumber(mobile) {
    const isFirstNumberIsZero = mobile[0] !== "0";
    const isSecondNumberIsNine = mobile[9] !== "9";
    const isLengthEleven = mobile.length !== 11;

    return isFirstNumberIsZero && isSecondNumberIsNine && isLengthEleven;
  }

  async function openVerification() {
    setIsOpen(false);
    if (!img) {
      alertWarning("Profile Picture is Required");
    } else if (
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
      alertWarning("Fill Out all fields");
    } else if (user?.username.indexOf(" ") > 0) {
      alertWarning("Username should not include whitespaces");
    } else if (user?.password.indexOf(" ") > 0) {
      alertWarning("Password should not incude whitespaces");
    } else if (!emailIsvalid(user.email)) {
      alertWarning("Email is Invalid");
    } else if (isInvalidateMobileNumber(user?.contact)) {
      alertWarning("Invalid Mobile Number");
    } else if (
      isContainNumber(user.firstname) ||
      isContainNumberAndSpecialCharacter(user.firstname)
    ) {
      alertWarning(
        "Invalid Firstname should not contain number and special character"
      );
    } else if (user?.password.match(/^[A-Za-z]\w{7,14}$/)) {
      alertWarning(
        "Password should password between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"
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
    } else if (isInvalidMobileNumber(user.contact)) {
      alertWarning("Mobile Number is Invalid");
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
        if (res.data.status == 1) {
          alertSuccess("We send you a verification code");
          await setIsOpen(true);
          return;
        }

        alertError(res.data.message);
      } catch (e) {
        alertError();
      } finally {
        setIsLoading(false);
      }
    }
  }

  async function register() {
    try {
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
        alertWithCallBack({
          title: "Register",
          type: "success",
          btnTextConfirm: "Login Now",
          message: "Your  account has been reviewed by the administrator",
          onConfirm: () => (window.location.href = "/login"),
        });
      } else {
        alertError(response.data.message);
      }
    } catch (e) {
      console.log(e);
      alertError();
    }
  }

  function handleVerify() {
    if (code != sixDigitCode) {
      alertError("Invalid Code. Please check your email and try again");
      return;
    }

    register();
  }

  return (
    <>
      <Navigation />
      <Loading isLoading={isLoading} />
      <Modal show={isOpen}>
        <Modal.Header>
          <HeaderText>Verification Code</HeaderText>
        </Modal.Header>
        <Modal.Body>
          <TextInput
            label="Verification Code"
            placeholder="6 digit code"
            onChange={(e) => setCode(e.target.value)}
          />

          <S.ResendContainer>
            <Text textAlign="center">Dont Receive any email?</Text>
            <S.Link onClick={openVerification}>Resend</S.Link>
          </S.ResendContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleVerify}>Verify</Button>
          <Button
            color={defaultThemes.secondary}
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <S.CustomeContainer>
        <S.CustomRow>
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
          <S.CustomeColumn lg="7">
            <div>
              <SizeBox height={50} />
              <HeaderText>
                <Pets color={defaultThemes.secondary} /> Sign up
              </HeaderText>
              <Line />
              <SizeBox height={20} />
              <Text>
                If you're a shop owner you can register your shop here{" "}
                <a href="/createshop">Create Shop</a>
              </Text>
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
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    label="Password"
                    onChange={onChange}
                  />
                </Col>
                <Col>
                  <TextInput
                    name="cpassword"
                    type="password"
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
                  <Form.Select name="gender" onChange={onChange}>
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
                  <Button onClick={validaDate}>Register</Button>{" "}
                </Col>
              </Row>
            </div>
          </S.CustomeColumn>
        </S.CustomRow>
      </S.CustomeContainer>
    </>
  );
}
