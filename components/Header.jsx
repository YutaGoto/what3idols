import React, { useState } from "react"
import { Heading, Navbar } from 'react-bulma-components'

const Header = () => {
  const [openMenu, setOpenMenu] = useState(false)

  return (
      <Navbar active={openMenu} transparent={false}>
        <Navbar.Brand>
          <Navbar.Item renderAs="a" href="#">
            <Heading>What3Idols</Heading>
          </Navbar.Item>
          <Navbar.Burger onClick={() => {setOpenMenu(!openMenu)}} />
        </Navbar.Brand>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item renderAs="a" href="/">
              <>Idols to Map</>
            </Navbar.Item>
            <Navbar.Item renderAs="a" href="/maps">
              <>Map to Idols</>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>
  )
}

export default Header
