import React from 'react'
import Head from 'next/head'

export default function Layout({ title }) {
  return (
    <>
        <Head>
            <title>
                {title} | Margaux De Pauw
            </title>
        </Head>
    </>
  )
}
