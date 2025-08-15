'use client'

import { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

export default function Home() {
const [emoji, setEmoji] = useState<any[]>([])
const [loading, setLoading] = useState(true)
const [showForm, setShowForm] = useState(false)
const [editID, setEditID] = useState(null)
const [editFormData, setEditFormData] = useState({emoji:'', title:'', description:''})

//Get Emoji
const fetchKeeper = async ()=>{
    const response = await fetch('http://localhost:3000/api/emoji')
    const {fetchEmoji} = await response.json();
    setEmoji(fetchEmoji)
    setLoading(false)
}

useEffect(()=>{
    fetchKeeper()
},[])


//Post Emoji
const show = ()=> setShowForm(true)
const cancel = ()=> setShowForm(false)

const postEmoji = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const body = Object.fromEntries(formData);
    
    const addEmoji = await fetch('http://localhost:3000/api/emoji',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    if(!addEmoji.ok){
        alert("Failed to add emoji")
        return
    }
    fetchKeeper()
    setShowForm(false)
}

//Delete Emoji
const deleteEmoji = async (id: any) => {

    const delEmoji = await fetch(`http://localhost:3000/api/${id}`, {
      method: 'DELETE',
    });

    if(!delEmoji.ok){
        alert('Fail to delete')
        return 
    }
    fetchKeeper()
  };
  
//Edit Emoji
const editEmoji = async (emo:any)=>{
    setEditID(emo.id);
    setEditFormData({emoji: emo.emoji, title: emo.title, description: emo.description})
}

const cancelEdit = ()=>{
    setEditID(null)
    setEditFormData({emoji:'', title:'', description:''})
}

const saveEdit = async (id:any)=>{
    const editEmoji = await fetch(`http://localhost:3000/api/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(editFormData)
    })
    if(!editEmoji.ok){
        alert('Fail to update')
        return
    }
    fetchKeeper()
    cancelEdit()
}

if(loading) return <h1>Loading...</h1>

return (
    <div className="w-[80%] mx-auto py-20">
        <h1 className="w-fit bg-[#2ec2b0] rounded text-6xl text-white font-bold mx-auto p-4 my-10">Emojipedia <span onClick={show} className="border text-sm cursor-pointer p-1">add</span></h1>
        <div className="grid grid-cols-4 gap-10">
            {emoji.map((emo)=>(
                <div key={emo.id} className="bg-white shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)] text-center rounded relative p-6">
                    {editID === emo.id ?(
                        <>
                        <input type="text" value={editFormData.emoji} onChange={(e) => setEditFormData({ ...editFormData, emoji: e.target.value })} className="w-full focus:outline-none text-6xl mb-5 text-center" />

                        <input type="text" value={editFormData.title} onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })} className="w-full focus:outline-none text-3xl text-[#2ec2b0] font-bold text-center mb-2" />

                        <textarea value={editFormData.description} onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })} className="w-full focus:outline-none text-black-500 mb-2" rows={8} />

                        <div className="flex justify-center gap-4 mt-2">
                            <button className="bg-green-500 text-xl text-white cursor-pointer rounded px-2" onClick={() => saveEdit(emo.id)}>Save</button>
                            <button className="bg-red-500 text-xl text-white cursor-pointer rounded px-2" onClick={cancelEdit}>Cancel</button>
                        </div>
                        </>
                    ) : (
                        <>
                        <h1 className="text-6xl mb-5">{emo.emoji}</h1>
                        <h2 className="text-3xl text-[#2ec2b0] font-bold mb-2">{emo.title}</h2>
                        <p className="text-black-500 mb-2">{emo.description}</p>

                        <div className="w-fit bg-gray-200 rounded absolute bottom-0 right-0 cursor-pointer flex space-x-4 p-1">
                            <MdEdit onClick={()=> editEmoji(emo)} className="text-gray-600" />
                            <MdDelete onClick={()=> deleteEmoji(emo.id)} className="text-gray-600" />
                        </div>
                        </>
                    )}
                </div>
            ))}
        </div>
        {showForm && (
        <div className="h-fit w-[30%] mx-auto bg-[#f0f3fd] rounded shadow-[0px_0px_10px_5px_rgba(0,_0,_0,_0.1)] fixed inset-0 transform translate-y-50 p-10">
            <form onSubmit={postEmoji} className=" grid gap-5">
                <input className="focus:outline-none border border-gray-400 rounded px-4 py-2" type="text" name="emoji" placeholder="emoji" />
                <input className="focus:outline-none border border-gray-400 rounded px-4 py-2" type="text" name="title" placeholder="emoji name" />
                <textarea className="focus:outline-none border border-gray-400 rounded px-4 py-2" name="description" rows={3} placeholder="description"></textarea>
                <div className="grid grid-cols-2 gap-5">
                    <button onClick={cancel} className="border border-[#01a088] hover:bg-[#01a088] text-[#01a088] hover:text-white rounded px-4 py-2">Cancel</button>
                    <button className="bg-[#2ec2b0] hover:bg-[#01a088] text-white rounded px-4 py-2">Save</button>
                </div>
            </form>
        </div>
        )}
    </div>
);
}
