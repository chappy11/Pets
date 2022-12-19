import {
  Navigation,
  SizeBox,
  Button,
  TextInput,
  HeaderText,
  Text,
  Container,
} from "../../components";
import * as S from "./style";
import { useState, useMemo } from "react";
import { User } from "../../services/User";
import swal from "sweetalert";

import { browserName } from "react-device-detect";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";

const img = require("../../asset/login-image.png");

export default function Login() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const [isShow, setIsShow] = useState(false);

  const onChange = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const inputType = useMemo(() => {
    return isShow ? "text" : "password";
  }, [isShow]);

  const icon = useMemo(() => {
    return isShow ? <VisibilityOff /> : <RemoveRedEye />;
  }, [isShow]);

  const handleLogin = async () => {
    try {
      if (account.username === "" || account.password === "") {
        swal("Warning", "Fill out all fields");
      } else {
        const payload = {
          ...account,
          browserName: browserName,
        };

        const response = await User.login(payload);
        console.log(response.data);
        if (response.data.status == 1) {
          localStorage.setItem("Account", JSON.stringify(response.data.data));
          if (response.data.data.user_roles === "1") {
            console.log("SHOP");

            swal("Success", response?.data.message, "success").then((res) => {
              window.location.href = "/";
            });
          } else if (response.data.data.user_roles === "2") {
            swal("Success", response?.data.message, "success").then((res) => {
              window.location.href = "/";
            });
          } else if (response.data.data.user_roles == 0) {
            swal("Success", response?.data.message, "success").then((res) => {
              window.location.href = "/";
            });
          }
        } else {
          swal("Error", response.data.message, "error");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Navigation />
      <S.Container>
        <S.FormCotainer>
          <div>
            <S.Text size={3}>Welcome to</S.Text>
            <SizeBox height={15} />
            <S.Text size={5}>Pet Society</S.Text>
            <img src={img} alt="login" />
          </div>
        </S.FormCotainer>
        <S.FormCotainer>
          <S.InputContainer>
            <HeaderText>Sign In</HeaderText>
            <SizeBox height={15} />
            <p>Username</p>
            <S.Input
              name="username"
              placeholder="Enter Username"
              label="Username"
              type="text"
              onChange={onChange}
            />
            <SizeBox height={40} />
            <p>Password</p>
            <S.Password>
              <S.Input
                type={inputType}
                placeholder="Enter Password"
                onChange={onChange}
                name="password"
              />
              <IconButton onClick={() => setIsShow(!isShow)}>{icon}</IconButton>
            </S.Password>
            <SizeBox height={20} />
            <Button onClick={() => handleLogin()}>Login</Button>
            <Container>
              <Text textAlign="center">
                Forgot Password? <Link to="/otp">Click here</Link>
              </Text>
            </Container>
          </S.InputContainer>
        </S.FormCotainer>
      </S.Container>
    </>
  );
}
