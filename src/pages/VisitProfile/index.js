import { Button, HeaderText, Text, TextInput } from "../../components";
import { useState } from "react";
import { MessageConnection } from "../../services/MessageConnection";
import * as S from "./style";
import { Navigation, SizeBox, ListItem } from "../../components";
import { useParams } from "react-router-dom";
import useGetShopData from "../../hooks/useGetShopData";
import { BASE_URL } from "../../services/ApiClient";
import { Mail } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { Modal } from "react-bootstrap";
import { TextArea } from "../ViewProduct/style";
import { getItem, KEY } from "../../utils/storage";
import usePrompts from "../../hooks/usePrompts";
import { Messages } from "../../services/Messages";

export default function VisitProfile() {
  const { id } = useParams();
  const { data } = useGetShopData(id);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { alertError, alertSuccess } = usePrompts();

  const sendMessage = async () => {
    try {
      const user = await getItem(KEY.ACCOUNT);

      const payload = {
        message,
        customer_id: user?.customer_id,
        shop_id: data?.shop_id,
        sender: user?.user_roles,
      };

      const resp = await MessageConnection.sendmessage(payload);
      if (resp.data.status == 1) {
        alertSuccess("Success sent");
      }
    } catch (e) {
      alertError();
    }
  };

  function handleSend() {
    sendMessage();
  }
  return (
    <>
      <Navigation />
      <S.MainContainer>
        <HeaderText>Profile</HeaderText>
        <Modal show={isOpen}>
          <Modal.Header>
            <HeaderText>Send {data?.shopName}</HeaderText>
          </Modal.Header>
          <Modal.Body>
            <TextArea
              placeholder="Write Something..."
              onChange={(e) => setMessage(e.target.value)}
            ></TextArea>
          </Modal.Body>
          <Modal.Footer>
            <Button color="red" onClick={() => setIsOpen(false)}>
              Close
            </Button>

            <Button onClick={() => handleSend()}>
              <SendIcon /> Send
            </Button>
          </Modal.Footer>
        </Modal>
        <S.ImageContainer>
          <S.Image src={BASE_URL + data?.logo} />
          <SizeBox height={15} />
          <S.Text>{data?.shopName}</S.Text>
          <Button onClick={() => setIsOpen(true)}>
            <Mail /> Message
          </Button>
          <SizeBox height={20} />
          <Text>{data?.shopDescription}</Text>
        </S.ImageContainer>
        <SizeBox height={20} />

        <HeaderText>Basic Info</HeaderText>
        <S.Information>
          <ListItem
            label="Name"
            alignment="flex-end"
            value={
              data?.ownerFirstName +
              " " +
              data?.ownerMiddleName +
              " " +
              data?.ownerLastName
            }
          />
          <SizeBox height={10} />
          <ListItem
            label="Email"
            alignment="flex-end"
            value={data?.shopEmail}
          />
          <SizeBox height={10} />
          <ListItem
            label="Address"
            alignment="flex-end"
            value={data?.shopAddress}
          />
          <SizeBox height={10} />
          <ListItem
            label="Contact Number"
            alignment="flex-end"
            value={data?.shopContact}
          />
        </S.Information>
      </S.MainContainer>
    </>
  );
}
