import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import MessagesDiv from '../components/layout/messagesdiv';

export default function DalleChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  
  const sendMessage = async () => {
    //console.log('send msg');
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const response = await fetch(
        '/api/postimageprompt',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ "input": input }),
        },
      );
      const data = await response.json();
      //console.log(data);
      const dalleMessage = { role: 'assistant', content: data.data[0].revised_prompt, url: data.data[0].url };
      setMessages((prevMessages) => [...prevMessages, dalleMessage]);
      //console.log(dalleMessage);
    } catch (error) {
      console.error('Error communicating with /api/postimageprompt', error);
      const dalleMessage = { role: 'assistant', content: 'Error communicating with /api/postimageprompt. ' + error.message };
      setMessages((prevMessages) => [...prevMessages, dalleMessage]); 
    }
  };

  const saveMessages = async () => {
    const fileName = prompt ('Enter a file name ','mychat.txt');
    if (!fileName) { return; }

    const chattext = JSON.stringify(messages);
    //console.log(chattext);
    const blob = new Blob([chattext], { type: 'text/plain' });
    const link = document.createElement('a'); link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const loadMesagges = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    if (file) { 
			setSelectedFileName(file.name); 
			const reader = new FileReader(); 
			reader.onload = (e) => { 
        try { 
          const loadedData = JSON.parse(e.target.result); 
          //console.log(loadedData);
          if (Array.isArray(loadedData) && loadedData.every(item => typeof item === 'object')) { setMessages(loadedData); } 
          else { console.error("Invalid file format. The file content should be an array of objects."); } 
        } catch (error) { console.error("Failed to parse file content as JSON:", error); } 
			}; 
			reader.readAsText(file); 
      //console.log('loadmsg');
		}
  };

  return (
    <Fragment>
      <Head>
        <title>Dall-E</title>
         <meta name="Open AI" content="Open AI Dall-E Image generation"/>
         <meta name="viewport" content="width=device-width, initial-scale=1" /> 
         <link rel="icon" href="#" sizes="any" />
      </Head>
      <div className="container">
        {/*<h1 className="text-body-primary text-center text-primary fw-bold">Dall-E</h1>*/}
        <MessagesDiv messages={messages}/>
        <div className="row">
          <div className="col-md-9">
            <textarea
              className="form-control w-100 d-inline mr-3 border border-primary"
              value={input}
              onChange={e => {
                setInput(e.target.value);
                }
              }
              rows="5"
            />
          </div>
          <div className="col-md-3 d-flex flex-column align-items-center">
            <button onClick={sendMessage} className="btn btn-primary w-100 my-1" style={{ width: '18%' }}> Enviar </button>
            <button onClick={saveMessages} className="btn btn-primary w-100 my-1" style={{ width: '18%' }}> Grabar mensajes </button>
            <input type="file" accept=".txt, .json" onChange={loadMesagges} id="fileInput" style={{ display: 'none' }}/>
            <label className="btn btn-primary w-100 my-1" htmlFor="fileInput" id="fileInputLabel" style={{ width: '18%' }}> Cargar mensajes </label>
          </div>
        </div>      
      </div>
    </Fragment>
    
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: ' Dall-E',
    },
  };
}

/*
To Do:
href
*/