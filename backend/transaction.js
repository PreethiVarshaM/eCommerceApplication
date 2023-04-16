import { MongoClient } from 'mongodb';

const url = new MongoClient('mongodb://localhost:27017/DBMSecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
const client = new MongoClient(url);

