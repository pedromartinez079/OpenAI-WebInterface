import { Fragment } from 'react';
import Head from "next/head";

import React, { useState } from 'react';

import CreateAssistant from '@/components/assistants/create';
import ListAssistants from '@/components/assistants/list';
import Assistant from '@/components/assistants/assistant';
import Thread from '@/components/assistants/thread';
import Files from '@/components/assistants/files';

export default function Assistants(props) {
    const [activeTab, setActiveTab] = useState('');
    const [activeAssistant, setActiveAssistant] = useState('');
    const [activeThread, setActiveThread] = useState('');
    const [tools, setTools] = useState([]);

    const renderContent = () => {
        switch (activeTab) {
            case 'newassistant':
                return <CreateAssistant />;
            case 'list':
                return <ListAssistants setActiveTab={setActiveTab} setActiveAssistant={setActiveAssistant} />;
            case 'assistant':
                return <Assistant setActiveTab={setActiveTab} setActiveThread={setActiveThread} activeAssistant={activeAssistant} setActiveTools={setTools}/>;
            case 'thread':
                return <Thread activeThread={activeThread} activeAssistant={activeAssistant} activeTools={tools}/>;
            case 'files':
                return <Files />;
            default:
                return <ListAssistants setActiveTab={setActiveTab} setActiveAssistant={setActiveAssistant} />;
        }
    };
    
    return (
        <Fragment>
            <Head>
                <title>Asistentes o Agentes</title>
                <meta name="Open AI" content="Open AI assistants, threads, runs, messages, tools"/>
                <meta name="viewport" content="width=device-width, initial-scale=1" /> 
                <link rel="icon" href="#" sizes="any" />
            </Head>
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'newassistant' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('newassistant')}
                        >
                            Crear Asistente
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'list' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('list')}
                        >
                            Lista de Asistentes
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'assistant' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('assistant')}
                        >
                            Usar Asistente
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'thread' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('thread')}
                        >
                            Usar Thread
                        </button>
                    </li>
                    <li className="nav-item">
                        <button 
                            className={`nav-link ${activeTab === 'files' ? 'active' : ''}`} 
                            onClick={() => setActiveTab('files')}
                        >
                            Archivos
                        </button>
                    </li>
                </ul>
                <div className="tab-content mt-3">
                    {renderContent()}
                </div>
            </div>
        </Fragment>
    );
}

export async function getStaticProps() {
    return {
      props: {
        title: 'Asistentes',
      },
    };
  }

/*
Tab list:
    Create assistant
    List assistants
    Use assistant
    Use thread
    Files

To DO:
  Vector Store
    https://platform.openai.com/docs/api-reference/vector-stores
    https://platform.openai.com/docs/api-reference/vector-stores-files
*/