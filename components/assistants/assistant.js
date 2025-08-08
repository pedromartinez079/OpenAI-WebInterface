import { useEffect, useState } from 'react';
import axios from 'axios';
import AssistantForm from './assistantform';

export default function Assistant(props) {
  const activeAssistant = props.activeAssistant;
  const setActiveThread = props.setActiveThread;
  const setActiveTab = props.setActiveTab;
  const setActiveTools = props.setActiveTools;
  const [assistant, setAssistant] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const [threadList, setThreadList] = useState(null);
  const [threadid, setThreadid] = useState(null);
  const [updateThreadList, setUpdateThreadList] = useState(true);
  const [updateAssistant, setUpdateAssistant] = useState(true);
  const [nameF, setNameF] = useState(undefined);
  const [modelF, setModelF] = useState(undefined);
  const [instructionsF, setInstructionsF] = useState(undefined);
  const [toolsF, setToolsF] = useState(undefined);
  const [toolsStr, setToolsStr] = useState(undefined);
  const [toolresourcesF, setToolresourcesF] = useState(undefined);
  const [toolresourcesStr, setToolresourcesStr] = useState(undefined);
  const [metadataF, setMetadataF] = useState(undefined);
  const [metadataStr, setMetadataStr] = useState(undefined);
  const [temperatureF, setTemperatureF] = useState(undefined);
  const [toppF, setToppF] = useState(undefined);
  const [reasoningeffortF, setReasoningeffortF] = useState(undefined);
  
  const handleDelete = async () => {
    const url = '/api/assistant/deleteassistant';

    const isThreadListEmpty = threadList.length === 0;       

    if (!isThreadListEmpty) {
      setResponseMessage('Eliminar Threads antes de eliminar el Asistente.');
    } else {
      const userConfirmed = window.confirm('Por favor confirmar que desea eliminar Asistente');    
      if (userConfirmed && isThreadListEmpty) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ assistantid: activeAssistant }),
          });
        
          if (response.ok) {
            setResponseMessage('El asistente fue eliminado.');
          } else {
            const errorData = await response.json();
            setResponseMessage(`Error: ${errorData.message}`);
          }
        } catch (error) {
          setResponseMessage(`Request failed: ${error.message}`);
        }
      }
    }
  };
  const modifyAssistant = async (e) => {
    e.preventDefault();
    //console.log('Modify assistant:', nameF, modelF, instructionsF, toolsF, toolresourcesF, metadataF);
    
    try {
      let models = ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'o1', 'o3-mini'];
      let filtertemptopp = ['gpt-5', 'gpt-5-mini', 'gpt-5-nano', 'o1', 'o3-mini'];
      if (!models.includes(modelF)) {
        throw new Error('Modelo incorrecto.');
      }
      let toolsarray = typeof toolsF !== 'object' ? JSON.parse(toolsF) : toolsF;
      let toolresourcesobj = typeof toolresourcesF !== 'object' ? JSON.parse(toolresourcesF) : toolresourcesF;
      let metadataobj = typeof metadataF !== 'object' ? JSON.parse(metadataF) : metadataF;
      //let reasoningeffortstr = modelF === 'o3-mini' || modelF === 'o1' ? reasoningeffortF : null;
      //let temperaturefloat = modelF === 'o3-mini' || modelF === 'o1' ? null : parseFloat(temperatureF);
      //let toppfloat = modelF === 'o3-mini' || modelF === 'o1' ? null : parseFloat(toppF);
      let reasoningeffortstr = null;
      let temperaturefloat = null;
      let toppfloat = null;

      if (filtertemptopp.includes(modelF)) {
        temperaturefloat = null;
        toppfloat = null;
      } else {
        temperaturefloat = parse(temperatureF);
        toppfloat = parse(toppF);
      }
      
      if (modelF === 'o3-mini' || modelF === 'o1') {
        if (reasoningeffortF === null) {reasoningeffortstr='medium';} else {reasoningeffortstr=reasoningeffortF;}
      } else {reasoningeffortstr=null;}
      //console.log(reasoningeffortstr, toolsarray, toolresourcesobj, metadataobj);
      const responsemodifyassistant = await axios.post('/api/assistant/modifyassistant',
        {
          assistant_id: activeAssistant,
          name: nameF,
          model: modelF,
          instructions: instructionsF,
          tools: toolsarray,
          tool_resources: toolresourcesobj,
          metadata: metadataobj,
          reasoning_effort: reasoningeffortstr,
          temperature: temperaturefloat,
          top_p: toppfloat,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
      });
      setResponseMessage('Asistente modificado: '+ responsemodifyassistant.data.id);
      setUpdateAssistant(!updateAssistant);
    } catch (error) {
      setResponseMessage('Asistente no modificado: ' + error);
    }
  };    
  const createThread = async (e) => {
    e.preventDefault();
    // console.log('Create thread', assistantid, messages);
    try {
      const responsethread = await axios.post('/api/thread/createthread', 
        {
          messages: [], 
          assistant_id: activeAssistant,
          tool_resources: {},
          metadata: {},
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
        },
      });        
      setThreadid(responsethread.data.id);
      setResponseMessage('Thread creado: ' + responsethread.data.id);
      // console.log('Thread created: ', responsethread.data.id);
    } catch (error) {
      setResponseMessage('Thread no creado: ' + error);
      // console.error('Error creating thread:', error);
    }
  };
  const gotoThread = (selectedThreadId) => {
    setActiveThread(selectedThreadId);
    setActiveTab('thread');
  };
  //Retrieve Assistant information
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/assistant/retrieveassistant', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ assistant: activeAssistant })
        });
        if (!response.ok) {
          throw new Error('Assistant retrieve response was not okay');
        }
        const result = await response.json();
        setAssistant(result);
        setActiveTools(result.tools);
        setNameF(result.name);
        setModelF(result.model);
        setInstructionsF(result.instructions);
        setToolsF(result.tools);
        setToolresourcesF(result.tool_resources);
        setMetadataF(result.metadata);
        setReasoningeffortF(result.reasoning_effort);
        setTemperatureF(result.temperature);
        setToppF(result.top_p);
        setToolsStr(JSON.stringify(result.tools, null, 0));
        setToolresourcesStr(JSON.stringify(result.tool_resources, null, 0));
        setMetadataStr(JSON.stringify(result.metadata, null, 0));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };        

    fetchData();        
  }, [updateAssistant]);
  // Retrieve Threads for Assistant
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const responseThreads = await axios.post('/api/thread/getthreads', {assistant: activeAssistant}, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setThreadList(responseThreads.data.threads);
        // console.log(responseThreads.data);
      } catch (error) {
        setResponseMessage('MongoDB sin información de Threads: ' + error.response.data.message);
        // console.log(error);
      }
    };
    fetchThreads();
  }, [assistant, updateThreadList]);
  // Insert new Thread in DB
  useEffect(() => {
    const insertThread = async () => {
      if (threadid !== undefined) {
        try {
          const newThread = {threadid: threadid, assistantid: activeAssistant};
          const responseinsert = await axios.post('/api/db/insertthreaddb', {thread: newThread}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setResponseMessage(responseMessage + '\n' + 'Thread inserted in DB: ' + responseinsert.data.message.insertedId);
          setUpdateThreadList(!updateThreadList);
          // console.log('Thread on mongoDB', responseinsert.data);
        } catch (error) {
          setResponseMessage(responseMessage + '\n' + 'Thread inserted failed: ' + error);
          // console.error('MongoDB, thread insert failed:', error);
        }
      }
    };
    if (threadid !== null) {insertThread();}
  }, [threadid]);
  if (loading) return <div>Loading...</div>;
  //console.log(data);
  if (error) return <div>Error: {JSON.stringify(error.message)}</div>;
  
  return (
      <div className="container mt-2 mb-2">
          <div>
            <button type="submit" className="btn btn-primary mx-1" onClick={handleDelete}>Eliminar</button>
            <button type="submit" className="btn btn-primary mx-1" onClick={modifyAssistant}>Modificar</button>
            <button type="submit" className="btn btn-primary mx-1" onClick={createThread}>Crear Thread</button>
            <pre>{responseMessage}</pre>
          </div>
          <AssistantForm assistant={assistant} setNameF={setNameF} setModelF={setModelF}
            setInstructionsF={setInstructionsF} setToolsF={setToolsF} setToolresourcesF={setToolresourcesF}
            setMetadataF={setMetadataF} setReasoningeffortF={setReasoningeffortF} 
            setTemperatureF={setTemperatureF} setToppF={setToppF} nameF={nameF} modelF={modelF} 
            instructionsF={instructionsF} toolsF={toolsF} toolresourcesF={toolresourcesF} metadataF={metadataF}
            reasoningeffortF={reasoningeffortF} temperatureF={temperatureF} toppF={toppF}
            toolsStr={toolsStr} toolresourcesStr={toolresourcesStr} metadataStr={metadataStr} 
            setToolsStr={setToolsStr} setToolresourcesStr={setToolresourcesStr} setMetadataStr={setMetadataStr}
          />
          <div>
            <label className="h6">Threads:</label>
            { threadList !== null &&
            <ul className="list-group" id="threads_list">
              {threadList.map((thr, index) => (
                <li key={index} className="list-group-item" onClick={() => gotoThread(thr.threadid)}>
                  <pre>{thr.threadid}</pre>
                </li>
              ))}
            </ul>}
          </div>            
      </div>
  );
}


/*
MongoDB -> db: openai | collection: threads
{_id:ObjectId("...") , threadid:'thread_001' , assistantid:'assist_123'}

tools: [{type:'code_interpreter'}, {type:'function', function:[...]}, {type:'file_search', file_search:{...}}]
tool_resources: {
  code_interpreter: { file_ids: [...] },
  file_search: { vector_store_ids: [...], vector_stores: [{file_ids:[], metadata: {}}, {file_ids:[], metadata: {}}] }
}

ToDo:

*/