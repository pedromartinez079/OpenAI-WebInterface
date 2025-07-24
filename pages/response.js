import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';

export default function Response(props) {  
  const [responseOutput, setResponseOutput] = useState(null);
  const [input, setInput] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [paralleltoolcalls, setParalleltoolcalls] = useState(false);
  const [store, setStore] = useState(false);
  const [stream, setStream] = useState(false);
  const [temp, setTemp] = useState(0.75);
  const [topp, setTopp] = useState(1);
  const [reasoningEffort, setReasoningEffort] = useState("low");  
  const [model, setModel] = useState("gpt-4.1");
  const [include, setInclude] = useState([]);
  const [previousresponse, setPreviousresponse] = useState(null);
  const [textStr, setTextStr] = useState(null);
  const [fileid, setFileid] = useState(null);
  const [toolsStr, setToolsStr] = useState([]);
  const [toolchoiceStr, setToolchoiceStr] = useState(null);
  const [metadataStr, setMetadataStr] = useState(null);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responsesLog, setResponsesLog] = useState([]);

  const handleSend = async (e) => {}

  const handleDelete = async (e) => {}

  //To do: Get Responses

  return(
    <Fragment>
      <Head>
          <title>Responses</title>
          <meta name="Open AI" content="Open AI Responses"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" /> 
          <link rel="icon" href="#" sizes="any" />
      </Head>
      <div className="container mt-4">
        <form>
          <div className="row mb-3">
            <div className="col-md-8">
              <label htmlFor="response" className="form-label">Respuesta</label>
              <div className="chat-container border border-primary px-3 py-1 my-2" style={{ height: '27rem', overflowY: 'scroll', padding: '10px', borderRadius: '10px' }}>
                <pre className="form-control-plaintext border rounded bg-light mb-1" id="response" style={{ minHeight: '2rem' }}>
                  {responseOutput}
                </pre>
              </div>                        
              <label htmlFor="input" className="form-label">Mensaje</label>
              <textarea className="form-control mb-1" id="input" rows="4"
                value={input}
                onChange={ e => {setInput(e.target.value)} }
              /> 
              <label htmlFor="instructions" className="form-label">Instrucciones</label>
              <textarea className="form-control mb-1" id="instructions" rows="4"
                value={instructions}
                onChange={ e => {setInstructions(e.target.value)} }
              />
              <div className="d-flex gap-3 my-2">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="parallel_tool_calls"
                    checked={paralleltoolcalls}
                    onChange={e => {setParalleltoolcalls(!paralleltoolcalls)}}
                  />
                  <label className="form-check-label" htmlFor="parallel_tool_calls">
                    Parallel tool calls
                  </label>                          
                </div>                        
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="store"
                    checked={store}
                    onChange={e => {setStore(!store)}}
                  />
                  <label className="form-check-label" htmlFor="store">
                    Store
                  </label>
                </div>                        
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="stream"
                    checked={stream}
                    onChange={e => {setStream(!stream)}}
                  />
                  <label className="form-check-label" htmlFor="stream">
                    Stream
                  </label>
                </div>
              </div>                        
              <div className="row">
                <div className="col-md-3">
                  <input 
                    type="range" className="form-range" min="0" max="2" step="0.1" id="temperatureRange" 
                    value={temp} onChange={e => {setTemp(e.target.value)}}
                    data-bs-toggle="tooltip"
                    title={"GPT models - [Temperature 0<Coherencia...Creatividad<2] "+temp}
                  />
                </div>
                <div className="col-md-2">
                  <input 
                    type="range" className="form-range" min="0" max="1" step="0.1" id="toppRange" 
                    value={topp} onChange={e => {setTopp(e.target.value)}}
                    data-bs-toggle="tooltip"
                    title={"GPT models - [TopP 0% 0..1 100%] "+topp}
                  />
                </div>
                <div className="col-md-7">                
                  <select className="form-select" 
                    onChange={e => {setReasoningEffort(e.target.value)}} 
                    aria-label="Reasoning Effort"
                    defaultValue={reasoningEffort}
                    title={"o1 & o3-mini models - Reasoning effort "}
                    >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                  </select>                             
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <label htmlFor="model" className="form-label">Model</label>
              <select className="form-select mb-1" id="model" defaultValue="gpt-4.1" 
                value={model} onChange={(e) => {setModel(e.target.value)}}
                >
                  <option value="gpt-4o">gpt-4o | input $2.50/1M</option>
                  <option value="gpt-4o-mini">gpt-4o-mini | input $0.15/1M</option>
                  <option value="gpt-4-turbo">gpt-4-turbo | input $10/1M</option>
                  <option value="gpt-4.1">gpt-4.1 | input $2.0/1M</option>
                  <option value="gpt-4.1-mini">gpt-4.1-mini | input $0.4/1M</option>
                  <option value="gpt-4.1-nano">gpt-4.1-nano | input $0.1/1M</option>
                  <option value="o1">o1 | input $15/1M</option>
                  <option value="o1-pro">o1-pro | input $150/1M</option>
                  {/* <option value="o3">o3 | input $10/1M (verify id)</option> */}
                  <option value="o3-mini">o3-mini | input $1.10/1M</option>
                  <option value="o4-mini">o4-mini | input $1.10/1M</option>
                  {/* Add more model options here if needed */}
              </select>
              <label htmlFor="include" className="form-label">Incluir</label>                                          
              <select multiple className="form-select mb-1" id="include" value={include}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                  setInclude(selected);
                }}
              >
                <option value="code_interpreter_call.outputs">
                  code_interpreter_call.outputs
                </option>
                <option value="computer_call_output.output.image_url">
                  computer_call_output.output.image_url
                </option>
                <option value="file_search_call.results">
                  file_search_call.results
                </option>
                <option value="message.input_image.image_url">
                  message.input_image.image_url                          
                </option>
                <option value="message.output_text.logprobs">
                  message.output_text.logprobs
                </option>
                <option value="reasoning.encrypted_content">
                  reasoning.encrypted_content
                </option>
              </select>
              <small className="form-text text-muted">
                <pre> Ctrl (Windows) o Cmd (Mac) para selección múltiple.</pre>
              </small>
              <label htmlFor="previous_response_id" className="form-label">Identificador Respuesta previa</label>
              <textarea className="form-control mb-1" id="previous_response_id" rows="1" 
                value={previousresponse}
                onChange={ e => {setPreviousresponse(e.target.value)} }
              />                      
              <label htmlFor="text" className="form-label">Opciones para respuestas de texto</label>
              <textarea className="form-control" id="text" rows="1" 
                value={textStr}
                onChange={ e => {setTextStr(e.target.value)} }
              />
              <small className="form-text text-muted">
                <pre>{`{format: {"type":"json_schema"}} | {format: {"type":"text"}}`}</pre>
              </small>
              <label htmlFor="attachment" className="form-label">Attachment</label>
              <textarea className="form-control" id="attachment" rows="1" 
                value={fileid}
                onChange={ e => {setFileid(e.target.value)} }
              />
              <small className="form-text text-muted">
                <pre>Identificador de archivo</pre>
              </small>
              <label htmlFor="tools" className="form-label">Herramientas</label>
              <textarea className="form-control" id="tools" rows="1" 
                value={toolsStr}
                onChange={ e => {setToolsStr(e.target.value)} }>
              </textarea>
              <small className="form-text text-muted">
                <pre>File Search, Function, Web Search, Computer Use, MCP, Code interpreter, Image generation, Local shell</pre>
              </small>
              <label htmlFor="tool_choice" className="form-label">Cómo usar las herramientas</label>
              <textarea className="form-control" id="tool_choice" rows="1" 
                value={toolchoiceStr}
                onChange={ e => {setToolchoiceStr(e.target.value)} }>
              </textarea>
              <small className="form-text text-muted">
                <pre>{`none, auto, required | {"type": "file_search"}`}</pre>
              </small>
              <label htmlFor="metadata" className="form-label">Metadata</label>
              <textarea className="form-control" id="metadata" rows="1" 
                value={metadataStr}
                onChange={ e => {setMetadataStr(e.target.value)} }>
              </textarea>
            </div>                
          </div>                        
        </form>
        <div>
          <button type="submit" className="btn btn-primary mx-1 my-1" onClick={e => {handleSend}}>Enviar</button>
          <button type="submit" className="btn btn-primary mx-1 my-1" onClick={e => {handleDelete}}>Eliminar Respuesta</button>
          <pre>{responseMessage}</pre>
        </div>              
        <div>
          <label className="h6">Actividad:</label>              
          <ul className="list-group" id="runs_list">
            <li className="list-group-item"><pre>Id | Estado | Enviado | Inicio | Fin</pre></li>
            {responsesLog.map((resp, index) => (
              <li key={index} className="list-group-item" onClick={() => console.log('Click on Run')}>
                <pre>{resp.id} | {resp.status} | {convertToDate(resp.created_at)} | {convertToDate(resp.started_at)} | {convertToDate(resp.completed_at)}</pre>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
    return {
      props: {
        title: 'Responses',
      },
    };
  }
  
  /*
    Create model response
    Get model response
    Delete model response
    models? o1-pro....
  */