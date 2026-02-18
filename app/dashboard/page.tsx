"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"


const DashboardPage = () => {
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                window.location.href = "/login"
            } else {
                setUser(data.user)
            }
        })
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        window.location.href = "/login"
    }

    if (!user) {
        return (
            <p className="p-4">Loading...</p>
        )
    }

    return (
        <main className="p-6">
            <div className="flex items-center justify-between">

                <h1 className="text-xl font-semibold ">
                    Welcome, {user.email}
                </h1>
                <button className="reounded bg-red-600 px-4 py-2 text-white " onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </main>
    )
}

export default DashboardPage