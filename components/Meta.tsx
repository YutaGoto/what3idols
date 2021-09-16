import React, { VFC } from "react"
import Head from 'next/head'

interface Props {
  description: string
}

const Meta: VFC<Props> = ({description}) => {
  return (
    <Head>
      <meta property="og:title" content="What3Idols" />
      <meta property="og:description" content={description} />
      <title>What3Idols!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default Meta
