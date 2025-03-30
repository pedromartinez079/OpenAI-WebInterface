import { Fragment } from 'react';
import Head from "next/head";
import Image from 'next/image';

import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <Fragment>
      <Head>
        <title>My OpenAI tools</title>
         <meta name="Open AI" content="Open AI tools"/>
         <meta name="viewport" content="width=device-width, initial-scale=1" /> 
         <link rel="icon" href="#" sizes="any" />
      </Head>
      <div className='container'>
        <div className='m-auto my-1' style={{ width: '950px', height: '543px' }}>
								<Image
									src={ '/image-chatgpt.png' } // Ruta de la imagen
									alt="Dall-E Image" // Descripción para accesibilidad
									layout="responsive"
									width={0} // Ancho deseado
									height={0} // Alto deseado
								/>							
			  </div>
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Inicio',
    },
  };
}

/*
To do:
- Allow app to write code directly in repository following sent prompts?
- Add model gpt-4o-realtime-preview for audio output, it requires a different post method -> https://platform.openai.com/docs/guides/realtime
- Build AI Assistants: https://platform.openai.com/docs/assistants/overview https://platform.openai.com/docs/assistants/quickstart
*/