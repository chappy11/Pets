import React from "react";
import {
  Container,
  HeaderText,
  ListItem,
  Navigation,
  SizeBox,
  Text,
} from "../../../components";
import { BASE_URL } from "../../../services/ApiClient";
import * as S from "./style";

export default function Customer(props) {
  const {
    username,
    profilePic,
    firstname,
    lastname,
    middlename,
    password,
    email,
    birthdate,
    addresss,
    contact,
  } = props.user;
  const fullname = lastname.concat(",", " ", firstname, " ", middlename);

  const formatPassword = () => {
    let hashPass = "";
    for (let i = 0; i <= password.length; i++) {
      hashPass += "*";
    }
    return hashPass;
  };

  return (
    <>
      <Navigation />
      <S.MainContainer>
        <HeaderText>Profile</HeaderText>
        <S.ImageContainer>
          <S.Image src={BASE_URL + profilePic} />
          <SizeBox height={15} />
          <S.Text>{fullname}</S.Text>
        </S.ImageContainer>
        <SizeBox height={20} />
        <HeaderText>Account Information</HeaderText>
        <S.Information>
          <ListItem label="Username" alignment="flex-end" value={username} />
          <SizeBox height={10} />
          <ListItem
            label="Password"
            alignment="flex-end"
            value={formatPassword()}
          />
        </S.Information>
        <SizeBox height={20} />
        <HeaderText>Basic Info</HeaderText>
        <S.Information>
          <ListItem label="Firstname" alignment="flex-end" value={firstname} />
          <SizeBox height={10} />
          <ListItem
            label="Middlename"
            alignment="flex-end"
            value={middlename}
          />
          <SizeBox height={10} />
          <ListItem label="Lastname" alignment="flex-end" value={lastname} />
          <SizeBox height={10} />
          <ListItem label="Email" alignment="flex-end" value={email} />
          <SizeBox height={10} />
          <ListItem
            label="Contact Number"
            alignment="flex-end"
            value={contact}
          />
          <SizeBox height={10} />
          <ListItem label="Birthdate" alignment="flex-end" value={birthdate} />
          <SizeBox height={10} />
          <ListItem label="Address" alignment="flex-end" value={addresss} />
        </S.Information>
      </S.MainContainer>
    </>
  );
}
