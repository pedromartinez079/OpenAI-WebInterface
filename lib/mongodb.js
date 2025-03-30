import { MongoClient } from 'mongodb';

export async function connectDatabase() {
    /*const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const cluster = process.env.MONGODB_CLUSTER;
    const client = await MongoClient.connect(
        `mongodb+srv://${user}:${password}@reguluseirl.xfrmi2g.mongodb.net/${cluster}?retryWrites=true&w=majority`
        );*/
    const mongosrv = process.env.MONGODB_IP;
    const mongoport = process.env.MONGODB_PORT;
    const mongourl = `mongodb://${mongosrv}:${mongoport}/openai`;
    const options = {};
    const client = await MongoClient.connect(mongourl, options);
    // console.log(mongourl, client);
    return client;
}

export async function getDocuments(client, collection, sort={}, filter={}) {
    const db = client.db();
    const documents = await db
        .collection(collection).find(filter)
        .sort(sort)
        .toArray();
    return documents;
}

export async function searchDocuments(client, collection, sort={}, filter={}, limit=10) {
    const db = client.db();
    const documents = await db
        .collection(collection).find(filter)
        .sort(sort)
        .limit(limit)
        .toArray();
    return documents;
}

export async function insertDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document);
    // console.log(document, result);
    return result;
}

export async function deleteDocument(client, collection, document) {
    const db = client.db();
    const result = await db.collection(collection).deleteOne(document);
    // console.log(document, result);
    // document = { threadid: 'thread_123'}
    return result;
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