import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigation, Container, HeaderText, SizeBox } from "../../components";
import { Remarks } from "../../services/Remarks";
import * as S from "./style";

export default function ViewRemarks() {
  const { id } = useParams();

  const [data, setdata] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const resp = await Remarks.getRemarks(id);

      setdata(resp.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <S.CenterDiv>
          <S.RemarksContainer>
            <HeaderText>Remarks</HeaderText>
            <SizeBox height={10} />
            <p>Sorry your order has been decline due to reason:</p>
            <p>{data.remarks}</p>
          </S.RemarksContainer>
        </S.CenterDiv>
      </Container>
    </>
  );
}
