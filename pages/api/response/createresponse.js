import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const input = req.body.input; // Required
        const model = req.body.model; // Required
        const include = req.body.include; // Array or null
        const instructions = req.body.instructions;
        const metadata = req.body.metadata;
        const parallel_tool_calls = req.body.parallel_tool_calls;
        const previous_response_id = req.body.previous_response_id;
        const reasoning = req.body.reasoning; // {effort:"", generate_summary:""}; o models only
        const store = req.body.store; // Store model response
        const stream = req.body.stream; // Boolean
        const temperature = req.body.temperature;
        const top_p = req.body.top_p;
        const text = req.body.text; // {format: {type:"json_schema"}}; options for text response
        const tools = req.body.tools; // Array
        const tool_choice = req.body.tool_choice; // string or object
        const safety_identifier = req.body.safety_identifier; // string optional
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        try {
            const response = await axios.post('https://api.openai.com/v1/responses', {  
              input: input,
              model: model, 
              include: include,
              instructions: instructions,
              metadata: metadata,
              parallel_tool_calls: parallel_tool_calls,
              previous_response_id: previous_response_id,
              reasoning: reasoning,
              store: store,
              stream: stream,
              temperature: temperature,
              top_p: top_p,
              text: text,
              tools: tools,
              tool_choice: tool_choice,
              safety_identifier: safety_identifier,
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
            console.error({message: 'Error communicating with OpenAI from /api/response/createresponse.js', error: error.response.data});
            res.status(400).json({message: 'Error communicating with OpenAI from /api/response/createresponse.js', error: error.response.data});
            return;            
        }
    }

    res.status(200).json({ message: 'Method not implemented' })
}

/*
https://platform.openai.com/docs/api-reference/responses/create
*/