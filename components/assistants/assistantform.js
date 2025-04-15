
export default function AssistantForm(props) {
    const assistant = props.assistant;
    const setNameF = props.setNameF; const nameF = props.nameF;
    const setModelF = props.setModelF; const modelF = props.modelF;
    const setInstructionsF = props.setInstructionsF; const instructionsF = props.instructionsF;
    const setToolsF = props.setToolsF; const toolsF = props.toolsF;
    const setToolresourcesF = props.setToolresourcesF; const toolresourcesF = props.toolresourcesF;
    const setMetadataF = props.setMetadataF; const metadataF = props.metadataF;
    const setReasoningeffortF = props.setReasoningeffortF; const reasoningeffortF = props.reasoningeffortF;
    const setTemperatureF = props.setTemperatureF; const temperatureF = props.temperatureF;
    const setToppF = props.setToppF; const toppF = props.toppF;
    const setToolsStr = props.setToolsStr; const toolsStr = props.toolsStr
    const setToolresourcesStr = props.setToolresourcesStr; const toolresourcesStr = props.toolresourcesStr;
    const setMetadataStr = props.setMetadataStr; const metadataStr = props.metadataStr;

    const handleToolsChange = (e) => {
        let valueObj = null; 
        try {
            valueObj = JSON.parse(e.target.value);
            setToolsF(valueObj);
            setToolsStr(e.target.value);
        } catch (error) {
            setToolsStr(e.target.value);
            //console.log('Tools parsing failed '+error);
        }        
    };

    const handleToolResourcesChange = (e) => {
        let valueObj = null; 
        try {
            valueObj = JSON.parse(e.target.value);
            setToolresourcesF(valueObj);
            setToolresourcesStr(e.target.value);
        } catch (error) {
            setToolresourcesStr(e.target.value);
            //console.log('ToolResources parsing failed '+error);
        }        
    };

    const handleMetadataChange = (e) => {
        let valueObj = null; 
        try {
            valueObj = JSON.parse(e.target.value);
            setMetadataF(valueObj);
            setMetadataStr(e.target.value);
        } catch (error) {
            setMetadataStr(e.target.value);
            //console.log('Metadata parsing failed '+error);
        }        
    };

    return (
        <div className="container mt-4">
          <form>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="id" className="form-label">ID</label>
                    <input type="text" className="form-control" id="id" value={assistant.id} readOnly />
                </div>
                <div className="col-md-6">
                    <label htmlFor="created_at" className="form-label">Fecha de creación</label>
                    <input type="text" className="form-control" id="created_at" 
                        value={new Date(assistant.created_at * 1000).toLocaleString()} readOnly 
                    />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="name" value={nameF}
                        onChange={e => {setNameF(e.target.value);}} autoComplete="on"
                    />
                </div>
                <div className="col-md-6">
                    <label htmlFor="model" className="form-label">Model</label>
                    <input type="text" className="form-control" id="model" value={modelF} 
                        onChange={e => {setModelF(e.target.value);}}
                    />
                    <small className="form-text text-muted"><pre>gpt-4o gpt-4o-mini gpt-4-turbo gpt-4.1 gpt-4.1-mini gpt-4.1-nano o1 o3-mini</pre></small>
                </div>
            </div>
            <div className="mb-3">
              <label htmlFor="instructions" className="form-label">Instrucciones</label>
              <textarea className="form-control" id="instructions" rows="3" value={instructionsF} 
                onChange={e => {setInstructionsF(e.target.value);}}>
              </textarea>
            </div>
            <div className="row mb-3">
                <div className="col-md-6">
                    <label htmlFor="tools" className="form-label">Tools</label>
                    <textarea className="form-control" id="tools" rows="3" value={toolsStr}
                        onChange={handleToolsChange}>
                    </textarea>
                    <small className="form-text text-muted">
                        <pre>
                        {`[{"type":"code_interpreter"},\n{"type":"function", "function":{"name":"FunctionName", "parameters":{"type":"object","properties":{"query":{"type":"string", "description":"question"}}}}},\n{"type":"file_search","file_search":{"ranking_options":{"ranker":"default_2024_08_21","score_threshold":0}}}]`}
                        </pre>
                    </small>
                </div>
                <div className="col-md-6">
                    <label htmlFor="tool_resources" className="form-label">Tool Resources</label>
                    <textarea className="form-control" id="tool_resources" rows="3" 
                        value={toolresourcesStr} 
                        onChange={handleToolResourcesChange}>
                    </textarea>
                    <small className="form-text text-muted"><pre>{`{ "code_interpreter": { "file_ids": [...] } }\n{ "file_search": { "vector_store_ids": [...] }`}</pre></small>
                </div>
            </div>
            <div className="mb-3">
              <label htmlFor="metadata" className="form-label">Metadata</label>
              <textarea className="form-control" id="metadata" rows="3" value={metadataStr}
                onChange={handleMetadataChange}>
              </textarea>
              <small className="form-text text-muted"><pre>{`{"key1":"value1", "key2":"value2"}`}</pre></small>
            </div>
            <div className="row mb-3">
                <div className="col-md-4">
                    <label htmlFor="top_p" className="form-label">Reasoning Effort</label>
                    <input type="text" className="form-control" id="reasoning_effort" 
                        value={reasoningeffortF !== null ? reasoningeffortF : ''}
                        onChange={e => {setReasoningeffortF(e.target.value);}}
                    />
                    <small className="form-text text-muted"><pre>low medium high | o1 o3-mini</pre></small>
                </div>
                <div className="col-md-4">
                    <label htmlFor="temperature" className="form-label">Temperature</label>
                    <input type="text" className="form-control" id="temperature" value={temperatureF}
                        onChange={e => {setTemperatureF(e.target.value);}}
                    />
                    <small className="form-text text-muted"><pre>Coherencia 0 - 2 Creatividad | gpt-4o gpt4o-mini gpt-4-turbo gpt-4.5-preview</pre></small>
                </div>
                <div className="col-md-4">
                    <label htmlFor="top_p" className="form-label">Top P</label>
                    <input type="text" className="form-control" id="top_p" value={toppF} 
                        onChange={e => {setToppF(e.target.value);}}
                    />
                    <small className="form-text text-muted"><pre>0% 0 - 1 100% | gpt-4o gpt4o-mini gpt-4-turbo gpt-4.5-preview</pre></small>
                </div>
                <div className="col-md-4">
                    <label htmlFor="response_format" className="form-label">Response Format</label>
                    <input type="text" className="form-control" id="response_format" 
                        value={assistant.response_format} readOnly 
                    />
                </div>
            </div>
          </form>
        </div>
      );
}