import Sidebar from "../../components/Sidebar";
import { Row, Col, Image, Form } from "react-bootstrap";
import { isContainNumberAndSpecialCharacter } from "../../../../utils/String";
import { useMemo, useState, useEffect } from "react";
import {
  TextInput,
  SizeBox,
  Container,
  Title,
  Button,
  Text,
  HeaderText,
} from "../../../../components";
import useGetCategory from "../../../../hooks/useGetCategory";
import swal from "sweetalert";
import useGetUserFromStorage from "../../../../hooks/useGetUserFromStorage";
import { Product } from "../../../../services/Product";
import usePrompts from "../../../../hooks/usePrompts";
import * as S from "./style";

const UNIT = ["pcs", "kg"];

export default function AddProduct() {
  const [img, setImg] = useState(null);
  const [documentPic, setDocumentPic] = useState(null);
  const { user } = useGetUserFromStorage();
  const { category } = useGetCategory();
  const { alertWarning, alertSuccess, alertError } = usePrompts();
  const [categoryId, setCategoryId] = useState("");
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    unit: "",
    type: "",
    breed: "",
  });

  useEffect(() => {
    setData({
      name: "",
      description: "",
      price: "",
      stock: "",
      unit: "",
      type: "",
      breed: "",
    });
  }, [categoryId]);

  useEffect(() => {
    setImg(null);
    setDocumentPic(null);
  }, [categoryId]);
  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeImage = (e) => {
    setImg(e.target.files[0]);
  };

  const onChangeDocumentPic = (e) => {
    setDocumentPic(e.target.files[0]);
  };

  function handleCreateItem() {
    if (categoryId == "1") {
      handleAddPets();
      return;
    }

    handleAddproduct();
  }

  async function handleAddproduct() {
    const { name, description, unit, price, stock } = data;
    if (!img) {
      swal("Warning", "Provide Picture of Product");
    } else if (
      name === "" ||
      description === "" ||
      unit === "" ||
      price === ""
    ) {
      swal("Warning", "Fill out all fields");
    } else if (isContainNumberAndSpecialCharacter(name)) {
      alertWarning(`Item Name should includes special characters`);
    } else if (+price > +user.price_limit) {
      alertWarning(`The price of item shoud be ${user.price_limit} below`);
    } else {
      try {
        console.log(user.shop_id);
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("description", description);
        formdata.append("category_id", categoryId);
        formdata.append("price", price);
        formdata.append("unit", unit);
        formdata.append("stock", stock);
        formdata.append("shop_id", user.shop_id);
        formdata.append("pic", img);

        const response = await Product.addProduct(formdata);
        console.log("DATA", response);
        if (response.data.status == 1) {
          swal("Success", response.data.message, "success").then((res) => {
            window.location.href = "/myproduct";
          });
        } else {
          swal("Error", response.data.message, "error");
        }
      } catch (e) {
        swal("Opps", "Something wenty wrong", "error");
      }
    }
  }

  async function handleAddPets() {
    const { name, description, breed, type, price } = data;
    if (!img) {
      alertWarning("Please put picture of you pets");
      return;
    }

    if (!documentPic) {
      alertWarning("Please put document picture of your pets");

      return;
    }

    if (isContainNumberAndSpecialCharacter(name)) {
      alertWarning(`Pets Name should includes special characters`);

      return;
    }
    if (
      name == "" ||
      description == "" ||
      breed == "" ||
      type == "" ||
      price == ""
    ) {
      alertWarning("Fill out all fields");

      return;
    }

    if (isContainNumberAndSpecialCharacter(name))
      if (+price > +user.price_limit) {
        alertWarning(`The price of item shoud be ${user.price_limit} below`);

        return;
      }
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("description", description);
      formdata.append("category_id", categoryId);
      formdata.append("breed", breed);
      formdata.append("type", type);
      formdata.append("price", price);
      formdata.append("shop_id", user.shop_id);
      formdata.append("pic", img);
      formdata.append("document", documentPic);

      const resp = await Product.addPets(formdata);

      if (resp.data?.status == "1") {
        alertSuccess("Succcessfully Added");
        return;
      }

      alertError();
    } catch (e) {
      console.log("ERROR", e);
      alertError();
    }
  }

  const displayDocuments = useMemo(() => {
    if (categoryId == "") {
      return null;
    }

    if (categoryId == "1") {
      return (
        <>
          <HeaderText>Document Picture</HeaderText>
          <S.ImageContainer>
            {img ? (
              <Image
                width={200}
                height={200}
                src={URL.createObjectURL(documentPic)}
              />
            ) : (
              <S.GreyBox />
            )}
          </S.ImageContainer>

          <TextInput type="file" onChange={onChangeDocumentPic} />
        </>
      );
    }
  }, [categoryId, documentPic]);

  const displayFields = useMemo(() => {
    if (categoryId !== "") {
      if (categoryId !== "1") {
        return (
          <>
            <TextInput
              name="name"
              onChange={onChange}
              placeholder="Product Name"
              label="Product Name"
              value={data?.name}
            />
            <SizeBox height={15} />
            <S.Label>Pet Description</S.Label>
            <Form.Control
              as="textArea"
              row={3}
              name="description"
              onChange={onChange}
              placeholder="Pet Description"
              value={data?.description}
            />
            <SizeBox height={15} />
            <S.Label>Unit</S.Label>
            <Form.Select name="unit" onChange={onChange}>
              <option value={""}>{data.unit === "" && "Choose Unit"}</option>
              {UNIT.map((val, index) => (
                <option key={index.toString()} value={val}>
                  {val}
                </option>
              ))}
            </Form.Select>
            <TextInput
              label="Stock Available"
              name="stock"
              type="number"
              placeholder="0"
              onChange={onChange}
              value={data?.stock}
            />
            <SizeBox height={15} />

            <TextInput
              label="Price"
              name="price"
              type="number"
              placeholder="0.00"
              onChange={onChange}
              value={data?.price}
            />
          </>
        );
      } else {
        return (
          <>
            <TextInput
              name="name"
              onChange={onChange}
              placeholder="Pet Name"
              label="Pet Name"
              value={data?.name}
            />

            <SizeBox height={15} />
            <S.Label>Pet Description</S.Label>
            <Form.Control
              as="textArea"
              row={3}
              name="description"
              onChange={onChange}
              placeholder="Pet Description"
              value={data?.description}
            />
            <SizeBox height={15} />
            <TextInput
              name="type"
              onChange={onChange}
              placeholder="Pet type ex:(Dog,Cat)"
              label="Pet Type"
              data={data?.type}
            />
            <SizeBox height={15} />
            <TextInput
              name="breed"
              onChange={onChange}
              placeholder="Pet Breed"
              label="Pet Breed"
              value={data?.breed}
            />
            <SizeBox height={15} />
            <TextInput
              label="Price"
              name="price"
              type="number"
              placeholder="0.00"
              onChange={onChange}
              value={data?.price}
            />
            <SizeBox height={15} />
          </>
        );
      }
    } else {
      return (
        <>
          <SizeBox height={20} />
          <Text textAlign={"center"}>
            Please choose what category to be sold
          </Text>
        </>
      );
    }
  }, [categoryId, data]);

  const header = useMemo(() => {
    if (categoryId === "1") {
      return "Sell Pets";
    }

    return "Sell New Products";
  }, [categoryId, setCategoryId]);
  return (
    <>
      <Sidebar>
        <SizeBox height={20} />
        <Container>
          <SizeBox height={20} />
          <Title>{header}</Title>
          <SizeBox height={20} />
          <Row>
            <Col>
              <S.ImageContainer>
                {img ? (
                  <Image
                    width={200}
                    height={200}
                    src={URL.createObjectURL(img)}
                  />
                ) : (
                  <S.GreyBox />
                )}
              </S.ImageContainer>

              <TextInput type="file" onChange={onChangeImage} />
              <SizeBox height={20} />
              {displayDocuments}
            </Col>
            <Col>
              <S.Label>Product Category</S.Label>
              <Form.Select
                name="category_id"
                onChange={(e) => setCategoryId(e?.target?.value)}
                placeholder="Choose Category"
              >
                <option value={""}>
                  {categoryId === "" && "Choose Category"}
                </option>
                {category.map((val, i) => (
                  <option key={val.category_id} value={val.category_id}>
                    {val.category_name}
                  </option>
                ))}
              </Form.Select>
              <SizeBox height={20} />
              {displayFields}
              <SizeBox height={15} />

              <Button
                onClick={() => handleCreateItem()}
                disabled={categoryId == ""}
              >
                Add Products
              </Button>
            </Col>
          </Row>
        </Container>
      </Sidebar>
    </>
  );
}
