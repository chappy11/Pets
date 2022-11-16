import React, { useMemo } from "react";
import HeaderText from "../../../HeaderText";
import ListItem from "../../../ListItem";
import SizeBox from "../../../SizeBox";

export default function AccountInfo(props) {
  const { data } = props;

  const email = useMemo(() => {
    if (data?.isShop) {
      return data?.shopEmail;
    }

    return data?.email;
  }, [data?.isShop, data?.shopEmail, data?.email]);

  return (
    <>
      <HeaderText>Account Information</HeaderText>
      <SizeBox height={10} />
      <ListItem label="Username" value={data?.username} alignment="flex-end" />
      <SizeBox height={10} />
      <ListItem label="Email" value={email} alignment="flex-end" />
      <SizeBox height={10} />
    </>
  );
}
