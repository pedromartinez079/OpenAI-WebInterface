import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';

import MessagesDiv from '../components/layout/messagesdiv';

export default function GPTChat(props) {
  const selectedValue = props.selectedValue
  const [messages, setMessages] = useState([]);
  const [temp, setTemp] = useState(0.75);
  const [topp, setTopp] = useState(1);
  const [reasoning, setReasoning] = useState('medium');
  const [input, setInput] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  
  const handleTemperature = async (event) => { setTemp(parseFloat(event.target.value)); };

  const handleTopP = async (event) => { setTopp(parseFloat(event.target.value)); };

  const handleReasoningEffort= async (event) => { setReasoning(event.target.value); };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    
    try {
      const response = await fetch(
        '/api/postmessages',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json',},
          body: JSON.stringify({"model": selectedValue, "messages": messages, "userMessage": userMessage, 
            "temperature": temp, "topP": topp, reasoningEffort: reasoning}),
        },
      );
      const data = await response.json();
      // console.log(selectedValue, reasoning);
      const gptMessage = data.choices[0].message;
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
      //console.log(gptMessage);
    } catch (error) {
      console.error('Error communicating with /api/postmessages', error);
      const gptMessage = { role: 'assistant', content: 'Error communicating with /api/postmessages. ' + error.message };
      setMessages((prevMessages) => [...prevMessages, gptMessage]);
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
        <title>ChatGPT</title>
         <meta name="Open AI" content="Open AI ChatGPT Content, text, chat, information, assistant"/>
         <meta name="viewport" content="width=device-width, initial-scale=1" /> 
         <link rel="icon" href="#" sizes="any" />
      </Head>
      <div className="container">
        {/*<h6 className="text-body-primary text-center text-primary fw-bold">ChatGPT</h6>*/}
        <MessagesDiv messages={messages}/>
        <div className="row">
          <div className="col-md-8">
            <textarea
              className="form-control w-100 d-inline mr-3 border border-primary"
              value={input}
              onChange={e => {
                setInput(e.target.value);
                }
              }
              rows="6"
            />
          </div>
          <div className="col-md-4 d-flex flex-column align-items-center">
            <div className="row">
              <div className="col-md-3">
                <input 
                  type="range" className="form-range" min="0" max="2" step="0.1" id="temperatureRange" 
                  value={temp} onChange={handleTemperature}
                  data-bs-toggle="tooltip"
                  title={"GPT models - [Temperature 0<Coherencia...Creatividad<2] "+temp}
                />
              </div>
              <div className="col-md-2">
                <input 
                  type="range" className="form-range" min="0" max="1" step="0.1" id="toppRange" 
                  value={topp} onChange={handleTopP}
                  data-bs-toggle="tooltip"
                  title={"GPT models - [TopP 0% 0..1 100%] "+topp}
                />
              </div>
              <div className="col-md-7">                
                <select className="form-select my-1" 
                    onChange={handleReasoningEffort} 
                    aria-label="Reasoning Effort"
                    defaultValue={reasoning}
                    title={"o1 & o3-mini models - Reasoning effort "}
                    >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>                             
              </div>
            </div>
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
      title: 'ChatGPT',
    },
  };
}

/*

*/