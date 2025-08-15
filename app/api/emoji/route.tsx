import knex from "knex";
import knexConfig from "@/knexfile"

const kn = knex(knexConfig.development)

export async function GET() {
    const  fetchEmoji = await kn('emoji').select('*');
    return Response.json({ fetchEmoji });
}

export async function POST(req: Request){
    const { emoji, title, description } = await req.json();

    if(!emoji || !title || !description){
        return Response.json({error: 'All the entries are required'})
    }

    const [ addEmoji ] = await kn('emoji').insert({ emoji, title, description }).returning('*')
    return Response.json({ message: 'Post successful' })
}