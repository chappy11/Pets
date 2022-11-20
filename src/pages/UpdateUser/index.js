import React, { useMemo } from "react";
import {
  Button,
  HeaderText,
  Navigation,
  SizeBox,
  TextInput,
} from "../../components";
import { BASE_URL } from "../../services/ApiClient";
import * as S from "./style";
import useGetUserFromStorage from "../../hooks/useGetUserFromStorage";
import { useState } from "react";
import { User } from "../../services/User";
import usePrompts from "../../hooks/usePrompts";
import Password from "../../components/Password";

export default function UpdateUser() {
  const { user } = useGetUserFromStorage();
  const { alertSuccess, alertError, alertWarning } = usePrompts();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const updatepassword = async () => {
    try {
      const payload = {
        password: passwordData.password,
        id: user?.user_id,
      };
      const resp = await User.changePass(payload);

      if (resp.data.status == "1") {
        alertSuccess(resp.data.message);
        return;
      }

      return alertError();
    } catch (e) {
      console.log(e);
      alertError();
    }
  };

  function handleUpdate() {
    if (passwordData.oldPassword !== user?.password) {
      alertWarning("Old Password do not match");
      return;
    }
    if (passwordData.password !== passwordData.confirmPassword) {
      alertWarning("Password Do not match");
      return;
    }

    updatepassword();
  }
  return (
    <>
      <Navigation />
      <SizeBox height={10} />
      <S.CustomeContainer>
        <SizeBox height={20} />
        <S.HeaderContainer>
          <S.TitleContainer>
            <HeaderText>Update Password</HeaderText>
          </S.TitleContainer>
          <SizeBox height={30} />
          <S.TextInputContainer>
            <Password
              label="Your Current Password"
              name="oldPassword"
              placeholder="Enter you current password"
              onChange={onChange}
            />
            <SizeBox height={10} />
            <Password
              label="New Password"
              placeholder="Enter your new password"
              name="password"
              onChange={onChange}
            />
            <SizeBox height={10} />
            <Password
              label="Confirm Password"
              placeholder="Confirm your new password"
              name="confirmPassword"
              onChange={onChange}
            />
          </S.TextInputContainer>
          <SizeBox height={10} />
          <Button onClick={handleUpdate}>Change Password</Button>
          <SizeBox height={20} />
        </S.HeaderContainer>
      </S.CustomeContainer>
    </>
  );
}
