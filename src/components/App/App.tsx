import { createGlobalStyle } from 'styled-components'

import { TikTakToe } from '../TikTakToe/TikTakToe'

export const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <TikTakToe />
    </div>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`
