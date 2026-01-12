"use client";
import { useState } from "react";
import { loginWithEmail, signupWithEmail, loginWithGoogle, loginWithFacebook, loginWithLine } from "../lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailLogin = async () => { try { await loginWithEmail(email, password); alert("Login Success"); } catch(err) { alert((err as Error).message); } };
  const handleEmailSignup = async () => { try { await signupWithEmail(email, password); alert("Signup Success"); } catch(err) { alert((err as Error).message); } };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Think Everyday</h2>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <div className="flex gap-2 mb-4">
          <button onClick={handleEmailLogin} className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold">Login</button>
          <button onClick={handleEmailSignup} className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold">Signup</button>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <button onClick={loginWithGoogle} className="bg-red-500 text-white py-2 rounded-lg">Login with Google</button>
          <button onClick={loginWithFacebook} className="bg-blue-800 text-white py-2 rounded-lg">Login with Facebook</button>
          <button onClick={loginWithLine} className="bg-green-600 text-white py-2 rounded-lg">Login with Line</button>
        </div>
      </div>
    </div>
  );
}
