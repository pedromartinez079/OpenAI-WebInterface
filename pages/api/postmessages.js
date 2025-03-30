import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const model = req.body.model;
        const messages = req.body.messages;
        const userMessage = req.body.userMessage;
        let temperature = req.body.temperature;
        let reasoningEffort = req.body.reasoningEffort;
        let topP = req.body.topP;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        if (model === 'o1' || model === 'o3-mini') { temperature = 1; topP = undefined; }
        else { reasoningEffort = undefined; }

        if (model === 'o1-preview' || model === 'o1-mini') { temperature = 1; topP = undefined; }

        // console.log(model, temperature, topP);
        
        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {  
              model: model, 
              messages: [...messages, userMessage],
              temperature: temperature, // [0..2], for o1 & o3 models only 1 is allowed
              top_p: topP, // [0..1] 0%-100%
              reasoning_effort: reasoningEffort, // only for o1 & o3-mini: low, medium, high
              user: 'user',
            }, {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            const data = await response;
            // console.log(data.data);
            res.status(200).json(data.data);
            return;
      
        } catch (error) {
            console.error({ choices: [{ message: {role:'assistant', content:'Error communicating with OpenAI from /api/postmessages.js'} }], error: error.response.data });
            res.status(400).json({ choices: [{ message: {role:'assistant', content:'Error communicating with OpenAI from /api/postmessages.js'} }], error: error.response.data });
            return;            
        }

    }

    res.status(200).json({ message: 'Method not implemented' })
}

/*

*/