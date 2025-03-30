import React, { useState } from 'react';
import axios from 'axios';

export default function CreateAssistant(props) {
  const [formData, setFormData] = useState({
      name: '',
      instructions: '',
      model: 'gpt-4o',
      tools: [],
      tool_resources: {},
      metadata: {},
    });

  const [selectTool, setSelectTool] = useState('---');
  const [responseMessage, setResponseMessage] = useState('');
  const [isFunctionVisible, setFunctionVisible] = useState(false);
  const [functionName, setFunctionName] = useState('');
  const [functionProps, setFunctionProps] = useState('{}');
  let properties = {};
    
  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(value);
    if (name !== 'tools') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setSelectTool(value);
      if (value !== '---') {
        if (value === 'function') {
          setFunctionVisible(true);
          /*setFormData({
            ...formData,
            [name]: [{type: value, function:{"name":"FunctionName", "parameters":{"type":"object","properties":{}}}}],
          });*/
        }
        else if (value === 'file_search') {
          setFunctionVisible(false);
          setFormData({
            ...formData,
            [name]: [{type: value}],
          });
        }
        else if (value === 'code_interpreter') {
          setFunctionVisible(false);
          setFormData({
            ...formData,
            [name]: [{type: value}],
          });
        }
      } else {
        setFunctionVisible(false);
        setFormData({
          ...formData,
          [name]: [],
        });
      }
    }
    //console.log(formData);
  };
  
  const handleFunction = (e) => {
    const { name, value } = e.target;
    if (name === 'functionname') { setFunctionName(value) }
    else if (name === 'functionproperties') { 
      setFunctionProps(value) 
      try {
        properties = JSON.parse(value);
        //setFunctionProps(properties);
      } catch (error) {
        console.error("Invalid JSON input:", error);
        //setFunctionProps(properties);
      }
    }
    const updatedFunctionName = name === 'functionname' ? value : functionName;
    const updatedFunctionProps = name === 'functionproperties' ? properties : JSON.parse(functionProps);     
    console.log(updatedFunctionName,updatedFunctionProps);
    setFormData({
      ...formData,
      tools: [{type: "function", function:{name:updatedFunctionName, parameters:{type:"object",properties:updatedFunctionProps}}}],
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      /*if (isFunctionVisible) {
        const properties = JSON.parse(functionProps);
        setFormData({
          ...formData,
          tools: [{type: "function", function:{name:functionName, parameters:{type:"object",properties:properties}}}],
        });
        console.log(formData);
      }*/
      const response = await axios.post('/api/assistant/createassistant', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      //console.log(formData);
      console.log('Assistant created:', response.data);
      setResponseMessage('Asistente ha sido creado.');
      // Optionally reset form or provide user feedback here
    } catch (error) {
      console.error('Error creating assistant:', error);
      setFormData({
        ...formData,
        tools: [],
      });
      setResponseMessage('Asistente no ha sido creado.');      
    }
  };

  return (
    <div className="container mt-2 mb-2">
      <h2>Crear Asistente</h2>      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
        />
        </div>
        <div className="mb-3">
          <label className="form-label">Instrucciones</label>
          <textarea
              className="form-control"
              name="instructions"
              value={formData.instructions}
              onChange={handleChange}
              rows="3"
              required
          />
        </div>
          
        <div className="mb-3">
          <label className="form-label">Model</label>
          <select className="form-select" name="model" value={formData.model} onChange={handleChange}>
              <option value="gpt-4o">gpt-4o</option>
              <option value="gpt-4o-mini">gpt-4o-mini</option>
              <option value="gpt-4-turbo">gpt-4-turbo</option>
              <option value="gpt-4.5-preview">gpt-4.5-preview</option>
              <option value="o1">o1</option>
              <option value="o3-mini">o3-mini</option>
              {/* Add more model options here if needed */}
          </select>
        </div>
          
        <div className="mb-3">
          <label className="form-label">Tools</label>
          <select className="form-select" name="tools" value={selectTool} onChange={handleChange}>
              <option value="---">---</option>
              <option value="code_interpreter">code_interpreter</option>
              <option value="file_search">file_search</option>
              <option value="function">function</option>
              {/* Add more model options here if needed */}
          </select>
          {isFunctionVisible && <label className="form-label mt-1">Nombre de función</label>}
          {isFunctionVisible && <input
              type="text"
              className="form-control"
              name="functionname"
              value={functionName}
              onChange={ handleFunction }
              /*disable={!isFunctionVisible}*/
              required
          />}
          {isFunctionVisible && <label className="form-label mt-1">Argumentos de función</label>}
          {isFunctionVisible && <input
              type="text"
              className="form-control"
              name="functionproperties"
              value={functionProps}
              onChange={ handleFunction }
              /*disable={!isFunctionVisible}*/
              required
          />}
          {isFunctionVisible && <small className="form-text text-muted">
            <pre> 
              {`Ejemplo: {"location":{ "type":"string", "description":"..." }, "instructions":{ "type":"array", "items":{"type":"string"}, "description":"..." }}`} 
            </pre>
          </small>}
        </div>          
        <button type="submit" className="btn btn-primary">Crear Asistente</button>
        
      </form>
      <pre>{responseMessage}</pre>      
    </div>
  );
}

/*
Tools:
"tools":[{"type":"code_interpreter"}]
Default: "tools":[{"type":"file_search","file_search":{"ranking_options":{"ranker":"default_2024_08_21","score_threshold":0}}}]

"tools":[{"type":"function", "function":{"name":"FunctionName", "parameters":{"type":"object","properties":{}}}}]
Example: "properties":{ "location":{ "type":"string", "description":"..." }, "instructions":{ "type":"array", "items":{"type":"string"}, "description":"..." } }
Input box to set name and properties for function tool

Tool Resources: format: "tool_resources":{"code_interpreter":{"file_ids":[]}}
Metadata ???

Function example
{
        "type": "function",
        "function": {
            "name": "get_product_recommendations",
            "description": "Searches for products matching certain criteria in the database",
            "parameters": {
                "type": "object",
                "properties": {
                    "categories": {
                        "description": "categories that could be a match",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "coats & jackets",
                                "accessories",
                                "tops",
                                "jeans & trousers",
                                "skirts & dresses",
                                "shoes"
                            ]
                        }
                    },
                    "colors": {
                        "description": "colors that could be a match, empty array if N/A",
                        "type": "array",
                        "items": {
                            "type": "string",
                            "enum": [
                                "black",
                                "white",
                                "brown",
                                "red",
                                "blue",
                                "green",
                                "orange",
                                "yellow",
                                "pink",
                                "gold",
                                "silver"
                            ]
                        }
                    },
                    "keywords": {
                        "description": "keywords that should be present in the item title or description",
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    "price_range": {
                        "type": "object",
                        "properties": {
                            "min": {
                                "type": "number"
                            },
                            "max": {
                                "type": "number"
                            }
                        },
                        "required": [
                        "min",
                        "max"
                        ],
                        "additionalProperties": false
                    },
                    "limit": {
                        "type": "integer",
                        "description": "The maximum number of products to return, use 5 by default if nothing is specified by the user"
                    }
                },
                "required": [
                    "categories",
                    "colors",
                    "keywords",
                    "price_range",
                    "limit"
                ],
                "additionalProperties": false
            }
        }
    },
*/