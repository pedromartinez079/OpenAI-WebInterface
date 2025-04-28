import { connectDatabase, getDocuments } from "@/lib/mongodb";

export default async function handler(req, res) {
    let client;
    try { client = await connectDatabase() }
    catch (error) {
        console.log({message: 'DB connection failed!', error: error});
        res.status(500).json({message: 'DB connection failed!', error: error});
        return;
    }
    const collection = 'responses';

    if (req.method === 'GET') {
        const filter = {};
        const sort = {};
        // console.log(collection, assistant);

        try {
            const responses = await getDocuments(client, collection, sort, filter);
            console.log({ responses : responses });
            res.status(200).json({ responses : responses });
            client.close();
            return;
        } catch (error) {
            client.close();
            console.log({message: 'Responses fetch failed', error: error});
            res.status(500).json({message: 'Responses fetch failed', error: error});
            return;
        }
    }
    client.close();
    res.status(404).json({ message: 'Method not found!' });
}
