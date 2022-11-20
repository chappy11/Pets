import React from "react";
import { useState, useMemo } from "react";
import { HeaderText, SizeBox, TextInput, Button } from "../../../components";
import Password from "../../../components/Password";
import useGetUserFromStorage from "../../../hooks/useGetUserFromStorage";
import { BASE_URL } from "../../../services/ApiClient";
import usePrompts from "../../../hooks/usePrompts";

import Sidebar from "../../MyShop/components/Sidebar";
import * as S from "./style";
import { Shop } from "../../../services/Shop";
import { User } from "../../../services/User";
import { save } from "../../../utils/storage";

export default function UpdateShop() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useGetUserFromStorage({ isRefresh: isLoading });
  const [profile, setProfile] = useState(null);
  const { alertError, alertSuccess, alertWarning } = usePrompts();
  const [shopData, setShopData] = useState({
    shopName: "",
    shopDescription: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const passwordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };
  const displayImage = useMemo(() => {
    if (!profile) {
      return <S.Image src={BASE_URL + user?.logo} />;
    }

    return <S.Image src={URL.createObjectURL(profile)} />;
  }, [user, profile, setProfile]);

  const onChange = (e) => {
    setShopData({ ...shopData, [e.target.name]: e.target.value });
  };

  const updateLogo = async () => {
    try {
      setIsLoading(true);
      if (!profile) {
        alertWarning("You must upload profile picture");
        return;
      }
      var formdata = new FormData();
      formdata.append("id", user?.shop_id);
      formdata.append("shopLogo", profile);
      const resp = await Shop.updateLogo(formdata);

      if (resp.data.status == "1") {
        await save(resp.data.data[0]);
        setProfile(null);
        // window.location.reload();
        alertSuccess(resp.data.message);

        return;
      }
    } catch (e) {
      console.log(e);
      alertError();
    } finally {
      setIsLoading(false);
    }
  };

  const updateDetails = async () => {
    try {
      setIsLoading(true);
      const payload = {
        shopName: shopData.shopName,
        shopDescription: shopData.shopDescription,
      };

      const resp = await User.update(user?.user_id, payload);

      if (resp.data.status == "1") {
        await save(resp.data.data);
        alertSuccess(resp.data.message);
        return;
      }

      alertError();
    } catch (e) {
      console.log(e);
      alertError();
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async () => {
    try {
      if (
        passwordData.password === "" ||
        passwordData.oldPassword === "" ||
        passwordData.confirmPassword === ""
      ) {
        alertWarning("Fill out all fields");
        return;
      }

      if (passwordData.oldPassword !== user?.password) {
        alertWarning("Old password do not match");
        return;
      }

      if (passwordData.password !== passwordData.confirmPassword) {
        alertWarning("Password do not match");
        return;
      }
      const payload = {
        password: passwordData.password,
        id: user?.user_id,
      };
      const resp = await User.changePass(payload);

      if (resp.data.status == "1") {
        alertSuccess(resp.data.message);
        return;
      }

      alertError();
    } catch (e) {
      console.log(e);
      alertError();
    }
  };

  function handleUpdateLogo() {
    updateLogo();
  }

  function handleUpdateDetails() {
    updateDetails();
  }

  function handleChangePass() {
    changePassword();
  }

  return (
    <Sidebar>
      <S.CustomCustomize>
        <HeaderText>Update Shop</HeaderText>
        <S.Header>
          {displayImage}
          <S.TextInputContainer>
            <TextInput
              type="file"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </S.TextInputContainer>
          <SizeBox height={15} />
          <Button onClick={handleUpdateLogo}>Change Shop Logo</Button>
        </S.Header>
      </S.CustomCustomize>
      <SizeBox height={15} />
      <S.CustomCustomize>
        <HeaderText>Update Shop Details</HeaderText>
        <S.Header>
          <S.InputContainer>
            <TextInput
              placeholder={user?.shopName}
              label="Shop Name"
              onChange={onChange}
              name="shopName"
            />
            <SizeBox height={10} />
            <TextInput
              placeholder={user?.shopDescription}
              as="textarea"
              name="shopDescription"
              rows={3}
              onChange={onChange}
              label="Shop Description"
            />
            <SizeBox height={15} />
            <Button onClick={handleUpdateDetails}>Update Shop</Button>
          </S.InputContainer>
        </S.Header>
        <SizeBox height={30} />
      </S.CustomCustomize>
      <SizeBox height={15} />
      <S.CustomCustomize>
        <HeaderText>Account Details</HeaderText>
        <S.Header>
          <S.InputContainer>
            <Password
              label="Old Password"
              name="oldPassword"
              onChange={passwordChange}
            />
            <SizeBox height={10} />
            <Password
              label="Password"
              onChange={passwordChange}
              name="password"
            />
            <SizeBox height={10} />
            <Password
              label="Confirm Password"
              onChange={passwordChange}
              name="confirmPassword"
            />
            <SizeBox height={15} />
            <Button onClick={handleChangePass}>Change Password</Button>
          </S.InputContainer>
        </S.Header>
      </S.CustomCustomize>
      <SizeBox height={100} />
    </Sidebar>
  );
}
