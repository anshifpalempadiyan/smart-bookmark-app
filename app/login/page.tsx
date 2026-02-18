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
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-lg border bg-white p-8 shadow-sm">
                <h1 className="mb-2 text-2xl font-semibold text-black text-center">
                    Smart Bookmark App
                </h1>

                <p className="mb-6 text-center text-gray-500">
                    Sign in to save and manage your bookmarks
                </p>

                <button
                    onClick={handleGoogleLogin}
                    className="flex w-full items-center justify-center gap-3 rounded-md border bg-black px-4 py-3 text-white hover:opacity-90"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="20"
                        height="20"
                    >
                        <path
                            fill="#FFC107"
                            d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.9l5.7-5.7C33.3 7.1 28.9 5 24 5 13.4 5 5 13.4 5 24s8.4 19 19 19 19-8.4 19-19c0-1.3-.1-2.7-.4-3.5z"
                        />
                        <path
                            fill="#FF3D00"
                            d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c2.8 0 5.4 1.1 7.3 2.9l5.7-5.7C33.3 7.1 28.9 5 24 5c-7.3 0-13.6 4.1-17.7 9.7z"
                        />
                        <path
                            fill="#4CAF50"
                            d="M24 43c5.1 0 9.9-1.9 13.4-5.1l-6.2-5.2c-1.7 1.3-4 2.1-7.2 2.1-5.1 0-9.4-3.4-10.9-8l-6.5 5C10.6 38.9 16.8 43 24 43z"
                        />
                        <path
                            fill="#1976D2"
                            d="M43.6 20.5H42V20H24v8h11.3c-1 2.7-3 4.9-5.8 6.4l.1.1 6.2 5.2c-.4.4 7.2-5.3 7.2-15.7 0-1.3-.1-2.7-.4-3.5z"
                        />
                    </svg>

                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-gray-400">
                    By continuing, you agree to our terms and privacy policy.
                </p>
            </div>
        </div>
    )
}

export default LoginPage