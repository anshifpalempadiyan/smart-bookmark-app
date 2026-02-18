"use client"

import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

const AddBookmarkForm = () => {
    const [title, setTitle] = useState("")
    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!title.trim() || !url.trim()) {
            alert("Title nad URL are requied")
            return
        }

        setLoading(true)

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) {
            alert("Not authenticated")
            setLoading(false)
            return
        }

        const { error } = await supabase.from("bookmarks").insert({
            title,
            url,
            user_id: user.id

        })

        setLoading(false)

        if (error) {
            alert(error.message)
        } else {
            setTitle("")
            setUrl("")
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-md border space-y-3"
        >
            <h2 className="text-lg font-semibold text-black">Add Bookmark</h2>

            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-3 py-2 rounded text-gray-600"
            />

            <input
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full border px-3 py-2 rounded text-gray-600"
            />

            <button
                type="submit"
                disabled={loading}
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add Bookmark"}
            </button>
        </form>
    );
}

export default AddBookmarkForm