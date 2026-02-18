"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import type { User } from "@supabase/supabase-js"
import AddBookmarkForm from "../components/AddBookmarkForm"
import BookmarkList from "../components/Bookmark"


const DashboardPage = () => {
    const [user, setUser] = useState<User | null>(null)
    // const [title, setTitle] = useState("")
    // const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                window.location.href = "/login"
            } else {
                setUser(data.user)
            }
            setLoading(false)
        })
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
    }



    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-gray-500">Loading...</p>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b">
                <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
                    <h1 className="text-lg font-semibold text-black">
                        Smart Bookmark App
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="rounded border px-4 py-2 text-sm bg-red-600 text-white hover:bg-red-500"
                    >
                        Logout
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="mx-auto max-w-3xl px-6 py-8 space-y-6">
                <h2 className="text-xl font-medium text-black">
                    Welcome, {user.email}
                </h2>

                {/* Add Bookmark Component */}
                <AddBookmarkForm />
                <BookmarkList />
            </main>
        </div>
    )
}

export default DashboardPage