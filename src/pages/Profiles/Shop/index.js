import {
  Container,
  HeaderText,
  ListItem,
  SizeBox,
  Text,
} from "../../../components";
import Sidebar from "../../MyShop/components/Sidebar";
import { Col, Row } from "react-bootstrap";
import * as S from "./style";
import { BASE_URL } from "../../../services/ApiClient";

export default function Shop(props) {
  const {
    logo,
    shopName,
    shopEmail,
    shopDescription,
    ownerFirstName,
    ownerLastName,
    ownerMiddleName,
    shopAddress,
    shopContact,
    username,
    password,
  } = props.user;

  const formatPassword = () => {
    let hashPass = "";
    for (let i = 0; i <= password.length; i++) {
      hashPass += "*";
    }
    return hashPass;
  };

  return (
    <Sidebar>
      <Container>
        <HeaderText>Profile</HeaderText>
        <Row>
          <Col md={4}>
            <S.ImageContainer>
              <S.Image src={BASE_URL + logo} />
              <SizeBox height={15} />
              <HeaderText>{shopName}</HeaderText>
              <Text>{shopDescription}</Text>
            </S.ImageContainer>
            <SizeBox height={15} />
            <HeaderText>Owner Information</HeaderText>
            <ListItem
              label="Firstname"
              alignment="flex-end"
              value={ownerFirstName}
            />
            <SizeBox height={10} />
            <ListItem
              label="Middlname"
              alignment="flex-end"
              value={ownerMiddleName}
            />
            <SizeBox height={10} />
            <ListItem
              label="Lastname"
              alignment="flex-end"
              value={ownerLastName}
            />
          </Col>
          <Col md={1}></Col>
          <Col md={7}>
            <HeaderText>Shop Information</HeaderText>
            <SizeBox height={10} />
            <ListItem label="Shop Name" alignment="flex-end" value={shopName} />
            <SizeBox height={10} />
            <ListItem
              label="Shop Email"
              alignment="flex-end"
              value={shopEmail}
            />
            <SizeBox height={10} />
            <ListItem
              label="Shop Contact"
              alignment="flex-end"
              value={shopContact}
            />
            <SizeBox height={10} />
            <ListItem
              label="Shop Address"
              alignment="flex-end"
              value={shopAddress}
            />
            <SizeBox height={20} />
            <HeaderText>Account Information</HeaderText>
            <SizeBox height={15} />
            <ListItem label="Username" alignment="flex-end" value={username} />
            <SizeBox height={15} />
            <ListItem
              label="Password"
              alignment="flex-end"
              value={formatPassword(password)}
            />
          </Col>
        </Row>
        <SizeBox height={25} />
      </Container>
    </Sidebar>
  );
}
