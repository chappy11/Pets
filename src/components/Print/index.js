import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../Button";
import Text from "../Text";
import SizeBox from "../SizeBox";
import * as S from "./style";
import { getCurrentDate } from "../../utils/date";

export default function Print(props) {
  const compref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => compref.current,
  });

  return (
    <div>
      <S.Container ref={compref}>
        <S.Title>Pet Society</S.Title>
        <S.Header>
          <S.SideContainer>
            <Text>Print By: {props?.fullName}</Text>
          </S.SideContainer>
          <S.SideContainer justification="flex-end">
            <Text alignText={"right"}>Date: {getCurrentDate()}</Text>
          </S.SideContainer>
        </S.Header>

        <SizeBox height={10} />
        {props.children}
      </S.Container>
      <S.Header>
        <S.SideContainer>
          <Button onClick={() => handlePrint()}>Print Now</Button>
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
