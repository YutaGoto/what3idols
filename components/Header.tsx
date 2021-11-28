import React, { useState, VFC } from "react"
import { Heading, Navbar } from 'react-bulma-components'
import Image from 'next/image'

const Header: VFC = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false)

  return (
    <Navbar active={openMenu} transparent={false}>
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <Heading>
            <Image src="/logo.svg" alt="What3Idols" width={250} height={50} />
          </Heading>
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
