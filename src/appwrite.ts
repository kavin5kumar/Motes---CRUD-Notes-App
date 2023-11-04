import { Client } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE || "")
    .setProject(process.env.NEXT_PUBLIC_API_KEY || "")



export default client;