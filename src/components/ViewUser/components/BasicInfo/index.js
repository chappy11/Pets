import React, { useMemo } from "react";
import HeaderText from "../../../HeaderText";
import ListItem from "../../../ListItem";
import SizeBox from "../../../SizeBox";

export default function BasicInfo(props) {
  const { data } = props;
  const name = useMemo(() => {
    if (data?.isShop) {
      return (
        data?.ownerFirstName +
        " " +
        data?.ownerMiddleName +
        " " +
        data?.ownerLastName
      );
    }
    return data?.firstname + " " + data?.middlename + " " + data?.lastname;
  }, [data]);

  const displayUserData = useMemo(() => {
    if (!data?.isShop) {
      return (
        <>
          <ListItem label="Gender" value={data?.gender} alignment="flex-end" />
          <SizeBox height={10} />
          <ListItem
            label="Birthdate"
            value={data?.birthdate}
            alignment="flex-end"
          />
        </>
      );
    }
  }, [data]);

  const address = useMemo(() => {
    if (data?.isShop) {
      return data?.shopAddress;
    }

    return data?.addresss;
  }, [data]);

  const contact = useMemo(() => {
    if (data?.isShop) {
      return data?.shopContact;
    }

    return data?.contact;
  }, [data]);

  return (
    <>
      <HeaderText>Basic Information</HeaderText>
      <SizeBox height={15} />
      <ListItem label="Name" value={name} alignment="flex-end" />
      <SizeBox height={10} />
      {displayUserData}
      <SizeBox height={10} />
      <ListItem label="Contact Number" value={contact} alignment="flex-end" />
      <SizeBox height={10} />
      <ListItem label="Address" value={address} alignment="flex-end" />
      <SizeBox height={10} />
    </>
  );
}
