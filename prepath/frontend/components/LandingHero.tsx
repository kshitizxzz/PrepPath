'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Zap, BarChart3, Network } from 'lucide-react';

export default function LandingHero() {
  const router = useRouter();

  const features = [
    { icon: Zap, title: 'AI-Powered Roadmaps', desc: 'Personalized learning paths' },
    { icon: BarChart3, title: 'Progress Tracking', desc: 'Monitor your preparation' },
    { icon: Network, title: 'Graph Visualization', desc: 'Topic relationship mapping' },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            Your Path to Acing<br />Tech Interviews
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            PrepPath uses Dijkstra's algorithm to generate personalized coding interview roadmaps. Prepare smarter, not harder.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => router.push('/generate')}
              className="btn-primary inline-flex items-center gap-2 group px-8 py-4"
            >
              Get Your Roadmap
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => router.push('/dashboard')}
              className="btn-secondary px-8 py-4"
            >
              View Dashboard
            </button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className="card"
              whileHover={{ y: -5 }}
            >
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Image Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-blue-500/10 to-purple-600/10 p-1">
            <div className="relative bg-slate-800 rounded-xl p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Network className="w-20 h-20 text-blue-500/50 mx-auto mb-4" />
                <p className="text-gray-400">Interactive roadmap visualization</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
