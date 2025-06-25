'use client';
import React, { useState } from 'react';
import { Header } from '@/components/layout/header';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('If this email exists, a password reset link will be sent.');
    setEmail('');
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="w-[300px] mx-auto flex flex-col h-screen justify-center px-4 text-white font-mono">
        <div className="mb-6">
          <h1 className="text-xl tracking-wider">Forgot Password</h1>
        </div>
        <div className="mb-6 relative group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-4 bg-transparent border-none outline-none z-10 relative text-white tracking-wide text-base"
            required
          />
          <div className="absolute h-[10px] -bottom-[10px] left-[5px] right-[-5px] transform -skew-x-[45deg] bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
          <div className="absolute top-[-5px] left-full w-[10px] bottom-[5px] transform -skew-y-[45deg] bg-[#00d4ff]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
          <div className="absolute inset-[2px] bg-[#212121] z-0 group-focus-within:bg-white/50 transition-all duration-200" />
        </div>
        <button type="submit" className="w-full p-4 font-bold text-white text-base tracking-wider relative group overflow-hidden">
          <div className="absolute h-[10px] -bottom-[10px] left-[5px] right-[-5px] transform -skew-x-[45deg] bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
          <div className="absolute top-[-5px] left-full w-[10px] bottom-[5px] transform -skew-y-[45deg] bg-[#00d4ff]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#020024] via-[#340979] to-[#00d4ff]" />
          <div className="absolute inset-[2px] bg-[#212121] group-hover:top-full group-hover:bg-white/50 transition-all duration-200 z-0" />
          <span className="relative z-10">Send Reset Link</span>
        </button>
        {message && <div className="mt-4 text-center text-sm text-white bg-black/50 p-2 rounded">{message}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword; 