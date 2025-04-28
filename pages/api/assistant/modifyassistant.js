import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const assistant_id = req.body.assistant_id;
        const model = req.body.model;
        const name = req.body.name;
        const instructions = req.body.instructions;
        const tools = req.body.tools;
        const tool_resources = req.body.tool_resources;
        const metadata = req.body.metadata;
        const temperature = req.body.temperature;
        const top_p = req.body.top_p;
        const reasoning_effort = req.body.reasoning_effort;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        try {
            const response = await axios.post(`https://api.openai.com/v1/assistants/${assistant_id}`, { 
                model: model, 
                name: name,
                instructions: instructions,
                tools: tools,
                tool_resources: tool_resources,
                metadata: metadata,
                temperature: temperature,
                top_p: top_p,
                reasoning_effort: reasoning_effort,
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
            console.error({message: 'Error communicating with OpenAI from /api/assistant/modifyassistant.js', error: error.response.data});
            res.status(400).json({message: 'Error communicating with OpenAI from /api/assistant/modifyassistant.js', error: error.response.data});
            return;            
        }
    }

    res.status(200).json({ message: 'Method not implemented' })
}