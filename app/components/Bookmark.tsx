"use client"

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient"

type Bookmark = {
    id: string;
    title: string;
    url: string;
}

const BookmarkList = () => {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchBookmarks = async () => {
            const { data } = await supabase.from("bookmarks").select("id , title , url").order("created_at", { ascending: false })

            setBookmarks(data || [])
            setLoading(false)
        }

        fetchBookmarks()

        const channel = supabase.channel("bookmarks-realtime").on("postgres_changes",
            { event: "INSERT", schema: "public", table: "bookmarks" },
            async (payload) => {
                const { data: { user } } = await supabase.auth.getUser()
                if (user && payload.new.user_id === user.id) {
                    setBookmarks((prev) => [payload.new as Bookmark, ...prev])
                }
            }
        )
            .on("postgres_changes",
                { event: "DELETE", schema: "public", table: "bookmarks" },
                (payload) => {
                    setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }

    }, [])

    const handleDelete = async ( id : string , title : string ) => {
        const confirmed = window.confirm(` Are you sure you want to delete "${title}"?`)

        if ( !confirmed ) return
        
        await supabase.from("bookmarks").delete().eq("id",id)
    }

    if (loading) {
        return <p className="text-gray-500">Loading bookmarks...</p>;
    }

    if (bookmarks.length === 0) {
        return <p className="text-gray-500">No bookmarks yet.</p>;
    }

    return (
        <div className="space-y-3">
            {bookmarks.map((bookmark) => (
                <div
                    key={bookmark.id}
                    className="flex items-center justify-between rounded border p-4 bg-white"
                >
                    <div>
                        <p className="font-medium text-black">{bookmark.title}</p>
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 underline"
                        >
                            {bookmark.url}
                        </a>
                    </div>
                    <button
                        onClick={() => handleDelete(bookmark.id , bookmark.title )}
                        className="text-sm bg-red-600 hover:underline text-white p-3 rounded cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );

}

export default BookmarkList