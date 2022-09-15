import React, { useEffect, useState } from "react";
import { Container, Form, Stack, Image, Row, Col } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Navigation, SizeBox, TextInput, Line, Button } from "../../components";
import RemoveIcon from "@mui/icons-material/Remove";
import useGetCartItems from "../../hooks/useActiveItem";
import { BASE_URL } from "../../services/ApiClient";
import { Carts } from "../../services/Cart";
import { getItem, KEY } from "../../utils/storage";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import HeaderText from "../../components/HeaderText";
import Subtitle from "../../components/Subtitle";
import Text from "../../components/Text";
import * as S from "./style";
import ListItem from "../../components/ListItem";
import { formatCurrency } from "../../utils/Money";
import swal from "sweetalert";
export default function Cart() {
  const [item, setItem] = useState([]);
  const [isHalf, setHalf] = useState(0);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = async () => {
    const user = await getItem(KEY.ACCOUNT);
    const resp = await Carts.mycart(user?.user_id);

    if (resp.data.status == 1) {
      setItem(resp.data.data);
    } else {
      setItem([]);
    }
  };

  const displayTotal = () => {
    let total = 0;
    const allItems = [];
    item.forEach((val, i) => {
      const filtered = val.data.filter((x) => x.item_status === "1");
      allItems.push(...filtered);
    });

    allItems.forEach((val) => {
      total += parseFloat(val.totalAmount);
    });
    console.log(allItems);
    return total;
  };

  async function updateStatus(cart_id, status) {
    const payload = {
      cart_id: cart_id,
      status: status,
    };

    const response = await Carts.updateStatus(payload);

    if (response.data.status == 1) {
      getCart();
    }
  }

  async function increment(cart_id) {
    const payload = {
      cart_id,
    };
    const response = await Carts.increment(payload);

    if (response.data.status == 1) {
      getCart();
      return;
    }

    swal("Warning", response?.data?.message, "warning");
  }

  async function decrement(cart_id) {
    const payload = {
      cart_id,
    };
    const response = await Carts.decrement(payload);

    if (response.data.status == 1) {
      getCart();
      return;
    }

    swal("Warning", response?.data?.message, "warning");
  }

  function handleCheckout() {
    window.location.href = "/checkout";
  }

  return (
    <>
      <Navigation />
      <SizeBox height={20} />

      <Container style={{ paddingLeft: "15%", paddingRight: "15%" }}>
        <Stack direction="horizontal">
          <S.TitleContainer>
            <Stack direction="horizontal">
              <div>
                <SizeBox height={10} />
                <HeaderText>My Cart</HeaderText>
              </div>
              <SizeBox width={10} />
            </Stack>
          </S.TitleContainer>
        </Stack>

        <SizeBox height={20} />
        {item.map((val, i) => (
          <>
            <SizeBox height={50} />
            <HeaderText>{val.shopName}</HeaderText>
            {val.data.map((item) => (
              <>
                <S.LineRow key={item.shop_id}>
                  <Col md={2}>
                    <Image
                      src={BASE_URL + item.productImage}
                      width={100}
                      height={100}
                    />
                  </Col>
                  <S.Column>
                    <S.ItemInformation>
                      <Subtitle>{item.productName}</Subtitle>
                      <ListItem
                        label="Product Price"
                        value={formatCurrency(parseFloat(item.price))}
                      />
                    </S.ItemInformation>
                  </S.Column>
                  <S.Column>
                    <Stack direction="horizontal">
                      <S.Box>
                        <IconButton
                          onClick={() => increment(item.cart_id)}
                          size="10"
                        >
                          <AddIcon fontSize="5" />
                        </IconButton>
                      </S.Box>
                      <S.StockBox>
                        <Subtitle>{item.noItem + " " + item.unit}</Subtitle>
                      </S.StockBox>
                      <S.Box>
                        <IconButton onClick={() => decrement(item.cart_id)}>
                          <RemoveIcon />
                        </IconButton>
                      </S.Box>
                    </Stack>
                  </S.Column>
                  <S.Column>
                    <S.TotalAmountContainer>
                      <Subtitle>
                        {formatCurrency(parseFloat(item.totalAmount))}
                      </Subtitle>
                    </S.TotalAmountContainer>
                  </S.Column>
                  <S.Column sm={2}>
                    <S.TotalAmountContainer>
                      <Form.Check
                        onClick={() =>
                          updateStatus(item.cart_id, item.item_status)
                        }
                        checked={item.item_status === "1"}
                      />
                    </S.TotalAmountContainer>
                  </S.Column>
                </S.LineRow>
                <SizeBox height={20} />
              </>
            ))}
          </>
        ))}
        <h3 style={{ textAlign: "right" }}>
          {formatCurrency(+displayTotal())}
        </h3>
        <Button onClick={handleCheckout}>Checkout</Button>
      </Container>
    </>
  );
}
