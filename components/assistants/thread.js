import { useState } from 'react';
import MessagesDiv from '../layout/messagesdiv';
import ThreadForm from './threadform';

export default function Thread(props) {
    const activeAssistant = props.activeAssistant;
    const threadId = props.activeThread;
    const tools = props.activeTools;
    const [messages, setMessages] = useState(null);
    // const [threadInformation, setThreadInformation] = useState(null);
    
    return (
        <div className="container mt-2 mb-2">
            <h5><pre>Thread: {threadId}</pre></h5>
            <pre>Asistente: {activeAssistant}</pre>            
            <MessagesDiv messages={messages} />
            <ThreadForm assistantid={activeAssistant} threadid={threadId} tools={tools}
                messages={messages} setMessages={setMessages}
            />
        </div>
    );
}

/*
To Do:
- Test with different models, tools, tool_resources
*/