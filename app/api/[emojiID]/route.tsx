import knex from "knex";
import knexConfig from "@/knexfile";

const kn = knex(knexConfig.development);

export async function DELETE(req:Request, {params}:any) {
    const { emojiID } = await params;

    await kn('emoji').where({ id : emojiID }).del();
    return Response.json({message: 'Delete successful'});
}

export async function PUT(req:Request, {params}:any){
    const { emojiID } = await params;
    const { emoji, title, description } = await req.json();

    await kn('emoji').where({ id: emojiID }).update({ emoji, title, description }).returning('*');
    return Response.json({message: 'Update successful'})
}