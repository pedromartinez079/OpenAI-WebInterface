import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';

export default function Response(props) {
  const responsesLog = [];
  const inputmsg = "inputmsg";
  const model = "";
  const fileid = "fileid";
  const toolresourcesStr = "toolresourcesStr";
  const metadataStr = "metadataStr";
  const responseMessage = "responseMessage";

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
                        <textarea className="form-control" id="response" rows="14"
                          value={inputmsg}
                          onChange={ e => {} }
                        />
                        <label htmlFor="input" className="form-label">Mensaje</label>
                        <textarea className="form-control" id="input" rows="4"
                          value={inputmsg}
                          onChange={ e => {} }
                        /> 
                        <label htmlFor="instructions" className="form-label">Instrucciones</label>
                        <textarea className="form-control" id="instructions" rows="4"
                          value={inputmsg}
                          onChange={ e => {} }
                        />
                        <div className="d-flex gap-3 my-2">
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="parallel_tool_calls"
                              checked={true}
                              onChange={e => {}}
                            />
                            <label className="form-check-label" htmlFor="parallel_tool_calls">
                              parallel_tool_calls
                            </label>                          
                          </div>                        
                          <div className="form-check form-switch">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="store"
                              checked={true}
                              onChange={e => {}}
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
                              checked={true}
                              onChange={e => {}}
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
                              value="1" onChange={e => {}}
                              data-bs-toggle="tooltip"
                              title={"GPT models - [Temperature 0<Coherencia...Creatividad<2] "+1}
                            />
                          </div>
                          <div className="col-md-2">
                            <input 
                              type="range" className="form-range" min="0" max="1" step="0.1" id="toppRange" 
                              value="0.5" onChange={e => {}}
                              data-bs-toggle="tooltip"
                              title={"GPT models - [TopP 0% 0..1 100%] "+0.5}
                            />
                          </div>
                          <div className="col-md-7">                
                            <select className="form-select" 
                                onChange={e => {}} 
                                aria-label="Reasoning Effort"
                                defaultValue="low"
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
                      <select className="form-select" id="model" defaultValue="gpt-4.1" 
                        value={model} onChange={() => {}}
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
                      <select className="form-select" id="include" value={model} onChange={() => {}}>
                          <option value="file_search_call.results">file_search_call.results</option>
                          <option value="message.input_image.image_url">message.input_image.image_url</option>
                          <option value="computer_call_output.output.image_url">computer_call_output.output.image_url</option>
                      </select>
                      <label htmlFor="previous_response_id" className="form-label">previous_response_id</label>
                      <textarea className="form-control" id="previous_response_id" rows="1" 
                        value=""
                        onChange={ e => {} }
                      />
                      <small className="form-text text-muted">
                        <pre>Identificador Respuesta previa</pre>
                      </small>
                      <label htmlFor="text" className="form-label">Text output options</label>
                      <textarea className="form-control" id="text" rows="1" 
                        value=""
                        onChange={ e => {} }
                      />
                      <small className="form-text text-muted">
                        <pre>{`{format: {"type":"json_schema"}}`}</pre>
                      </small>
                      <label htmlFor="attachment" className="form-label">Attachment</label>
                      <textarea className="form-control" id="attachment" rows="1" 
                        value={fileid}
                        onChange={ e => {} }
                      />
                      <small className="form-text text-muted">
                        <pre>Identificador de archivo</pre>
                      </small>
                      <label htmlFor="tools" className="form-label">Tools</label>
                      <textarea className="form-control" id="tools" rows="1" 
                        value="[]"
                        onChange={ e => {} }>
                      </textarea>
                      <small className="form-text text-muted">
                        <pre>File Search, Function, Web Search, Computer Use</pre>
                      </small>
                      <label htmlFor="tool_choice" className="form-label">How to select tools to use for a response</label>
                      <textarea className="form-control" id="tool_choice" rows="1" 
                        value="auto"
                        onChange={ e => {} }>
                      </textarea>
                      <small className="form-text text-muted">
                        <pre>{`none, auto, required | {"type": "file_search"}`}</pre>
                      </small>
                      <label htmlFor="metadata" className="form-label">Metadata</label>
                      <textarea className="form-control" id="metadata" rows="1" 
                        value={metadataStr}
                        onChange={ e => {} }>
                      </textarea>
                    </div>                
                </div>                        
              </form>
              <div>
                <button type="submit" className="btn btn-primary mx-1 my-1" onClick={e => {}}>Enviar mensaje</button>
                <button type="submit" className="btn btn-primary mx-1 my-1" onClick={e => {}}>Ejecutar Thread</button>
                <button type="submit" className="btn btn-primary mx-1 my-1" onClick={e => {}}>Modificar Thread</button>
                <button type="submit" className="btn btn-primary mx-1 my-1" onClick={e => {}}>Eliminar Thread</button>
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