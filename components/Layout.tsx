import { NextComponentType, NextPageContext } from "next/types"
import { ReactNode, VFC } from "react"
import { Footer, Header } from "."

interface LayoutProps {
  children: ReactNode
}

const Layout: NextComponentType<NextPageContext, null, LayoutProps> = ({children}) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
