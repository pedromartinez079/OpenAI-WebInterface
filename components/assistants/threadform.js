import axios from "axios";
import { useState, useEffect } from "react";

export default function ThreadForm(props) {
    const assistantid = props.assistantid;
    const threadid = props.threadid;
    const tools = props.tools;
    const messages = props.messages
    const setMessages = props.setMessages;
    const [inputmsg, setInputmsg] = useState('');
    const [fileid, setFileid] = useState('');
    // const [attachments, setAttachments] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [updateMessages, setUpdateMessages] = useState(true);
    const [threadRuns, setThreadRuns] = useState([]);
    const [enableRuns, setEnableRuns] = useState(false);
    const [toolresourcesObj, setToolresourcesObj] = useState({});
    const [toolresourcesStr, setToolresourcesStr] = useState(undefined);
    const [metadataObj, setMetadataObj] = useState({}); 
    const [metadataStr, setMetadataStr] = useState(undefined);

    let attachments = [];
    // console.log(threadid, tools); 
    
    const convertToDate = (ts) => {
      const date = new Date(Number(ts) * 1000);
      const formattedDate = date.toLocaleString();
      return(formattedDate);
    };

    const handleToolResourcesChange = (e) => {
      let valueObj = null; 
        try {
            valueObj = JSON.parse(e.target.value);
            setToolresourcesObj(valueObj);
            setToolresourcesStr(e.target.value);
        } catch (error) {
            setToolresourcesStr(e.target.value);
            console.log('ToolResources parsing failed '+error);
        }
    };

    const handleMetadataChange = (e) => {
      let valueObj = null; 
        try {
            valueObj = JSON.parse(e.target.value);
            setMetadataObj(valueObj);
            setMetadataStr(e.target.value);
        } catch (error) {
            setMetadataStr(e.target.value);
            console.log('Metadata parsing failed '+error);
        } 
    };

    const sendMessage = async (e) => {
      e.preventDefault();
      if (!inputmsg.trim()) return;
      // console.log(threadid, tools);
      if (tools.length === 0 || fileid === '') {
        attachments=[];
      }
      else {
        console.log('Tool exists');
        if (tools.some(obj => obj.hasOwnProperty('type'))) {
          console.log('Type key exists', tools[0]);
          if (tools.some(obj => obj.type === 'code_interpreter')) {
            attachments = [{file_id: fileid, tools: [{type: 'code_interpreter'}]}];
          }
          if (tools.some(obj => obj.type === 'file_search')) {
            attachments = [{file_id: fileid, tools: [{type: 'file_search'}]}];
          }
          if (tools.some(obj => obj.type === 'function')) {
            attachments = [];
          }
        }
        // console.log(attachments);
      }
      if (threadid !== undefined) {
        console.log('Send message', attachments);
        try {
          const responsesendmessage = await axios.post('/api/thread/createthreadmessage', 
            {
              thread: threadid,
              role: "user",
              content: inputmsg,
              attachments: attachments,
            }, 
            {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setUpdateMessages(!updateMessages);
          setInputmsg('');
          setResponseMessage('Mensaje creado, ahora Ejecutar Thread.');
          console.log('Message created: ', responsesendmessage.data.data);
        } catch (error) {
          setResponseMessage('Mensaje no creado: ' + error);
          // console.error('Error creating thread:', error);
        }

      }      
    };

    const runThread = async (e) => {
      e.preventDefault();
      if (threadid !== undefined && assistantid !== undefined && enableRuns) {
        console.log('Run thread');
        try {
          const responserunthread = await axios.post('/api/thread/runthread', 
            {
              thread: threadid,
              assistant_id: assistantid,
            }, 
            {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setUpdateMessages(!updateMessages);
          setResponseMessage('Thread ejecutado.');
          console.log('Run executed: ', responserunthread.data);
        } catch (error) {
          setResponseMessage('Thread no ejecutado: ' + error);
          // console.error('Error creating thread:', error);
        }
      }
    };

    const modifyThread = async (e) => {
      e.preventDefault();
      if (threadid !== undefined) {
        console.log('Modify thread');
        try {
          const responsemodifythread = await axios.post('/api/thread/modifythread', 
            {
              thread_id: threadid,
              tool_resources: toolresourcesObj,
              metadata: metadataObj,
            },
            { headers: {'Content-Type': 'application/json'}}
          );
          setResponseMessage('Thread modificado.');
          console.log('Thread modified: ', responsemodifythread.data);
        } catch (error) {
          setResponseMessage('Thread no modificado: ' + error);
        }
      }
    }

    const deleteThread = async (e) => {
      e.preventDefault();

      const userConfirmed = window.confirm('Por favor confirmar que desea eliminar Thread');
      if (userConfirmed) {
        if (threadid !== undefined) {
          console.log('Delete thread');      
          // /api/deletethread
          let deleteok = false;
          try {
            const responsedeletethread = await axios.post('/api/thread/deletethread', 
              {
                threadid: threadid,
              }, 
              {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // setResponseMessage('Thread deleted');
            deleteok = true;
            console.log('Thread deleted', responsedeletethread.data);
          } catch (error) {
            console.log('Thread not deleted: ', error);
          }
          // Delete document in MongoDB
          let deletedbok = false;
          try {
            const responsedeletethreaddb = await axios.post('/api/db/deletethreaddb', 
              {
                filter: { threadid: threadid },
              }, 
              {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            // setResponseMessage('Thread deleted in DB');
            deletedbok = true;
            console.log('Thread deleted in DB', responsedeletethreaddb.data);
          } catch (error) {
            console.log(responseMessage, 'Thread not deleted: ', error);
          }

          if (deleteok && deletedbok) {
            setResponseMessage('Thread eliminado en OpenAI y DB.');
          } else {
            if (deleteok) {
              setResponseMessage('Thread eliminado en OpenAi, no en DB.');
            }
            if (deletedbok) {
              setResponseMessage('Thread eliminado en DB, no en OpenAI.');
            }
            if (!deleteok && !deletedbok) {
              setResponseMessage('Thread no eliminado en OpenAi ni en DB.');
            }
          }
        }
      }
    };

    // Retrieve Thread information
    useEffect(() => {
      const fetchThreadInformation = async () => {
        console.log('Fetch thread information');
        try {
          const responseThread = await axios.post('/api/thread/retrievethread', {thread_id: threadid}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(responseThread.data);
          setToolresourcesObj(responseThread.data.tool_resources);
          setToolresourcesStr(JSON.stringify(responseThread.data.tool_resources, null, 0));
          setMetadataObj(responseThread.data.metadata);
          setMetadataStr(JSON.stringify(responseThread.data.metadata, null, 0));
        } catch (error) {
          console.log(error);
        }
        setUpdateMessages(!updateMessages);
      };

      fetchThreadInformation();
    }, []);

    // Retrieve Messages from a Thread
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const responseMessages = await axios.post('/api/thread/listthreadmessages', {thread: threadid}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setMessages(responseMessages.data.data);
          console.log(responseMessages.data.data);
          if (responseMessages.data.data.length > 0) {
            if (responseMessages.data.data[0].role === 'user') { setEnableRuns(true); }
            if (responseMessages.data.data[0].role === 'assistant') { setEnableRuns(false); }
          }
        } catch (error) {
          // setError(error);
          console.log(error);
        }
      };

      if (threadid !== null) {fetchMessages();} else {console.log("threadID is null, not fetching messages");}
      // fetchMessages();
    }, [updateMessages]);

    // Retrieve Runs from a Thread
    useEffect(() => {
      const fetchRuns = async () => {
        try {
          const responseRuns = await axios.post('/api/thread/listthreadruns', {thread: threadid}, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          setThreadRuns(responseRuns.data.data)
          // console.log(threadRuns);
        } catch (error) {
          // setError(error);
          console.log(error);
        }
      };

      if (threadid !== null) {fetchRuns();} else {console.log("threadID is null, not fetching runs");}
      
    }, [messages]);

    return (
        <div className="container mt-4">
          <form>
            <div className="row mb-3">
                <div className="col-md-8">
                    <label htmlFor="message" className="form-label">Mensaje</label>
                    <textarea className="form-control" id="message" rows="4"
                      value={inputmsg}
                      onChange={ e => {setInputmsg(e.target.value);} }
                    />                    
                </div>
                <div className="col-md-4">
                  <label htmlFor="attachment" className="form-label">Attachment</label>
                  <textarea className="form-control" id="attachment" rows="1" 
                    value={fileid}
                    onChange={ e => {setFileid(e.target.value);} }
                  />
                  <small className="form-text text-muted">
                    <pre>Identificador de archivo</pre>
                  </small>
                  <label htmlFor="tool_resources" className="form-label">Tool Resources</label>
                  <textarea className="form-control" id="tool_resources" rows="1" 
                    value={toolresourcesStr}
                    onChange={handleToolResourcesChange}>
                  </textarea>
                  <label htmlFor="metadata" className="form-label">Metadata</label>
                  <textarea className="form-control" id="metadata" rows="1" 
                    value={metadataStr}
                    onChange={handleMetadataChange}>
                  </textarea>
                </div>                
            </div>                        
          </form>
          <div>
            <button type="submit" className="btn btn-primary mx-1 my-1" onClick={sendMessage}>Enviar mensaje</button>
            <button type="submit" className="btn btn-primary mx-1 my-1" onClick={runThread}>Ejecutar Thread</button>
            <button type="submit" className="btn btn-primary mx-1 my-1" onClick={modifyThread}>Modificar Thread</button>
            <button type="submit" className="btn btn-primary mx-1 my-1" onClick={deleteThread}>Eliminar Thread</button>
            <pre>{responseMessage}</pre>
          </div>
          <div>
              <label className="h6">Actividad:</label>              
              <ul className="list-group" id="runs_list">
                <li className="list-group-item"><pre>Id | Estado | Enviado | Inicio | Fin</pre></li>
                {threadRuns.map((run, index) => (
                  <li key={index} className="list-group-item" onClick={() => console.log('Click on Run')}>
                    <pre>{run.id} | {run.status} | {convertToDate(run.created_at)} | {convertToDate(run.started_at)} | {convertToDate(run.completed_at)}</pre>
                  </li>
                ))}
              </ul>
            </div>
        </div>
      );
}

/*
tool_resources: {
  code_interpreter: { file_ids: [...] },
  file_search: { vector_store_ids: [...], vector_stores: [{file_ids:[], metadata: {}}, {file_ids:[], metadata: {}}] }
}

To Do:
- Test with different models, tools, tool_resources
*/