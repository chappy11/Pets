import styled, { css } from "styled-components";

import { defaultThemes } from "../../constants/DefaultThemes";

export const DarkBackground = styled.div`
  /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100vw; /* Full width */
  height: 100vh; /* Full height */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Text = styled.text`
  font-size: 2em;
  color: ${defaultThemes.color001};
`;
