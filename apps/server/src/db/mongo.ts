import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in .env file");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("path-to-peace");

export { client, db };
