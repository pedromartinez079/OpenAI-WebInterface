import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const input = req.body.input;
        const model = req.body.model;
        const n = req.body.n;
        const quality = req.body.quality;
        const size = req.body.size;
        const output_format = req.body.output_format;
        const background = req.body.background;
        const OPENAI_API_KEY = process.env.OPENAI_API_KEY
        
        try {
            const response = await axios.post('https://api.openai.com/v1/images/generations', {  
                model: model,
                prompt: input, // image description or prompt
                n: n,
                quality: quality,
                size: size,
                output_format: output_format, // "png", "jpeg", "webp"
                background: background, // "transparent", "opaque", "auto", null
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
            console.error({ data: [{ revised_prompt: 'Error communicating with OpenAI from /api/postimageprompt.js' }], error: error.response.data });
            res.status(400).json({ data: [{ revised_prompt: 'Error communicating with OpenAI from /api/postimageprompt.js' }], error: error.response.data });
            return;            
          }
    }

    res.status(200).json({ message: 'Method not implemented' })
}

/* Response output -> data.data
{
  created: 1789143093,
  background: 'opaque',
  data: [
    {
      b64_json: 'iVBORw0KGgoAAA.....'
      generation_id: 'fa0f967f-d86e-46d3-b73d-4381dae032c3'
    }
  ],
  output_format: 'png',
  quality: 'low',
  size: '1275x1234',
  usage: {
    input_tokens: 8,
    input_tokens_details: { image_tokens: 0, text_tokens: 8 },
    output_tokens: 215,
    output_tokens_details: { image_tokens: 215, text_tokens: 0 },
    total_tokens: 223
  }
}
*/