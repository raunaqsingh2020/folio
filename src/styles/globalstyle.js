import { createGlobalStyle} from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--background);
    color: var(--text);
    transition: color 0.4s ease-out;
    transition: background 0.4s ease-out;
  }
`

export default GlobalStyle;