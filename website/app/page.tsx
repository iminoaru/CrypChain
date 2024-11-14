'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-space text-xl font-bold"
            >
              CrypChain
            </motion.div>
            <div className="flex items-center gap-6">
              <Link href="/docs" className="hover:text-zinc-300 transition">
                Documentation
              </Link>
              <Link 
                href="https://github.com/iminoaru/CrypChain" 
                className="hover:text-zinc-300 transition"
                target="_blank"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-space text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Simple Blockchain.<br />
              Powerful Implementation.
            </h1>
            <p className="mt-6 text-xl text-zinc-400">
              A TypeScript-based blockchain with proof-of-work consensus,<br />
              transaction system, and P2P networking.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                href="/docs"
                className="rounded-lg bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 hover:bg-zinc-200 transition"
              >
                View Documentation
              </Link>
              <Link
                href="https://github.com/iminoaru/CrypChain"
                target="_blank"
                className="rounded-lg bg-zinc-800 px-6 py-3 text-sm font-medium text-zinc-100 hover:bg-zinc-700 transition"
              >
                GitHub Repository
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {features.map((feature, index) => (
              <div key={index} className="rounded-lg bg-zinc-800 p-6">
                <h3 className="font-space text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

const features = [
  {
    title: 'Proof of Work',
    description: 'Secure consensus mechanism using hashcash algorithm for block validation and chain integrity.'
  },
  {
    title: 'P2P Network',
    description: 'Decentralized mesh network topology allowing nodes to communicate and synchronize state.'
  },
  {
    title: 'Transaction System',
    description: 'Robust transaction handling with mining capabilities and transaction pool management.'
  }
]