import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const fileid = req.body.fileid;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY

        try {
            const response = await axios.delete(`https://api.openai.com/v1/files/${fileid}` ,
            {
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
              }
            });
            const data = await response;
            console.log(data.data);
            res.status(200).json(data.data);
            return;      
        } catch (error) {
            console.error({message: 'Error communicating with OpenAI from /api/deletefile.js', error: error.response.data});
            res.status(400).json({message: 'Error communicating with OpenAI from /api/deletefile.js', error: error.response.data});
            return;            
        }
    }

    res.status(200).json({ message: 'Method not implemented' })
}