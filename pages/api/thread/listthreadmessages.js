import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const thread = req.body.thread;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        try {
            const response = await axios.get(`https://api.openai.com/v1/threads/${thread}/messages`,
            {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
              },
              params: {
                limit: 100,
              },
            });
            const data = await response;
            console.log(data.data);
            res.status(200).json(data.data);
            return;      
        } catch (error) {
            console.error({message: 'Error communicating with OpenAI from /api/thread/listthreadmessages.js', error: error.response.data});
            res.status(400).json({message: 'Error communicating with OpenAI from /api/thread/listthreadmessages.js', error: error.response.data});
            return;            
        }
    }

    res.status(200).json({ message: 'Method not implemented' })
}