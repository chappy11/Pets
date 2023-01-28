import React from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Button,
  HeaderText,
  Loading,
  Navigation,
  SizeBox,
  Text,
  TextInput,
} from "../../components";
import usePrompts from "../../hooks/usePrompts";
import { Email } from "../../services/Email";
import * as S from "./style";

export default function Otp() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [data, setData] = useState(null);
  const { alertSuccess, alertError, alertWithCallBack } = usePrompts();

  const sendOpt = async () => {
    if (email === "") {
      alertError("Fill out all fields");
      return;
    }
    try {
      setIsLoading(true);
      const sixDigit = Math.floor(100000 + Math.random() * 900000);

      const payload = {
        email: email,
        code: sixDigit,
      };

      const resp = await Email.sendOtp(payload);

      if (resp.data.status == "1") {
        alertSuccess(resp.data.message);
        setData(resp.data.data);
        setCode(sixDigit);
        setOpen(true);
        return;
      }

      alertError(resp.data.message);
    } catch (error) {
      console.log(error);
      alertError();
    } finally {
      setIsLoading(false);
    }
  };

  function handleOtp() {
    sendOpt();
  }

  function validate() {
    console.log("CODE", code);
    console.log("input", inputCode);
    if (code == inputCode) {
      alertWithCallBack({
        title: "Validated",
        type: "success",
        onConfirm: () =>
          (window.location.href = `/forgotpassword/${data[0].user_id}`),
      });
      return;
    }

    alertError("Code didn't match");
  }
  return (
    <>
      <Navigation />
      <S.Customize>
        <Loading isLoading={isLoading} />
        <Modal show={open}>
          <Modal.Header>
            <HeaderText>OTP</HeaderText>
          </Modal.Header>
          <Modal.Body>
            <S.Input
              size="lg"
              placeholder="OTP"
              onChange={(e) => setInputCode(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => validate()}>Confirm</Button>
            <Button color="red">Close</Button>
          </Modal.Footer>
        </Modal>
        <S.Container>
          <HeaderText>Validation</HeaderText>
          <SizeBox height={15} />
          <Text>You must enter your email to verify first</Text>
          <TextInput
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <SizeBox height={15} />
          <Button onClick={() => handleOtp()}>Send Code</Button>
        </S.Container>
      </S.Customize>
    </>
  );
}
