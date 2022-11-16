import React, { useMemo } from "react";
import { BASE_URL } from "../../../../services/ApiClient";
import HeaderText from "../../../HeaderText";
import * as S from "./style";
import Text from "../../../Text";
import SizeBox from "../../../SizeBox";

export default function Header(props) {
  const { data } = props;

  const displayName = useMemo(() => {
    if (data?.isShop) {
      return data?.shopName;
    }

    return data?.firstname + " " + data?.lastname;
  }, [data]);

  const displayDescription = useMemo(() => {
    if (data?.isShop) {
      return <Text textAlign="center">{data?.shopDescription}</Text>;
    }
  }, [data]);

  const image = useMemo(() => {
    if (data?.isShop) {
      return data?.logo;
    }

    return data?.profilePic;
  }, [data]);

  return (
    <S.HeaderContainer>
      <S.Image src={BASE_URL + image} />
      <SizeBox height={20} />
      <HeaderText>{displayName}</HeaderText>
      {displayDescription}
    </S.HeaderContainer>
  );
}
