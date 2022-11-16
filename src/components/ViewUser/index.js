import Container from "../Container";
import Header from "./components/Header";
import React, { useMemo } from "react";
import AccountInfo from "./components/AccountInfo";
import BasicInfo from "./components/BasicInfo";
import * as S from "./style";
import SizeBox from "../SizeBox";
export default function ViewUser(props) {
  const { data } = props;

  return (
    <S.CustomeContainer>
      <Header data={data} />
      <SizeBox height={15} />
      <AccountInfo data={data} />
      <SizeBox height={15} />
      <BasicInfo data={data} />
    </S.CustomeContainer>
  );
}
