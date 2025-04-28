import { connectDatabase, deleteDocument } from "@/lib/mongodb";

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
        const filter = req.body.filter; // filter = { responseid: 'resp_123'}
        // console.log(collection, newThread);
        
        try {
            const result = await deleteDocument(client, collection, filter);
            console.log({ message: result });
            res.status(200).json({ message: result });
            client.close();
            return;
        } catch (error) {
            client.close();
            console.log({message: 'Response delete failed', error: error});
            res.status(500).json({message: 'Response delete failed', error: error});
            return;
        }
    }
    client.close();
    res.status(404).json({ message: 'Method not found!' });
}

