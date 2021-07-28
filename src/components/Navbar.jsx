import React from 'react'
import tw from 'twin.macro'

import usePageList from 'hooks/usePageList'
import useDesluggify from 'hooks/useDesluggify'

import AniLinkDefault from 'components/AniLinkDefault'
import { BtnSimple } from 'components/button'
import Logo from 'images/logo.svg'

function Navbar() {
  return (
    <Header>
      <AniLinkDefault
        id="logo"
        to="/"
        as={NavButton}
        aria-label="Cosmic division Website Logo Home Button">
        <LogoBlock />
      </AniLinkDefault>
      <PageList />
    </Header>
  )
}

const Header = ({ children }) => {
  return (
    <HeaderStyle>
      <Nav>{children}</Nav>
    </HeaderStyle>
  )
}

const LogoBlock = () => {
  return (
    <div tw="flex">
      <Logo width="48" tw="inline" />
      <span tw="hidden md:(px-6 py-4 uppercase inline)">Cosmic Division</span>
    </div>
  )
}

function PageList() {
  const Pages = usePageList()
  const deSlug = useDesluggify()

  return (
    <List>
      {Pages.map(({ node }) => (
        <li>
          <NavButton to={node.path} as={AniLinkDefault}>
            {deSlug(node.path)}
          </NavButton>
        </li>
      ))}
    </List>
  )
}

const NavButton = tw(BtnSimple)`
  md:(mx-2 px-8)
`

const HeaderStyle = tw.header`
  font-heading font-black text-primary-200 tracking-widest bg-neutral-400 px-4 xl:px-0
`

const Nav = tw.nav`
  leading-tight flex justify-around items-center md:(mx-auto justify-between max-w-screen-xl)
`

const List = tw.ul`
  text-xs flex justify-around items-center text-primary-100 
  md:(justify-between text-base)
`

export default Navbar
