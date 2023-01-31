import {
  Button,
  Container,
  HeaderText,
  ListItem,
  SizeBox,
  TextInput,
} from "../../../../components";
import Sidebar from "../../components/Sidebar";
import { Row, Col, Form } from "react-bootstrap";
import * as S from "./style";
import { useParams } from "react-router-dom";
import { Product } from "../../../../services/Product";
import { useState, useEffect, useMemo, useCallback } from "react";
import usePrompts from "../../../../hooks/usePrompts";
import { BASE_URL } from "../../../../services/ApiClient";
import { formatCurrency } from "../../../../utils/Money";

export default function ProductId() {
  const { id } = useParams();
  const { alertError, alertWarning, alertSuccess } = usePrompts();
  const [data, setData] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
  });

  const [currentImage, setCurrentImage] = useState(null);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const resp = await Product.getProductById(id);

    if (resp?.data?.status == "1") {
      setData(resp?.data?.data);
      setCurrentImage(resp?.data?.data?.productImage);
    } else {
      alertError();
    }
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleUpdateData = async () => {
    if (inputs?.name == "" && !inputs?.description == "") {
      alertWarning("Fill out all fields");

      return;
    }

    const name = inputs?.name == "" ? data?.productName : inputs?.name;
    const description =
      inputs?.description == ""
        ? data?.productDescription
        : inputs?.description;
    const payload = {
      id,
      name: name,
      description: description,
    };
    console.log("PAYLOAD", payload);

    const resp = await Product.updateInfo(payload);
    if (resp?.data?.status == "1") {
      alertSuccess(resp?.data?.message);
      getData();
      setIsUpdate(false);
      return;
    }
    alertError();
  };

  const displayPetInfo = useMemo(() => {
    if (data?.category_id == "1") {
      return (
        <>
          <ListItem label="Type" value={data?.type} />
          <SizeBox height={10} />
          <ListItem label="Breed" value={data?.breed} />
          <SizeBox height={10} />
        </>
      );
    }
  }, [data]);

  const displayData = useMemo(() => {
    if (isUpdate) {
      return (
        <>
          <HeaderText>Update Basic Info</HeaderText>
          <SizeBox height={20} />
          <label>Product Name</label>
          <TextInput
            name="name"
            placeholder={data?.productName}
            onChange={onChange}
          />
          <SizeBox height={10} />
          <label>Description</label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder={data?.productDescription}
            onChange={onChange}
          />
        </>
      );
    }

    return (
      <>
        {" "}
        <HeaderText>{data?.productName}</HeaderText>
        <p>{data?.productDescription}</p>
        <SizeBox height={30} />
        {displayPetInfo}
        <ListItem label={"Stock"} value={data?.stock + " " + data?.unit} />
        <SizeBox height={10} />
        <ListItem
          label={"Price"}
          value={formatCurrency(parseFloat(data?.price))}
        />
        <ListItem label={"Category"} value={data?.category_name} />
      </>
    );
  }, [isUpdate, inputs, data]);

  const displayImage = useMemo(() => {
    if (data?.category_id == "1") {
      return (
        <>
          <S.Image src={BASE_URL + currentImage} width="330" height={350} />
          <SizeBox height={10} />
          <Row>
            <Col>
              <S.Image
                src={BASE_URL + data?.productImage}
                width="150"
                height="150"
                onClick={() => setCurrentImage(data?.productImage)}
              />
            </Col>
            <Col>
              <S.Image
                src={BASE_URL + data?.documentImg}
                width="150"
                height="150"
                onClick={() => setCurrentImage(data?.documentImg)}
              />
            </Col>
          </Row>
        </>
      );
    }
    <S.Image src={BASE_URL + currentImage} width="330" height={350} />;
  }, [data, currentImage]);

  const displayButton = useMemo(() => {
    if (isUpdate) {
      return <Button onClick={() => handleUpdateData()}>Change</Button>;
    }

    return <Button onClick={() => setIsUpdate(true)}>Update</Button>;
  }, [isUpdate, inputs, data]);

  function handleBack() {
    if (isUpdate) {
      setIsUpdate(false);
      return;
    }

    window.location.href = "/myproduct";
  }
  return (
    <Sidebar>
      <Container>
        <S.Container>
          <div>{displayImage}</div>
          <SizeBox width={50} />
          <S.Info>
            {displayData}
            <SizeBox height={70} />
            <Row>
              <Col>
                <div>{displayButton}</div>
              </Col>
              <Col>
                <div>
                  <Button color="red" onClick={() => handleBack()}>
                    Back
                  </Button>
                </div>
              </Col>
            </Row>
          </S.Info>
        </S.Container>
      </Container>
    </Sidebar>
  );
}
