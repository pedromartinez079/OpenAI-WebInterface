import { connectDatabase, insertDocument } from "@/lib/mongodb";

export default async function handler(req, res) {
    let client;
    try { client = await connectDatabase() }
    catch (error) {
        console.log({message: 'DB connection failed!', error: error});
        res.status(500).json({message: 'DB connection failed!', error: error});
        return;
    }
    const collection = 'responses';

    if (req.method === 'POST') {
        const newResponse = req.body.response;
        
        try {
            const result = await insertDocument(client, collection, newResponse);
            console.log({ message: result });
            res.status(200).json({ message: result });
            client.close();
            return;
        } catch (error) {
            client.close();
            console.log({message: 'Response insert failed', error: error});
            res.status(500).json({message: 'Response insert failed', error: error});
            return;
        }
    }
    client.close();
    res.status(404).json({ message: 'Method not found!' })
}


{/* 
    db: openai
    collection: responses
    {
        _id: ObjectId('678fafff61487e5255f8fa65'),
        responseid: resp_123,
        created_at: 1741476542,
    }
*/}