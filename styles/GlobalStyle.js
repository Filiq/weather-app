import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  font-family: "Inter", sans-serif;
  background: ${(props) => props.theme.background}
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export default GlobalStyle;
