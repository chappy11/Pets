import React, { useRef, useMemo } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../Button";
import Text from "../Text";
import SizeBox from "../SizeBox";
import * as S from "./style";
import { getCurrentDate } from "../../utils/date";
import useGetUserFromStorage from "../../hooks/useGetUserFromStorage";
import HeaderText from "../HeaderText";
import { Col, Row } from "react-bootstrap";

const PETLOGO = require("../../asset/logo_edited.png");
export default function Print(props) {
  const compref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => compref.current,
  });
  const { user } = useGetUserFromStorage();

  const displayDate = useMemo(() => {
    return props.dateRange && <p>Date Range: {props.dateRange}</p>;
  }, [props.dateRange]);

  return (
    <div>
      <S.Container ref={compref}>
        <S.Logo src={PETLOGO} />
        <S.Title>Pet Society</S.Title>
        <Text alignText="center">{user?.shopAddress}</Text>
        <Text alignText="center">{user?.shopContact}</Text>
        <SizeBox height={20} />
        <HeaderText textAlign="center" color="grey">
          {props?.textHeader}
        </HeaderText>
        <SizeBox height={40} />
        <S.Header>
          <S.SideContainer>{displayDate}</S.SideContainer>
          <S.SideContainer justification="flex-end">
            <Text alignText={"right"}>Date: {getCurrentDate()}</Text>
          </S.SideContainer>
        </S.Header>

        <SizeBox height={10} />

        {props.children}
        <S.Header>
          <S.SideContainer>
            <div>
              <S.Prepare>Prepared By :</S.Prepare>
              <SizeBox height={20} />
              <S.UserName> {" " + props?.fullName + " "}</S.UserName>
            </div>
          </S.SideContainer>
          <S.SideContainer></S.SideContainer>
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
