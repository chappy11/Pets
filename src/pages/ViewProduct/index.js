import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatCurrency } from "../../utils/Money";
import {
  Navigation,
  SizeBox,
  TextInput,
  ListItem,
  Button,
} from "../../components";
import { BASE_URL } from "../../services/ApiClient";
import { Product } from "../../services/Product";
import swal from "sweetalert";
import useGetUserFromStorage from "../../hooks/useGetUserFromStorage";
import { Carts } from "../../services/Cart";
import HeaderText from "../../components/HeaderText";
import { defaultThemes } from "../../constants/DefaultThemes";
import Subtitle from "../../components/Subtitle";
import { Icon } from "@mui/material";
import { Box, BoxContainer, ItemRow } from "./style";
import { Add, Remove } from "@mui/icons-material";
export default function ViewProduct() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [noItems, setNoItems] = useState(1);
  const { user } = useGetUserFromStorage();
  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    const response = await Product.getProductById(id);
    if (response.data.status == 1) {
      setData(response.data.data);
    }
  };

  async function handleAddToCart() {
    if (!user) {
      swal("You Should Login First", {
        buttons: {
          cancel: "Cancel",
          catch: {
            text: "Login",
            value: "login",
          },
        },
      }).then((value) => {
        switch (value) {
          case "login":
            window.location.href = "/login";
            break;

          default:
        }
      });

      return;
    }

    const payload = {
      user_id: user.user_id,
      product_id: data.product_id,
      no_item: parseInt(noItems),
    };

    const res = await Carts.addToCart(payload);
    if (res.data.status == 1) {
      swal("Succes", "Successfully Added to you Cart", "success");
    } else {
      swal("Oops", "Something went wrong", "error");
    }
  }

  return (
    <>
      <Navigation />
      <Container>
        <SizeBox height={50} />
        <ItemRow>
          <Col md={4}>
            <HeaderText>Product Information</HeaderText>
            <Image
              width={300}
              height={350}
              src={BASE_URL + data?.productImage}
            />
          </Col>
          <Col md={3}>
            <HeaderText color={defaultThemes.primary}>
              {data?.productName}
            </HeaderText>
            <Subtitle>{data?.productDescription}</Subtitle>
            <SizeBox height={10} />
            <ListItem label={"Stock"} value={data?.stock} />
            <SizeBox height={10} />
            <ListItem
              label="Price"
              value={formatCurrency(+data?.price).toString()}
            />
            <SizeBox height={10} />
            <ListItem label="Vendor" value={data?.shopName} />
            {/* <Row>
              <Col>Stock</Col>
              <Col>{data?.stock + " "}available</Col>
            </Row>
            <Row>
              <text>HI</text>
              <Col>Shop Name</Col>
              <Col>{data?.shopName + ""}</Col>
            </Row> */}

            <SizeBox height={20} />

            <BoxContainer>
              <Box
                color={defaultThemes.secondary}
                fontColor={defaultThemes.white}
              >
                <Add color={defaultThemes.white} />
              </Box>
              <Box borderSize={1}>{noItems}</Box>
              <Box
                color={defaultThemes.primary}
                fontColor={defaultThemes.white}
              >
                <Remove />
              </Box>
            </BoxContainer>

            <SizeBox height={20} />
            <Button>
              <ShoppingCartIcon /> Add to Cart
            </Button>
          </Col>
        </ItemRow>
      </Container>
    </>
  );
}
