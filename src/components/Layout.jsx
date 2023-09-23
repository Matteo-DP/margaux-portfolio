import React from 'react'
import Head from 'next/head'

export default function Layout({ title }) {

  const titleString = `${title} | Margaux De Pauw`

  return (
    <>
        <Head>
            <title>
              {titleString}
            </title>
        </Head>
    </>
  )
}
