import { useEffect, useState } from 'react';

export default function ListAssistants(props) {
    const setActiveTab = props.setActiveTab;
    const setActiveAssistant = props.setActiveAssistant;
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const gotoAssistant = (id) => { 
      setActiveAssistant(id);
      setActiveTab('assistant');
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/assistant/listassistants');
            if (!response.ok) {
              throw new Error('List assistants response was not okay');
            }
            const result = await response.json();
            setData(result.data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
        
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Asistentes</h1>
            <div className="row">
            {data.map(assistant => (
                <div key={assistant.id} className="col-md-4 mb-4" onClick={() => gotoAssistant(assistant.id)}>
                    <div className="card h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <div style={{maxWidth: '100%'}}>
                                    <h5>{assistant.name}</h5>
                                    <p>ID: {assistant.id}</p>
                                    <p>Instrucciones: {assistant.instructions}</p>
                                </div>
                            </div>                    
                        </div>
                    </div>
                </div>
            ))} 
            </div>
        </div>
    );
}