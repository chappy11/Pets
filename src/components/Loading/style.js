import styled, { css } from "styled-components";
import LoadingOverlay from "react-loading-overlay";
import { defaultThemes } from "../../constants/DefaultThemes";

export const StyledLoader = styled(LoadingOverlay)`
  width: 100%;
  height: 100%;
  overflow: hidden;
  .MyLoader_overlay {
    background: black;
  }
  &.MyLoader_wrapper--active {
    overflow: hidden;
  }
`;

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
