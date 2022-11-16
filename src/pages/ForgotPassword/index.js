import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  HeaderText,
  Loading,
  Navigation,
  Button,
  TextInput,
  SizeBox,
} from "../../components";
import Password from "../../components/Password";
import usePrompts from "../../hooks/usePrompts";
import { User } from "../../services/User";
import * as S from "./style";
export default function ForgotPassword() {
  const { id } = useParams();
  const [isValidate, setIsValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const prompts = usePrompts();

  const changepass = async () => {
    if (pass == "" || cpass == "") {
      prompts.alertWarning("Fill out all fields");
      return;
    }

    if (pass != cpass) {
      prompts.alertWarning("Password didn't match");
      return;
    }

    try {
      const payload = {
        id: id,
        password: pass,
      };
      const resp = await User.changePass(payload);

      if (resp.data.status == "1") {
        prompts.alertWithCallBack({
          title: "Succesfully Updated",
          type: "success",
          message: "You can now login with your account",
          onConfirm: () => (window.location.href = "/login"),
        });
        return;
      }

      prompts.alertError(resp.data.message);
    } catch (e) {
      console.log(e);
      prompts.alertError();
    }
  };

  function handleUpdate() {
    changepass();
  }

  return (
    <>
      <Navigation />
      <Loading isLoading={isLoading} />
      <S.CustomContainer>
        <S.FieldContainer>
          <HeaderText>Change your Password</HeaderText>

          <Password
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            label="Password"
          />
          <SizeBox height={10} />
          <Password
            onChange={(e) => setCpass(e.target.value)}
            placeholder="Confirm Password"
            label="Confirm Password"
          />
          <SizeBox height={15} />
          <Button onClick={() => handleUpdate()}>Confirm Password</Button>
        </S.FieldContainer>
      </S.CustomContainer>
    </>
  );
}
