import { connectDatabase, getDocuments } from "@/lib/mongodb";

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
        const assistant = req.body.assistant;
        const filterassistant = {assistantid: assistant};
        const sort = {};
        // console.log(collection, assistant);

        try {
            const threads = await getDocuments(client, collection, sort, filterassistant);
            console.log({ threads : threads });
            res.status(200).json({ threads : threads });
            client.close();
            return;
        } catch (error) {
            client.close();
            console.log({message: 'Threads fetch failed', error: error});
            res.status(500).json({message: 'Threads fetch failed', error: error});
            return;
        }
    }
    client.close();
    res.status(404).json({ message: 'Method not found!' });
}