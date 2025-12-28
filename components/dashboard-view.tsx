"use client"

import { motion } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { AnalysisCards } from "@/components/analysis-cards"

interface DashboardViewProps {
  url: string
  searchHistory: Array<{ url: string; timestamp: Date }>
  onNewSearch: () => void
  onSelectHistory: (url: string) => void
}

export function DashboardView({ url, searchHistory, onNewSearch, onSelectHistory }: DashboardViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen"
    >
      <Sidebar searchHistory={searchHistory} onNewSearch={onNewSearch} onSelectHistory={onSelectHistory} />
      <main className="flex-1 p-8 ml-80">
        <AnalysisCards url={url} />
      </main>
    </motion.div>
  )
}
