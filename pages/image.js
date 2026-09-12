/*
To Do:
*/

import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';

import MessagesDiv from '../components/layout/messagesdiv';

export default function DalleChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [model, setModel] = useState('gpt-image-2');
  const [n, setN] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [size, setSize] = useState('auto');
  const [outputformat, setOutputformat] = useState('png');
  const [background, setBackground] = useState('auto');
  
  const sendMessage = async () => {
    if (!input.trim()) return;
    if (n>10 || n<1) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    try {
      const response = await fetch(
        '/api/postimageprompt',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({ 
            "input": input,
            "model": model,
            "n": n,
            "quality": quality,
            "size": size,
            "output_format": outputformat,
            "background": background,
          }),
        },
      );
      const data = await response.json();
      //console.log(data.data);
      // images (n) -> data.data = [{b64_json: '...', generation_id: '...'},  {...}, ...]
      if ('error' in data) {
        let errortext = 'Image generation failed. ' + data.error.error.message;
        const gptimageMessage = { role: 'assistant', content: errortext, url: undefined, images: undefined };
        setMessages((prevMessages) => [...prevMessages, gptimageMessage]);
      }
      else {
        const gptimageMessage = { role: 'assistant', content: 'Image generation OK.', url: undefined, images: data.data };
        setMessages((prevMessages) => [...prevMessages, gptimageMessage]);
      }
    } catch (error) {
      // console.error('Error communicating with /api/postimageprompt', error);
      const gptimageMessage = { role: 'assistant', content: 'Error communicating with /api/postimageprompt. ' + error.message };
      setMessages((prevMessages) => [...prevMessages, gptimageMessage]); 
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
        <title>GPT Image</title>
         <meta name="Open AI" content="Open AI GPT Image generation"/>
         <meta name="viewport" content="width=device-width, initial-scale=1" /> 
         <link rel="icon" href="#" sizes="any" />
      </Head>
      <div className="container">
        <div className="row mt-1">
          <div className="col-md-8">
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
          <div className="col-md-3">
            <label htmlFor="model" className="form-label">Model</label>
            <select className="form-select mb-1" id="model" 
              value={model} onChange={(e) => {setModel(e.target.value)}}
              >
                <option value="gpt-image-1-mini">gpt-image-1-mini | input $2/1M</option>
                <option value="gpt-image-1">gpt-image-1 | input $5/1M</option>
                <option value="gpt-image-1.5">gpt-image-1.5 | input $5/1M</option>
                <option value="gpt-image-2">gpt-image-2 | input -/1M</option>
                <option value="gpt-image-2.5-sunburst">gpt-image-2.5-sunburst | input $5/1M</option>
                <option value="gpt-image-2.5-flare">gpt-image-2.5-flare | input $5/1M</option>                
                {/* Add more model options here if needed */}
            </select>
            <label htmlFor="text" className="form-label">AnchoxAlto 1024x1024|1536x1024|auto</label>
              <textarea className="form-control" id="text" rows="1" 
                value={size}
                onChange={ e => {setSize(e.target.value)} }
            />
            <small className="form-text text-muted">
              <pre>pixels, aspect ratio (1:3 - 3:1)</pre>
            </small>
            <label htmlFor="model" className="form-label">Calidad</label>
            <select className="form-select mb-1" id="quality" 
              value={quality} onChange={(e) => {setQuality(e.target.value)}}
              >
                <option value="auto">auto</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
                <option value="xhigh">xhigh (sólo gpt-image2.5-*)</option>
                <option value="max">max (sólo gpt-image2.5-*)</option>
                {/* Add more model options here if needed */}
            </select>
            <label htmlFor="model" className="form-label">Fondo</label>
            <select className="form-select mb-1" id="background" 
              value={background} onChange={(e) => {setBackground(e.target.value)}}
              >
                <option value="auto">auto</option>
                <option value="transparent">transparent (sólo png o webp)</option>
                <option value="opaque">opaque</option>
                {/* Add more model options here if needed */}
            </select>
            <label htmlFor="model" className="form-label">Formato</label>
            <select className="form-select mb-1" id="outputformat" 
              value={outputformat} onChange={(e) => {setOutputformat(e.target.value)}}
              >
                <option value="png">png</option>
                <option value="jpeg">jpeg</option>
                <option value="webp">webp</option>
                {/* Add more model options here if needed */}
            </select>
            <label htmlFor="text" className="form-label">Imágenes</label>
              <textarea className="form-control" id="text" rows="1" 
                value={n}
                onChange={ e => {setN(parseInt(e.target.value, 10))} }
            />
            <small className="form-text text-muted">
              <pre>Rango 1-10</pre>
            </small>            
          </div>
        </div>      
      </div>
    </Fragment>
    
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: ' GPT Image',
    },
  };
}