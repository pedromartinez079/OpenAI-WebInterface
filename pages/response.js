import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';

export default function Response(props) {
  const responsesLog = [];
  const inputmsg = "inputmsg";
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
                        <label htmlFor="message" className="form-label">Mensaje</label>
                        <textarea className="form-control" id="message" rows="4"
                          value={inputmsg}
                          onChange={ e => {} }
                        />                    
                    </div>
                    <div className="col-md-4">
                      <label htmlFor="attachment" className="form-label">Attachment</label>
                      <textarea className="form-control" id="attachment" rows="1" 
                        value={fileid}
                        onChange={ e => {} }
                      />
                      <small className="form-text text-muted">
                        <pre>Identificador de archivo</pre>
                      </small>
                      <label htmlFor="tool_resources" className="form-label">Tool Resources</label>
                      <textarea className="form-control" id="tool_resources" rows="1" 
                        value={toolresourcesStr}
                        onChange={ e => {} }>
                      </textarea>
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