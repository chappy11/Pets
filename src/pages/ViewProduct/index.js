import React, { useState, useEffect, useMemo } from "react";
import { Image, Row } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import { formatCurrency } from "../../utils/Money";
import {
  Navigation,
  SizeBox,
  ListItem,
  Button,
  Container,
  Text,
  Line,
} from "../../components";
import { BASE_URL } from "../../services/ApiClient";
import { Product } from "../../services/Product";
import swal from "sweetalert";
import useGetUserFromStorage from "../../hooks/useGetUserFromStorage";
import { Carts } from "../../services/Cart";
import HeaderText from "../../components/HeaderText";
import { defaultThemes } from "../../constants/DefaultThemes";
import Subtitle from "../../components/Subtitle";
import usePrompts from "../../hooks/usePrompts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { Box, BoxContainer, ItemRow } from "./style";
import { Add, Remove } from "@mui/icons-material";
import * as S from "./style";
import { Review } from "../../services/Review";

export default function ViewProduct() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [noItems, setNoItems] = useState(1);
  const { user } = useGetUserFromStorage();
  const { alertError, alertWarning, alertSuccess } = usePrompts();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  useEffect(() => {
    getproduct();
  }, []);

  useEffect(() => {
    getProducts();
  }, [setData, data]);

  useEffect(() => {
    getReviews();
  }, [id, data, setData]);

  const getproduct = async () => {
    const response = await Product.getProductById(id);
    if (response.data.status == 1) {
      setData(response.data.data);
    }
  };

  const getProducts = async () => {
    try {
      let dataNotIncludedCurrent = [];
      const resp = await Product.getProductByShopId(data?.shop_id);
      if (resp.data.status == "1") {
        dataNotIncludedCurrent = resp.data.data.filter(
          (val) => val.product_id !== id
        );

        if (dataNotIncludedCurrent.length > 5) {
          dataNotIncludedCurrent = dataNotIncludedCurrent.slice(1, 5);
        }

        setProducts(dataNotIncludedCurrent);
      }
    } catch (e) {
      alertError();
    }
  };

  const getReviews = async () => {
    try {
      const resp = await Review.getReviews(id);
      if (resp.data.status == "1") {
        setReviews(resp.data.data);
      }
    } catch (e) {
      alertError();
    }
  };

  const reviewChange = (e) => {
    setUserReview(e.target.value);
  };
  async function createReview() {
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

    try {
      const payload = {
        user_id: user?.user_id,
        product_id: id,
        review: userReview,
      };

      const resp = await Review.addReview(payload);

      if (resp.data.status == "1") {
        alertSuccess("Thanks for review..");
        getReviews();
      }
    } catch (e) {
      alertError();
    }
  }

  function handleAddReview() {
    createReview();
  }
  async function handleAddToCart() {
    try {
      setIsLoading(true);
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
        swal("Oops", res.data.message, "error");
      }
    } catch (e) {
      alertError();
    } finally {
      setIsLoading(false);
    }
  }

  const handleIncrement = () => {
    if (!user) {
      alertError("You Have to Log your account first");
      return;
    }

    if (noItems >= data?.stock) {
      alertWarning(
        `The available stock is only ${data?.stock} you cannot add anymore`
      );
      return;
    }
    setNoItems((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (!user) {
      alertError("You Have to Log your account first");

      return;
    }

    if (noItems === 1) {
      alertWarning("You cannot set the item to zero");
      return;
    }

    setNoItems((prev) => prev - 1);
  };

  const displayProducts = useMemo(() => {
    return products.map((val) => (
      <S.CustomizeCard
        onClick={() =>
          (window.location.href = `/viewproduct/${val.product_id}`)
        }
      >
        <S.ImageContainer style={{ width: "100%", height: "150px" }}>
          <S.CardImage src={BASE_URL + val.productImage} />
        </S.ImageContainer>
        <SizeBox height={20} />
        <S.Title>{val.productName}</S.Title>
        <SizeBox height={5} />
        <S.Subtitle>{formatCurrency(+val.price)}</S.Subtitle>
      </S.CustomizeCard>
    ));
  }, [products, setProducts]);

  const displayReview = useMemo(() => {
    return reviews.map((val) => (
      <S.ReviewContainer>
        <Text>
          <AccountCircleIcon /> {val.username}
        </Text>
        <S.ReviewTextContainer>
          <Text>{val.review}</Text>
        </S.ReviewTextContainer>
      </S.ReviewContainer>
    ));
  }, [reviews, setReviews]);

  return (
    <>
      <Navigation isFetch={isLoading} />
      <SizeBox height={10} />
      <Container>
        <SizeBox height={50} />
        <S.TitleText>Product Information</S.TitleText>
        <SizeBox height={20} />
        <ItemRow>
          <S.Column md={6}>
            <Image
              width={300}
              height={350}
              src={BASE_URL + data?.productImage}
            />
          </S.Column>
          <S.Column md={6}>
            <S.InfoContainer>
              <HeaderText color={defaultThemes.primary}>
                {data?.productName}
              </HeaderText>
              <Line />
              <SizeBox height={10} />
              <ListItem
                label={"Stock"}
                value={data?.stock + " " + data?.unit + " available"}
              />
              <SizeBox height={10} />
              <ListItem
                label="Price"
                value={formatCurrency(+data?.price).toString()}
              />
              <SizeBox height={10} />
              <ListItem label="Vendor" value={data?.shopName} />
              <SizeBox height={20} />
              <Text color={defaultThemes.secondary}>Description</Text>
              {data?.productDescription}
              <SizeBox height={20} />
              <S.BoxContainer>
                <Button onClick={handleAddToCart}>
                  <ShoppingCartIcon /> Add to Cart
                </Button>
                <SizeBox width={20} />
                <Button
                  color={defaultThemes.secondary}
                  onClick={() =>
                    (window.location.href = `/viewprofile/${data?.shop_id}`)
                  }
                >
                  <StorefrontIcon />
                  Visit shop
                </Button>
              </S.BoxContainer>
            </S.InfoContainer>
          </S.Column>
        </ItemRow>
      </Container>
      <SizeBox height={10} />
      <Container>
        <S.TitleText>Related Products</S.TitleText>
        <Row>{displayProducts}</Row>
      </Container>
      <SizeBox height={10} />
      <Container>
        <S.TitleText>Product Review</S.TitleText>
        {displayReview}
        <SizeBox height={10} />
        <S.TextArea
          placeholder="Write Something..."
          onChange={reviewChange}
        ></S.TextArea>
        <Button onClick={handleAddReview}>Add Review</Button>
      </Container>
    </>
  );
}
