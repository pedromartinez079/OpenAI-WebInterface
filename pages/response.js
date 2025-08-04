import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Response(props) {  
  const [responseOutput, setResponseOutput] = useState(null);
  const [showResponse, setShowResponse] = useState(null);
  const [input, setInput] = useState(undefined);
  const [instructions, setInstructions] = useState(undefined);
  const [paralleltoolcalls, setParalleltoolcalls] = useState(false);
  const [store, setStore] = useState(false);
  const [stream, setStream] = useState(false);
  const [temp, setTemp] = useState(0.75);
  const [topp, setTopp] = useState(1);
  const [reasoningEffort, setReasoningEffort] = useState({});  
  const [model, setModel] = useState("gpt-4.1");
  const [include, setInclude] = useState([]);
  const [previousresponse, setPreviousresponse] = useState(undefined);
  const [textStr, setTextStr] = useState(undefined);
  const [fileid, setFileid] = useState(undefined);
  const [toolsStr, setToolsStr] = useState(undefined);
  const [toolchoiceStr, setToolchoiceStr] = useState(undefined);
  const [metadataStr, setMetadataStr] = useState(undefined);
  const [responseMessage, setResponseMessage] = useState(null);
  const [responsesLog, setResponsesLog] = useState([]);
  const omodels = ['o1','o1-pro','o3-mini','o4-mini'];

  const convertToDate = (ts) => {
    const date = new Date(Number(ts) * 1000);
    const formattedDate = date.toLocaleString();
    return(formattedDate);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    let inputobj = input;
    let reasoning = null;
    let temperature = null;
    let noStream = false; // Stream disabled for now
    let prevmsgid = null;
    let metadata = null;
    let text = null;
    let tools = null;
    let toolchoice = null;
    let includearray = null;
    if (previousresponse === '') { prevmsgid = undefined }
    else { prevmsgid = previousresponse }
    // To do: Image input, file input, file search
    if ((fileid !== undefined) && (fileid !== '') && (fileid !== null)) { 
      inputobj = [{role:"user",
                  content: [{type: "input_file", file_id: fileid}, {type: "input_text", text:input}]
                }] 
    }
    try { 
      if (!(metadataStr === undefined)) { metadata = JSON.parse(metadataStr); }
      if (!(textStr === undefined)) { text = JSON.parse(textStr); }
      if (!(toolsStr === undefined)) { tools = JSON.parse(toolsStr); }
      if (['none','auto','required'].includes(toolchoiceStr)) { toolchoice = toolchoiceStr }
      else { 
        if (!(toolchoiceStr === undefined)) { toolchoice = JSON.parse(toolchoiceStr) }
      }      
    } 
    catch (error) { console.log(error) }
    //console.log(omodels.includes(model));
    if (omodels.includes(model)) { 
      reasoning = reasoningEffort;
      if (include !== null && include.includes("message.output_text.logprobs")) {
        includearray = include.filter(item => item !== "message.output_text.logprobs");
      }
    }
    else { 
      temperature = temp;
      if (include !== null && include.includes("reasoning.encrypted_content")) {
        includearray = include.filter(item => item !== "reasoning.encrypted_content");
      }
    }
    let data = {
      input: inputobj, model: model, include: includearray, instructions: instructions, metadata: metadata,
      parallel_tool_calls: paralleltoolcalls, previous_response_id: prevmsgid, reasoning: reasoning,
      store: store, stream: noStream, temperature: temperature, top_p: topp, text: text, tools: tools,
      tool_choice: toolchoice, safety_identifier: null,
    };
    console.log('Create Response', data);
    try {
      const response = await axios.post('/api/response/createresponse', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //console.log('Response created:', response.data);
      setResponseOutput(response.data),
      setResponseMessage('Respuesta creada.');
    } catch (error) {
      console.error('Error creating response:', error);
      if (error !== undefined) {setResponseOutput(error.response.data.error.error.message);}
      setResponseMessage('Respuesta no ha sido creada.');
    }
  }

  const handleDelete = async (e) => {}

  //Get Responses
  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const responseslist = await axios.get('/api/response/getresponses', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setResponsesLog(responseslist.data.responses);
        console.log('Responses list:', responseslist.data.responses);
      } catch (error) {
          console.log(error);
      }
    };
    fetchResponses();
  }, []);

  // Show & Store Response output
  useEffect(() => {
    // Insert Response in DB
    const insertResponse = async () => {
      if (store === true && responseMessage === 'Respuesta creada.') {
          try {
            const responseinsert = await axios.post('/api/db/insertresponsedb', {response: responseOutput}, {
              headers: {
                'Content-Type': 'application/json',
              },        
            });
            console.log(responseinsert);
          }
          catch (error) {}
      }
    }
    // Check responseOutput array: it could have more than one element depending on response creation
    if ((responseOutput !== null) && (responseOutput !== undefined)) {
      console.log('Response Output:', responseOutput, typeof responseOutput);
      if (typeof responseOutput === "string") { setShowResponse(responseOutput) }
      else if (typeof responseOutput === "object") {
        if (omodels.includes(model)) {
          setShowResponse(responseOutput.output[1].content[0].text);
        }
        else { setShowResponse(responseOutput.output[0].content[0].text) }
      }
      else { setShowResponse('Response type unknown') }
      insertResponse();
    }
    else {setShowResponse('')}    
  }, [responseOutput]);

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
              <div className="chat-container border border-primary px-3 py-1 my-2" style={{ height: '30rem', overflowY: 'scroll', padding: '10px', borderRadius: '10px' }}>
                <pre className="form-control-plaintext border rounded bg-light mb-1" id="response" style={{ minHeight: '2rem', whiteSpace: "pre-wrap", wordBreak: "break-word", overflowX: "auto" }}>
                  {showResponse}
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
                    value={temp} onChange={e => {setTemp(parseFloat(e.target.value))}}
                    data-bs-toggle="tooltip"
                    title={"GPT models - [Temperature 0<Coherencia...Creatividad<2] "+temp}
                  />
                </div>
                <div className="col-md-2">
                  <input 
                    type="range" className="form-range" min="0" max="1" step="0.1" id="toppRange" 
                    value={topp} onChange={e => {setTopp(parseFloat(e.target.value))}}
                    data-bs-toggle="tooltip"
                    title={"GPT models - [TopP 0% 0..1 100%] "+topp}
                  />
                </div>
                <div className="col-md-7">                
                  <select className="form-select" 
                    onChange={e => {setReasoningEffort({effort: e.target.value, summary:  null})}} 
                    aria-label="Reasoning Effort"
                    value={reasoningEffort}
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
              <select className="form-select mb-1" id="model" 
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
                <pre>{`{"format": {"type":"text"}} | {"format": {"type":"json_schema", "name":"myFormat", "schema":{"type":"object", "properties":{"output":{"type":"object"}}}}}`}</pre>
              </small>
              <label htmlFor="attachment" className="form-label">Attachment</label>
              <textarea className="form-control" id="attachment" rows="1" 
                value={fileid}
                onChange={ e => {setFileid(e.target.value)} }
              />
              <small className="form-text text-muted">
                <pre>Identificador de archivo, sólo formato PDF</pre>
              </small>
              <label htmlFor="tools" className="form-label">Herramientas</label>
              <textarea className="form-control" id="tools" rows="1" 
                value={toolsStr}
                onChange={ e => {setToolsStr(e.target.value)} }>
              </textarea>
              <small className="form-text text-muted">
                <pre>{`[{"type":"code_interpreter", "container":{ CodeInterpreterContainerAuto:{"type":"auto", "file_ids": []}}}},\n{"type":"function", "function":{"name":"FunctionName", "parameters":{"type":"object","properties":{"query":{"type":"string", "description":"question"}}}}},\n{"type":"web_search_preview_2025_03_11"}]`}</pre>
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
          <button type="submit" className="btn btn-primary mx-1 my-1" onClick={handleSend}>Enviar</button>
          <button type="submit" className="btn btn-primary mx-1 my-1" onClick={handleDelete}>Eliminar Respuesta</button>
          <pre>{responseMessage}</pre>
        </div>              
        <div>
          <label className="h6">Actividad:</label>              
          <ul className="list-group" id="responses_list">
            <li className="list-group-item"><pre>Id | Fecha | Metadata</pre></li>
            {responsesLog.map((resp, index) => (
              <li key={index} className="list-group-item" onClick={() => console.log('Click on Response')}>
                <pre>{resp.id} | {convertToDate(resp.created_at)} | {JSON.stringify(resp.metadata)}</pre>
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