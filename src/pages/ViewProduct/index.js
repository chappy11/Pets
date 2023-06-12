import React, { useState, useEffect, useMemo } from "react";
import { Col, Image, Modal, ModalBody, Row } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
import useGetRating from "../../hooks/useGetRating";
import ProductRating from "../../components/ProductRating";
import Rating from "react-rating";
import { Rates } from "../../services/Rate";
import { getItem, KEY } from "../../utils/storage";

export default function ViewProduct() {
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [noItems, setNoItems] = useState(1);
  const [ratingModal, setRatingModal] = useState(false);
  const { user } = useGetUserFromStorage();
  const { alertError, alertWarning, alertSuccess } = usePrompts();
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState("");
  const [currentImage, setCurrentImg] = useState("");
  const { data: rate } = useGetRating({
    product_id: data ? data.product_id : 0,
  });
  useEffect(() => {
    getproduct();
  }, []);
  console.log(rate);
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
      setCurrentImg(response?.data?.data?.productImage);
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

    if (userReview === "") {
      alertWarning("Please enter your review");

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
    } finally {
      setUserReview("");
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

  const displayStock = useMemo(() => {
    if (parseInt(data?.stock) <= parseInt(data?.reorderLevel)) {
      return `Hurry up! Only ${data?.stock + " " + data?.unit} in stock`;
    }
    if (data?.stock > 0) {
      return data?.stock + " " + data?.unit + " available";
    }

    return "Out Of Stock";
  }, [data?.stock, data?.reorderLevel]);

  const isDisAbled = useMemo(() => {
    if (data?.stock < 1) {
      return true;
    }

    return false;
  }, [data?.stock]);

  const displayPetInformation = useMemo(() => {
    if (data?.category_id == "1") {
      return (
        <>
          <ListItem label={"Type"} value={data?.type} />
          <SizeBox height={10} />
          <ListItem label={"Breed"} value={data?.breed} />
        </>
      );
    }
  }, [data]);

  const header = useMemo(() => {
    if (data?.category_id == 1) {
      return "Pets Information";
    }

    return "Product Information";
  }, [data]);

  const displayDocument = useMemo(() => {
    if (data?.category_id == "1") {
      return (
        <>
          <Image width={300} height={350} src={BASE_URL + data?.documentImg} />
        </>
      );
    }
  }, [data]);

  const displayImage = useMemo(() => {
    if (data?.category_id == "1") {
      return (
        <>
          <Image width={330} height={350} src={BASE_URL + currentImage} />
          <Row>
            <Col>
              <Image
                width={150}
                height={150}
                src={BASE_URL + data?.productImage}
                onClick={() => setCurrentImg(data?.productImage)}
              />
            </Col>
            <Col>
              <Image
                width={150}
                height={150}
                src={BASE_URL + data?.documentImg}
                onClick={() => setCurrentImg(data?.documentImg)}
              />
            </Col>
          </Row>
        </>
      );
    }

    return <Image width={300} height={350} src={BASE_URL + currentImage} />;
  }, [data, currentImage]);

  async function handleCreateRate() {
    try {
      if (parseInt(rating) < 1) {
        alertWarning("Please choose rating");
        return;
      }

      const payload = {
        user_id: user?.user_id,
        product_id: data?.product_id,
        rate: rating,
      };

      const resp = await Rates.createRating(payload);

      if (resp.data.status == "1") {
        alertSuccess("Thank you for rating");
        setRatingModal(false);
      }else{
        alertWarning(resp.data.message);
      }
    } catch (error) {
      alertError();
    }
  }

  function handleOpenModal() {
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

    setRatingModal(true);
  }
  return (
    <>
      <Navigation isFetch={isLoading} />
      <SizeBox height={10} />
      <Modal show={ratingModal}>
        <Modal.Header>
          <HeaderText>Rate Now:</HeaderText>
        </Modal.Header>
        <ModalBody
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Rating
            initialRating={0}
            emptySymbol={
              <StarBorderIcon
                style={{ color: "yellow" }}
                sx={{ fontSize: 80 }}
              />
            }
            fullSymbol={
              <StarIcon style={{ color: "yellow" }} sx={{ fontSize: 80 }} />
            }
            style={{ fontSize: "20px" }}
            onChange={(e) => setRating(e)}
          />
        </ModalBody>
        <Modal.Footer>
          <Button onClick={handleCreateRate}>Save Rating</Button>
          <Button color="red" onClick={() => setRatingModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <SizeBox height={50} />
        <S.TitleText>{header}</S.TitleText>
        <SizeBox height={20} />
        <ItemRow>
          <S.Column md={6}>
            {displayImage}
            <SizeBox height={10} />
          </S.Column>
          <S.Column md={6}>
            <S.InfoContainer>
              <HeaderText color={defaultThemes.primary}>
                {data?.productName}
              </HeaderText>
              <div onClick={handleOpenModal}>
                <ProductRating rate={rate} />
              </div>

              <Line />
              {displayPetInformation}
              <SizeBox height={10} />
              <ListItem label={"Stock"} value={displayStock} />
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
                <Button onClick={handleAddToCart} disabled={isDisAbled}>
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
        <S.TitleText>Shop Products</S.TitleText>
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
          value={userReview}
        ></S.TextArea>
        <Button onClick={handleAddReview}>Add Review</Button>
      </Container>
    </>
  );
}
