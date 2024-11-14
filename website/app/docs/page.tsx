'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function DocsPage() {
  const router = useRouter()
  const [showScrollButton, setShowScrollButton] = useState(false)

  // Show scroll button when user scrolls down 100px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-zinc-950 bg-gradient-to-b from-zinc-900/50 relative">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text"
          {...fadeIn}
        >
          CrypChain Documentation
        </motion.h1>

        <motion.div 
          className="prose prose-invert prose-zinc max-w-none prose-headings:font-primary prose-code:font-mono
          prose-pre:bg-zinc-800/40 prose-pre:border prose-pre:border-zinc-800"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {/* Introduction Section */}
          <h2>Introduction</h2>
          <p>
            CrypChain is a modern, TypeScript-based blockchain implementation designed for educational purposes
            and real-world applications. It demonstrates core blockchain concepts while maintaining a clean,
            maintainable codebase.
          </p>

          {/* Existing Setup Section with added details */}
          <h2>Setup locally</h2>
          
          <h3>Prerequisites</h3>
          <ul>
            <li>Node.js (v16 or higher)</li>
            <li>npm (v7 or higher)</li>
            <li>TypeScript (v4.5+)</li>
            <li>Git</li>
          </ul>

          <h3>Installation</h3>
          <ol>
            <li>
              <p>Clone the repository</p>
              <pre><code className="bg-zinc-800/40">git clone https://github.com/iminoaru/CrypChain.git</code></pre>
            </li>
            <li>
              <p>Navigate to the project directory</p>
              <pre><code className="bg-zinc-800/40">cd CrypChain</code></pre>
            </li>
            <li>
              <p>Install the dependencies</p>
              <pre><code className="bg-zinc-800/40">npm install</code></pre>
            </li>
            <li>
              <p>Build the project</p>
              <pre><code className="bg-zinc-800/40">npm run build</code></pre>
            </li>
          </ol>

          <h2>Core Concepts</h2>
          <h3>Blockchain Structure</h3>
          <p>
            Each block in CrypChain contains:
          </p>
          <ul>
            <li>Timestamp</li>
            <li>Previous block hash</li>
            <li>Transaction data</li>
            <li>Nonce value</li>
            <li>Difficulty target</li>
          </ul>

          <h3>Mining Process</h3>
          <p>
            The mining process follows these steps:
          </p>
          <ol>
            <li>Collect pending transactions from the pool</li>
            <li>Create a new block with these transactions</li>
            <li>Calculate the target difficulty</li>
            <li>Find a nonce that satisfies the difficulty requirement</li>
            <li>Broadcast the new block to the network</li>
          </ol>

          <h2>API Endpoints</h2>
          <p>CrypChain provides a RESTful API for interacting with the blockchain:</p>
          
          <h3>GET Endpoints</h3>
          <ul>
            <li>
              <code>GET /blockchain</code>
              <p>Returns the entire blockchain. Response includes block height, timestamp, and transaction count.</p>
            </li>
            <li>
              <code>GET /transactions</code>
              <p>Returns all pending transactions in the pool. Includes sender, recipient, amount, and timestamp.</p>
            </li>
            <li>
              <code>GET /public-key</code>
              <p>Returns the node's public key for receiving transactions.</p>
            </li>
            <li>
              <code>GET /mine-transactions</code>
              <p>Triggers the mining process for pending transactions.</p>
            </li>
            <li>
              <code>GET /peers</code>
              <p>Returns a list of connected peer nodes.</p>
            </li>
          </ul>

          <h3>POST Endpoints</h3>
          <ul>
            <li>
              <code>POST /mine</code>
              <p>Mines a new block. Request body should include the block data.</p>
              <pre><code className="bg-zinc-800/40">{`{
  "data": "Block data here"
}`}</code></pre>
            </li>
            <li>
              <code>POST /transfer</code>
              <p>Creates a new transaction. Required fields:</p>
              <pre><code className="bg-zinc-800/40">{`{
  "recipient": "public_key_here",
  "amount": 100
}`}</code></pre>
            </li>
          </ul>

          <h2>Running Multiple Instances</h2>
          <p>To create a local test network, run multiple instances with different ports:</p>
          <pre><code className="bg-zinc-800/40">{`# Terminal 1 (Primary Node)
HTTP_PORT=3001 P2P_PORT=5001 npm run dev

# Terminal 2 (Secondary Node)
HTTP_PORT=3002 P2P_PORT=5002 PEERS=ws://localhost:5001 npm run dev

# Terminal 3 (Tertiary Node)
HTTP_PORT=3003 P2P_PORT=5003 PEERS=ws://localhost:5001,ws://localhost:5002 npm run dev`}</code></pre>

          <h2>Network Architecture</h2>
          <p>
            CrypChain implements a decentralized peer-to-peer network where each node:
          </p>
          <ul>
            <li>Maintains a complete copy of the blockchain</li>
            <li>Validates new blocks and transactions</li>
            <li>Participates in the consensus mechanism</li>
            <li>Propagates new blocks and transactions to peers</li>
          </ul>

          <h3>Node Discovery</h3>
          <p>
            Nodes discover peers through:
          </p>
          <ul>
            <li>Static peer configuration</li>
            <li>Dynamic peer discovery</li>
            <li>Automatic peer sharing</li>
          </ul>

          <h2>Transaction Lifecycle</h2>
          <ol>
            <li>Transaction creation and signing</li>
            <li>Propagation to network</li>
            <li>Validation by nodes</li>
            <li>Addition to transaction pool</li>
            <li>Block inclusion during mining</li>
            <li>Confirmation through block propagation</li>
          </ol>

          <h2>Development Guidelines</h2>
          <h3>Code Style</h3>
          <p>
            The project follows these conventions:
          </p>
          <ul>
            <li>ESLint for code linting</li>
            <li>Prettier for code formatting</li>
            <li>TypeScript strict mode enabled</li>
            <li>Jest for testing</li>
          </ul>

          <h3>Contributing</h3>
          <p>
            To contribute to CrypChain:
          </p>
          <ol>
            <li>Fork the repository</li>
            <li>Create a feature branch</li>
            <li>Implement your changes</li>
            <li>Add tests for new functionality</li>
            <li>Submit a pull request</li>
          </ol>

          <h2>Troubleshooting</h2>
          <h3>Common Issues</h3>
          <ul>
            <li>
              <strong>Node Connection Issues</strong>
              <p>Verify firewall settings and port availability</p>
            </li>
            <li>
              <strong>Mining Delays</strong>
              <p>Check system resources and difficulty adjustment</p>
            </li>
            <li>
              <strong>Transaction Failures</strong>
              <p>Ensure proper key pair generation and sufficient balance</p>
            </li>
          </ul>

        </motion.div>

        {/* Navigation Buttons */}
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={scrollToTop}
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </motion.button>
          )}
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => router.push('/')}
            className="bg-zinc-800 hover:bg-zinc-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  )
}