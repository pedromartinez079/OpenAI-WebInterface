import axios from 'axios';
import formidable from 'formidable';
import FormData from 'form-data';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,  // Disable Next.js's built-in body parser
  },
};

export default async function handler(req, res) {  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const form = formidable({ multiples: true, keepExtensions: true });
  
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Error parsing form data' });
      return;
    }
    
    const purpose = Array.isArray(fields.purpose) ? fields.purpose[0] : fields.purpose;
    
    if (!files.fileobj || !files.fileobj[0].filepath) {
      res.status(400).json({ error: 'No file uploaded or file path is incorrect' });
      return;
    }    
        
    try {
      const file = files.fileobj[0];
      const formData = new FormData();
      formData.append('purpose', purpose);
      const fileStream = fs.createReadStream(file.filepath);
      formData.append('file', fileStream);

      const response = await axios.post('https://api.openai.com/v1/files', formData,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          ...formData.getHeaders(),
        },
      });
      const data = await response;
      console.log(data.data);
      return res.status(200).json(data.data);   
    } catch (error) {
        console.error({message: 'Error communicating with OpenAI from /api/file/uploadfile.js', error: error.response.data});
        res.status(400).json({message: 'Error communicating with OpenAI from /api/file/uploadfile.js', error: error.response.data});
        return;            
    }
  });  
}

/*
purpose:
Use "assistants" for Assistants and Message files, "vision" for Assistants image file inputs, 
"batch" for Batch API, and "fine-tune" for Fine-tuning.
['fine-tune', 'assistants', 'batch', 'user_data', 'vision', 'evals']
*/