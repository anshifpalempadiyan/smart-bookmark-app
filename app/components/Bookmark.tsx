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
            const { data, error } = await supabase.from("bookmarks").select("id , title , url").order("created_at", { ascending: false })

            if (!error && data) {
                setBookmarks(data)
            }

            setLoading(false)
        }

        fetchBookmarks()
    }, [])

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
                </div>
            ))}
        </div>
    );

}

export default BookmarkList