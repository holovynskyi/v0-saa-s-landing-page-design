"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { LandingView } from "@/components/landing-view"
import { DashboardView } from "@/components/dashboard-view"

export default function Home() {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const [searchHistory, setSearchHistory] = useState<Array<{ url: string; timestamp: Date }>>([])

  const handleAnalyze = async (url: string) => {
    setCurrentUrl(url)
    setIsAnalyzing(true)

    // Simulate analysis delay
    await new Promise((resolve) => setTimeout(resolve, 2500))

    setIsAnalyzing(false)
    setShowDashboard(true)
    setSearchHistory((prev) => [{ url, timestamp: new Date() }, ...prev].slice(0, 10))
  }

  const handleNewSearch = () => {
    setShowDashboard(false)
    setCurrentUrl("")
  }

  const handleSelectHistory = (url: string) => {
    setCurrentUrl(url)
    setShowDashboard(true)
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none noise-bg" />

      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <LandingView key="landing" onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        ) : (
          <DashboardView
            key="dashboard"
            url={currentUrl}
            searchHistory={searchHistory}
            onNewSearch={handleNewSearch}
            onSelectHistory={handleSelectHistory}
          />
        )}
      </AnimatePresence>
    </main>
  )
}
