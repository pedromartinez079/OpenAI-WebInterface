/*
To DO:
*/

import { Fragment } from 'react';
import Head from "next/head";

import React, { useState } from 'react';
import FilesBody from '@/components/files/filesbody';

export default function Files(props) {
    
    return (
        <Fragment>
            <Head>
                <title>Archivos</title>
                <meta name="Open AI" content="Open AI files"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" /> 
                <link rel="icon" href="#" sizes="any" />
            </Head>
                <div className="container mt-1">
                    <FilesBody />
                </div>            
        </Fragment>
    );
}

export async function getStaticProps() {
    return {
      props: {
        title: 'Archivos',
      },
    };
  }

