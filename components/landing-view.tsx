"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

interface LandingViewProps {
  onAnalyze: (url: string) => void
  isAnalyzing: boolean
}

export function LandingView({ onAnalyze, isAnalyzing }: LandingViewProps) {
  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onAnalyze(url)
      // Animate progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 2
        })
      }, 50)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen px-4"
    >
      <div className="w-full max-w-2xl mx-auto space-y-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="font-sans text-6xl md:text-7xl font-bold tracking-tight text-balance">Research Scout</h1>
          <p className="text-gray-400 text-lg font-light">Uncover the technology behind any website</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 transition-colors group-focus-within:text-indigo-500" />
            <Input
              type="url"
              placeholder="Enter website URL to analyze..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isAnalyzing}
              className="pl-12 h-14 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 rounded-xl focus-visible:ring-indigo-500 focus-visible:border-indigo-500 transition-all backdrop-blur-sm"
            />
          </div>

          <Button
            type="submit"
            disabled={isAnalyzing || !url.trim()}
            className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </Button>

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-2"
            >
              <Progress value={progress} className="h-1 bg-zinc-900" />
              <p className="text-sm text-gray-500 text-center">Scanning tech stack and analyzing data...</p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.div>
  )
}
