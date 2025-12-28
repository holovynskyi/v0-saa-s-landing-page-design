"use client"

import { motion } from "framer-motion"
import { Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps {
  searchHistory: Array<{ url: string; timestamp: Date }>
  onNewSearch: () => void
  onSelectHistory: (url: string) => void
}

export function Sidebar({ searchHistory, onNewSearch, onSelectHistory }: SidebarProps) {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date)
  }

  const formatDate = (date: Date) => {
    const today = new Date()
    const isToday = date.toDateString() === today.toDateString()

    if (isToday) return "Today"

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-screen w-80 bg-zinc-950 border-r border-zinc-800 p-6 flex flex-col"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-6">Research Scout</h2>
        <Button onClick={onNewSearch} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg h-10">
          <Plus className="w-4 h-4 mr-2" />
          New Search
        </Button>
      </div>

      <div className="flex-1 overflow-hidden">
        <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Recent Searches
        </h3>
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-2">
            {searchHistory.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-8">No searches yet</p>
            ) : (
              searchHistory.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => onSelectHistory(item.url)}
                  className="w-full text-left p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all group"
                >
                  <p className="text-sm text-white truncate group-hover:text-indigo-400 transition-colors">
                    {item.url}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>{formatDate(item.timestamp)}</span>
                    <span>•</span>
                    <span>{formatTime(item.timestamp)}</span>
                  </div>
                </motion.button>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </motion.aside>
  )
}
