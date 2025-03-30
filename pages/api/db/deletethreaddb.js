import { connectDatabase, deleteDocument } from "@/lib/mongodb";

export default async function handler(req, res) {
    let client;
    try { client = await connectDatabase() }
    catch (error) {
        console.log({message: 'DB connection failed!', error: error});
        res.status(500).json({message: 'DB connection failed!', error: error});
        return;
    }
    const collection = 'threads';

    if (req.method === 'POST') {
        const filter = req.body.filter; // filter = { threadid: 'thread_123'}
        // console.log(collection, newThread);
        
        try {
            const result = await deleteDocument(client, collection, filter);
            console.log({ message: result });
            res.status(200).json({ message: result });
            client.close();
            return;
        } catch (error) {
            client.close();
            console.log({message: 'Thread delete failed', error: error});
            res.status(500).json({message: 'Thread delete failed', error: error});
            return;
        }
    }
    client.close();
    res.status(404).json({ message: 'Method not found!' });
}


{/* 
    db: openai
    collection: threads
    {
        _id: ObjectId('678fafff61487e5255f8fa65'),
        threadid: 1,
        assistantid: 'A1'
    }
*/}