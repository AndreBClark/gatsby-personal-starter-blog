import React from "react"
import styled from "styled-components"
import theme from "../../config/theme"

const Container = styled.section`
  background-color: ${theme.colors.overlay.middle};
  padding: 4vmin;
  margin: ${props => props.theme.spacer};
  height: 100%;
  border-left: solid ${theme.stroke} ${props => props.theme.colors.primary};
    ul {
      margin-left: 1.5rem;
    }
  @media screen and (min-width: 760px) {
    opacity: .7;
    border-radius: ${theme.radius};
    padding: 4vmin 6vmin;
    transition: all ${props => props.theme.transitions.normal};
    &:hover {
      transform: translateY(-4px);
      opacity: 1;
    }
  }
`
const Panel = ({ children }) => {
  return <Container>{children}</Container>
}
export default Panel
