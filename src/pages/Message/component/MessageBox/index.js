import React, { useMemo, useState, useRef, useEffect } from "react";

import { Button, HeaderText, SizeBox, Text } from "../../../../components";
import useGetConvo from "../../../../hooks/useGetConvo";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import { TextArea } from "../../../ViewProduct/style";
import * as S from "./style";
import { Row, Col } from "react-bootstrap";
import { defaultThemes } from "../../../../constants/DefaultThemes";
import { Avatar } from "@mui/material";
import { BASE_URL } from "../../../../services/ApiClient";
import { Messages } from "../../../../services/Messages";

export default function MessageBox(props) {
  const { reciever_id } = props;
  const { data, setIsRefetch } = useGetConvo(reciever_id);
  const { user } = useGetUserFromStorage();
  const [message, setMessage] = useState("");
  const divRef = useRef(null);

  useEffect(() => {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  });

  const recieverInfo = useMemo(() => {
    return data?.filter(
      (item) => reciever_id.toString() === item.reciever_id.toString()
    )[0];
  }, [data]);
  console.log(data);
  const renderItem = useMemo(() => {
    return data.map((val) => (
      <>
        <S.Message
          alignment={
            val.sender_id.toString() === user.user_id.toString()
              ? "flex-end"
              : "flex-start"
          }
        >
          <Row>
            {val.sender_id.toString() !== user.user_id.toString() && (
              <Col>
                <Avatar
                  src={
                    val.shop_id
                      ? BASE_URL + val.logo
                      : BASE_URL + val.profilePic
                  }
                  alt="profile pic"
                />
              </Col>
            )}

            <Col>
              <S.Msg
                background={
                  val.reciever_id.toString() === user.user_id.toString()
                    ? defaultThemes.primary
                    : defaultThemes.secondary
                }
              >
                <S.MsgText>{val.message}</S.MsgText>
              </S.Msg>
            </Col>
          </Row>
          <SizeBox height={10} />
          <S.Label>{val.message_date}</S.Label>
          <div ref={divRef} />
        </S.Message>
      </>
    ));
  }, [data, user]);

  const createMessage = async () => {
    try {
      setIsRefetch(true);
      const payload = {
        sender_id: user?.user_id,
        reciever_id: reciever_id,
        message: message,
      };
      const resp = await Messages.createMessage(payload);
      if (resp.data.status == 1) {
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsRefetch(false);
    }
  };

  function handleSend() {
    createMessage();
  }
  return (
    <S.Container>
      <S.Header>
        <S.TextContainer alignment={"flex-start"}>
          <HeaderText color="white">
            {recieverInfo?.shop_id
              ? recieverInfo?.shopName
              : recieverInfo?.firstname +
                " " +
                recieverInfo?.middlename +
                " " +
                recieverInfo?.lastname}
          </HeaderText>
        </S.TextContainer>
        <S.TextContainer alignment={"flex-end"}>
          <Button onClick={() => (window.location.href = "/")}>
            Back To Home
          </Button>
        </S.TextContainer>
      </S.Header>
      <SizeBox height={15} />
      <S.MessageContainer>{renderItem}</S.MessageContainer>
      <Row>
        <Col md="11">
          <TextArea
            style={{ height: 50 }}
            placeholder="Write Message"
            onChange={(e) => setMessage(e.target.value)}
          ></TextArea>
        </Col>
        <Col md="1">
          <Button onClick={handleSend}>Send</Button>
        </Col>
      </Row>
    </S.Container>
  );
}
