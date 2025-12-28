"use client"

import { motion } from "framer-motion"
import { Code2, Server, TrendingUp, Search, Globe, Layers, BarChart3, Copy, ExternalLink, Check } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface AnalysisCardsProps {
  url: string
}

export function AnalysisCards({ url }: AnalysisCardsProps) {
  const { toast } = useToast()
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStates((prev) => ({ ...prev, [key]: true }))
    toast({
      title: "Copied to clipboard",
      duration: 2000,
    })
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [key]: false }))
    }, 2000)
  }

  // Mock data - in real app this would come from API
  const analysisData = {
    techStack: [
      { name: "Next.js", version: "14.0.0" },
      { name: "React", version: "18.2.0" },
      { name: "TypeScript", version: "5.0.0" },
      { name: "Tailwind CSS", version: "3.3.0" },
    ],
    cms: {
      type: "Headless CMS",
      provider: "Vercel",
      registrar: "Cloudflare",
    },
    performance: {
      monthlyVisits: "2.4M",
      traffic: "+24.5%",
      avgDuration: "3m 42s",
    },
    keywords: [
      "web development",
      "javascript framework",
      "react components",
      "modern web apps",
      "serverless deployment",
    ],
    similarSites: ["vercel.com", "netlify.com", "railway.app", "render.com", "fly.io"],
    languages: ["JavaScript", "TypeScript", "CSS", "HTML"],
    trafficSources: [
      { source: "Direct", percentage: 45 },
      { source: "Search", percentage: 30 },
      { source: "Social", percentage: 15 },
      { source: "Referral", percentage: 10 },
    ],
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
        <p className="text-gray-400">{url}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Tech Stack Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() => handleCopy(analysisData.techStack.map((t) => `${t.name} ${t.version}`).join("\n"), "tech")}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["tech"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-indigo-600/20">
                <Code2 className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
            </div>
            <div className="space-y-3">
              {analysisData.techStack.map((tech, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-gray-300">{tech.name}</span>
                  <span className="text-sm text-gray-500 font-mono">{tech.version}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* CMS & Hosting Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() =>
                handleCopy(
                  `CMS: ${analysisData.cms.type}\nHost: ${analysisData.cms.provider}\nRegistrar: ${analysisData.cms.registrar}`,
                  "cms",
                )
              }
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["cms"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-purple-600/20">
                <Server className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">CMS & Hosting</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">CMS Type</span>
                <span className="text-gray-300">{analysisData.cms.type}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Hosting</span>
                <span className="text-gray-300">{analysisData.cms.provider}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Registrar</span>
                <span className="text-gray-300">{analysisData.cms.registrar}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Performance Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() =>
                handleCopy(
                  `Monthly Visits: ${analysisData.performance.monthlyVisits}\nGrowth: ${analysisData.performance.traffic}\nAvg Duration: ${analysisData.performance.avgDuration}`,
                  "perf",
                )
              }
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["perf"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-600/20">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Performance</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Monthly Visits</span>
                <span className="text-gray-300 font-semibold">{analysisData.performance.monthlyVisits}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Traffic Change</span>
                <span className="text-green-400 font-semibold">{analysisData.performance.traffic}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Avg Duration</span>
                <span className="text-gray-300">{analysisData.performance.avgDuration}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* SEO Keywords Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() => handleCopy(analysisData.keywords.join(", "), "keywords")}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["keywords"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-600/20">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">SEO Keywords</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysisData.keywords.map((keyword, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-zinc-800 text-sm text-gray-300 hover:bg-zinc-700 transition-colors cursor-default"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Similar Websites Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() => handleCopy(analysisData.similarSites.join("\n"), "similar")}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["similar"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-600/20">
                <Globe className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Similar Websites</h3>
            </div>
            <div className="space-y-2">
              {analysisData.similarSites.map((site, i) => (
                <a
                  key={i}
                  href={`https://${site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-zinc-800 transition-colors group/link"
                >
                  <span className="text-gray-300 group-hover/link:text-indigo-400">{site}</span>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover/link:text-indigo-400" />
                </a>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Languages Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() => handleCopy(analysisData.languages.join(", "), "langs")}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["langs"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-orange-600/20">
                <Layers className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Languages & Frameworks</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {analysisData.languages.map((lang, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-zinc-800 to-zinc-800/50 text-sm text-gray-300 font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Traffic Sources Card */}
        <motion.div variants={item}>
          <Card className="bg-zinc-900/50 border-zinc-800 p-6 hover:bg-zinc-900/70 hover:border-zinc-700 transition-all group relative">
            <button
              onClick={() =>
                handleCopy(
                  analysisData.trafficSources.map((t) => `${t.source}: ${t.percentage}%`).join("\n"),
                  "traffic",
                )
              }
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700 transition-all opacity-0 group-hover:opacity-100"
            >
              {copiedStates["traffic"] ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-pink-600/20">
                <BarChart3 className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Traffic Sources</h3>
            </div>
            <div className="space-y-3">
              {analysisData.trafficSources.map((source, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-300">{source.source}</span>
                    <span className="text-sm text-gray-500">{source.percentage}%</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${source.percentage}%` }}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
