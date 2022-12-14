import { Carousel } from "react-bootstrap";
import * as S from "./style";
import { Button, SizeBox } from "../../../../components";
import { Icon } from "@mui/material";
import { ArrowForward, WindowSharp } from "@mui/icons-material";
import { defaultThemes } from "../../../../constants/DefaultThemes";

const img = require("../../../../asset/header-image.png");

export default function Header() {
  return (
    <S.HeaderBackground>
      <S.HeaderContainer>
        <S.Column md="5">
          <div>
            <S.HeaderText color={defaultThemes.color001}>
              Pet Society
            </S.HeaderText>
            <S.Subtitle color={defaultThemes.secondary}>
              Your Pet, Our Passion
            </S.Subtitle>
            <SizeBox height={15} />
            <S.HeaderButton
              onClick={() => (window.location.href = "/products")}
            >
              Shop Now <ArrowForward />
            </S.HeaderButton>
          </div>
        </S.Column>
        <S.ColumnImage md="7">
          <S.HeaderImage src={img} />
        </S.ColumnImage>
      </S.HeaderContainer>
    </S.HeaderBackground>
  );
}
