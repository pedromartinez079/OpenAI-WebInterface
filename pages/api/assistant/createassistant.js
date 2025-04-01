import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const model = req.body.model;
        const name = req.body.name;
        const instructions = req.body.instructions;
        const tools = req.body.tools;
        const tool_resources = req.body.tool_resources;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        try {
            const response = await axios.post('https://api.openai.com/v1/assistants', {  
              model: model, 
              name: name,
              instructions: instructions,
              tools: tools,
              tool_resources: tool_resources,
            }, {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
              },
            });
            const data = await response;
            console.log(data.data);
            res.status(200).json(data.data);
            return;      
        } catch (error) {
            console.error({message: 'Error communicating with OpenAI from /api/createassistant.js', error: error.response.data});
            res.status(400).json({message: 'Error communicating with OpenAI from /api/createassistant.js', error: error.response.data});
            return;            
        }
    }

    res.status(200).json({ message: 'Method not implemented' })
}


/*
ToDo:
*/