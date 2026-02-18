"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"


const DashboardPage = () => {
    const [ user , setUser ] = useState<any>(null)

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if ( !data.user ) {
                window.location.href = "/login"
            } else {
                setUser(data.user)
            }
        })
    }, [])

    if ( !user ) {
        return (
            <p className="p-4">Loading...</p>
        )
    }

    return (
        <main className="p-6">
            <h1 className="text-xl font-semibold ">
                Welcome, {user.email}
            </h1>
        </main>
    )
}

export default DashboardPage