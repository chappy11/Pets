import React, { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../Button";
import Text from "../Text";
import SizeBox from "../SizeBox";
import * as S from "./style";
import { getCurrentDate } from "../../utils/date";
import useGetUserFromStorage from "../../hooks/useGetUserFromStorage";
import HeaderText from "../HeaderText";

export default function Print(props) {
  const compref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => compref.current,
  });
  const { user } = useGetUserFromStorage();

  return (
    <div>
      <S.Container ref={compref}>
        <S.Title>Pet Society</S.Title>
        <Text alignText="center">{user?.shopAddress}</Text>
        <Text alignText="center">{user?.shopContact}</Text>
        <SizeBox height={20} />
        <S.Header>
          <S.SideContainer>
            <HeaderText>{props?.textHeader}</HeaderText>
          </S.SideContainer>
          <S.SideContainer justification="flex-end">
            <Text alignText={"right"}>Date: {getCurrentDate()}</Text>
          </S.SideContainer>
        </S.Header>

        <SizeBox height={10} />
        {props.children}
        <S.Header>
          <S.SideContainer></S.SideContainer>
          <S.SideContainer justification="flex-end">
            <div>
              <S.Prepare>Prepared By :</S.Prepare>
              <SizeBox height={20} />
              <S.UserName> {" " + props?.fullName + " "}</S.UserName>
            </div>
          </S.SideContainer>
        </S.Header>
      </S.Container>

      <SizeBox height={50} />
      <S.Header>
        <S.SideContainer>
          <Button onClick={() => handlePrint()}>Print</Button>
        </S.SideContainer>
        {props.cancelText && (
          <S.SideContainer justification={"flex-end"}>
            <Button onClick={() => props?.onCancel()} color="red">
              {props?.cancelText}
            </Button>
          </S.SideContainer>
        )}
      </S.Header>
    </div>
  );
}
