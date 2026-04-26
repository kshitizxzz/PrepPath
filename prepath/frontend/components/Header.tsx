'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-slate-800 border-b border-gray-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg transition-all">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            PrepPath
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
            Dashboard
          </Link>
          <Link href="/generate" className="text-gray-300 hover:text-white transition">
            Generate
          </Link>
          <Link href="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert('Coming soon!')}
            className="px-4 py-2 rounded-lg bg-slate-700 text-white border border-gray-700 hover:bg-gray-800 transition text-sm"
          >
            Sign In
          </button>
          <button 
            onClick={() => router.push('/generate')}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition text-sm"
          >
            Get Started
          </button>
        </div>
      </nav>
    </header>
  );
}
