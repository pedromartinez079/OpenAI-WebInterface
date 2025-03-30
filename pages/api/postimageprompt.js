import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const input = req.body.input;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY
        
        try {
            const response = await axios.post('https://api.openai.com/v1/images/generations', {  
                model: 'dall-e-3', // specify the model you want to use
                prompt: input, // your image description here
                n: 1, // dall-e-3 supports 1 only
                quality: 'hd', // hd or standard
                response_format: 'url', // url or b64_json
                size: '1792x1024', //1024x1024, 1792x1024, or 1024x1792
                style: 'natural', //vivid or natural
                user: 'user',
            }, {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            const data = await response;
            //console.log(data.data);
            res.status(200).json(data.data);
            return;
      
          } catch (error) {
            console.error({ data: [{ revised_prompt: 'Error communicating with OpenAI from /api/postimageprompt.js' }], error: error.response.data });
            res.status(400).json({ data: [{ revised_prompt: 'Error communicating with OpenAI from /api/postimageprompt.js' }], error: error.response.data });
            return;            
          }

    }

    res.status(200).json({ message: 'Method not implemented' })
}