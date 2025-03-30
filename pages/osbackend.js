import { Fragment } from 'react';
import Head from "next/head";

import React from 'react';
import { useState } from 'react';

export default function CmdExec() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const sendCMD = async () => {
        if (!input.trim()) return;
        //console.log(input);

        try {
            const response = await fetch(
              'http://192.168.0.101:8000/os/execute/',
              {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded',},
                body: new URLSearchParams({
                    'command': input,
                  }),
              },
            );
            const data = await response.json();
            if (data) {
                if (data.output == '') { setOutput(data.output); }
                if (data.output) { setOutput(data.output); }
                if (data.error) { setOutput(data.error); }
            }            
            console.log(data);
            
          } catch (error) {
            console.error('Error communicating with ../os/execute', error);            
          }
    };

    return (
        <Fragment>
            <Head>
                <title>Command Execute</title>
                <meta name="OSBackend" content="OSBackend, command execution"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" /> 
                <link rel="icon" href="#" sizes="any" />
            </Head>
            <div className="container my-2">
                <div className="row">
                    <div className="col-md-9">
                        <input type="text" className="form-control" placeholder="Ejecutar..." aria-label="Ejecutar" 
                            value={input}
                            onChange={ e => {setInput(e.target.value);} }
                        />
                    </div>
                    <div className="col-md-3 d-flex flex-column align-items-center">
                        <button onClick={ sendCMD } className="btn btn-primary w-100" style={{ width: '18%' }}> Ejecutar </button>
                    </div>
                </div>
                <textarea
                    className="form-control w-100 d-inline my-3 border border-primary"
                    value={ output }
                    rows="18"
                />            
            </div>
        </Fragment>
    );
}