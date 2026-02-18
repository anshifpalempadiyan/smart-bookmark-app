"use client";

import { supabase } from "../lib/supabaseClient";

const LoginPage = () => {
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: "http://localhost:3000/dashboard",
                // queryParams: {
                //     prompt: "select_account",
                // },
            }
        })
    }

    return (
        <main className="flex min-h-screen items-center justify-center ">
            <button className="rounded bg-black px-6 py-3 text-white" onClick={handleGoogleLogin}>
                Sign in with Google
            </button>
        </main>
    )
}

export default LoginPage