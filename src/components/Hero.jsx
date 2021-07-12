import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import tw, { styled } from 'twin.macro'
import { breakpoints,  fontFamily, colors } from '../../config/theme'
import { rhythm } from '../../config/typography'
import ContentContainer from './ContentContainer'
import BackgroundImage from 'gatsby-background-image'

const Container = styled(BackgroundImage)`
  background-color: ${colors.grey.dark};
  width: 100%;
  min-height: 75vh;
  text-align: center;
  position: relative;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  @media screen and (min-width: ${breakpoints.tablet}) {
    min-height: 80vh;
  }
`

const Overlay = styled.div`
  content: '';
  position: absolute;
  height: 50vh;
  bottom: 0;
  z-index: -1;
  width: 100%;
  background-image: linear-gradient(
    0deg,
    rgb(18, 18, 18) 15%,
    rgba(18, 18, 18, 0) 50%
  );
`
const FlexLg = styled.div`
  display: flex;
  align-content: center;

  @media screen and (min-width: ${breakpoints.tablet}) {
    justify-content: space-between;
  }
`

export const HeroInner = styled.div`
  text-align: center;
  margin: 0;
  @media screen and (min-width: ${breakpoints.tablet}) {
    margin-left: auto;
    margin-right: auto;
  }
`
export const HeadingOne = styled.h1`
  ${tw`text-5xl`}
  text-transform: ${fontFamily.logoCase};
`
export const Subtitle = styled.h2`
${tw`text-lg`}
  font-family: ${fontFamily.heading};
  text-transform: ${fontFamily.headingCase};
  font-weight: semibold;
  border-radius: ${rhythm(1 / 8)};
  margin: ${rhythm(1 / 4)};
  padding: ${rhythm(1 / 8)} ${rhythm(1)};
  color: ${colors.bg};
  background-color: ${colors.primary};
  font-weight: ${fontFamily.headingWeight};
`
const Hero = ({ children }) => {
  const { mobileImage, desktopImage } = useStaticQuery(
    graphql`
      query {
        mobileImage: file(relativePath: { eq: "orbital-bw.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 412) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        desktopImage: file(relativePath: { eq: "orbital-bw.jpg" }) {
          childImageSharp {
            fluid(quality: 75, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )
  const sources = [
    mobileImage.childImageSharp.fluid,
    {
      ...desktopImage.childImageSharp.fluid,
      media: `(min-width: 491px)`,
    },
  ]

  return (
    <Container Tag="section" fluid={sources} backgroundColor={`#040e18`}>
      <Overlay> </Overlay>
      <ContentContainer>
        <FlexLg>{children}</FlexLg>
      </ContentContainer>
    </Container>
  )
}


export default Hero