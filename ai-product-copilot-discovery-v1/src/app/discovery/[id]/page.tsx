'use client'

import { useEffect, useState } from 'react'
import { Generation } from '@/lib/types/discovery'

export default function DiscoveryPage({ params }: { params: { id: string } }) {
  const [generation, setGeneration] = useState<Generation | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('discoveries') || '[]'
    const discoveries = JSON.parse(stored) as Generation[]
    const found = discoveries.find((d) => d.id === params.id)

    if (found) {
      setGeneration(found)
    }
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!generation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Discovery Not Found</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-4">The analysis you're looking for doesn't exist.</p>
          <a href="/" className="button-primary">
            Create New Analysis
          </a>
        </div>
      </div>
    )
  }

  const discovery = generation.discovery
  const oppScore = discovery.opportunityScore.score
  const oppTier = discovery.opportunityScore.tier
  const confScore = discovery.executiveDecision.confidenceScore

  const tierColors = {
    GREEN_LIGHT: 'score-green',
    YELLOW_CAUTION: 'score-yellow',
    RED_FLAG: 'score-red',
    STOP: 'score-red',
  }

  return (
    <div className="min-h-screen">
      {/* Results Header */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Discovery Analysis Report</h1>
          <p className="text-lg opacity-90 mb-6">{generation.problemStatement}</p>
          <div className="flex flex-wrap gap-4">
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-sm opacity-75">Category</p>
              <p className="font-semibold">{generation.category.replace('_', ' ').toUpperCase()}</p>
            </div>
            <div className="bg-white/10 px-4 py-2 rounded-lg">
              <p className="text-sm opacity-75">Generated</p>
              <p className="font-semibold">{new Date(generation.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Summary */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Opportunity Score */}
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Opportunity Score</p>
            <div className="flex items-center gap-4">
              <div className={`score-badge ${tierColors[oppTier]}`}>
                {oppScore}
              </div>
              <div>
                <p className="font-bold text-lg">{oppScore}/100</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {oppTier === 'GREEN_LIGHT'
                    ? '🟢 Strong Go'
                    : oppTier === 'YELLOW_CAUTION'
                      ? '🟡 Proceed Cautiously'
                      : oppTier === 'RED_FLAG'
                        ? '🔴 Major Risks'
                        : '🛑 Stop'}
                </p>
              </div>
            </div>
          </div>

          {/* Confidence Score */}
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Confidence Score</p>
            <div className="flex items-center gap-4">
              <div className={`score-badge ${confScore > 70 ? 'score-green' : confScore > 50 ? 'score-yellow' : 'score-red'}`}>
                {confScore}%
              </div>
              <div>
                <p className="font-bold text-lg">{confScore}%</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {confScore > 70 ? 'High confidence' : confScore > 50 ? 'Medium confidence' : 'Low confidence'}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="card">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">Recommendation</p>
            <div className="font-bold text-lg">
              {discovery.executiveDecision.recommendation === 'go'
                ? '✅ Go'
                : discovery.executiveDecision.recommendation === 'proceed_with_caution'
                  ? '⚠️ Proceed with Caution'
                  : discovery.executiveDecision.recommendation === 'pivot'
                    ? '🔄 Pivot'
                    : '❌ No-Go'}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              {discovery.executiveDecision.recommendation === 'go'
                ? 'Strong opportunity. Execute with confidence.'
                : discovery.executiveDecision.recommendation === 'proceed_with_caution'
                  ? 'High execution bar. Validate key assumptions first.'
                  : discovery.executiveDecision.recommendation === 'pivot'
                    ? 'Reconsider approach or market.'
                    : 'Not viable currently.'}
            </p>
          </div>
        </div>

        {/* Top Reasons */}
        <div className="card mb-12">
          <h3 className="text-xl font-bold mb-4">Top Reasons</h3>
          <ul className="space-y-2">
            {discovery.executiveDecision.topReasons.map((reason, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Next Actions */}
        <div className="card mb-12 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold mb-4">Immediate Next Actions</h3>
          <ol className="space-y-2 list-decimal list-inside">
            {discovery.executiveDecision.nextActions.map((action, i) => (
              <li key={i}>{action}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* All 8 Sections - Detailed View */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8">Detailed Analysis</h2>

        {/* Section 1: Structured Insights */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">1. Structured Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Primary Problem</p>
              <p className="mb-4">{discovery.insights.primaryProblem}</p>

              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Affected Users</p>
              <p className="mb-4">{discovery.insights.affectedUsers}</p>

              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Urgency Level</p>
              <p className="mb-4 capitalize">{discovery.insights.urgencyLevel}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Frequency</p>
              <p className="mb-4 capitalize">{discovery.insights.frequency}</p>

              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Cost of Status Quo</p>
              <p className="mb-4">{discovery.insights.costOfStatusQuo}</p>

              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Market Size</p>
              <p className="capitalize">{discovery.insights.marketSize}</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-2">Root Causes</p>
            <div className="flex flex-wrap gap-2">
              {discovery.insights.rootCauses.map((cause, i) => (
                <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Opportunity Assessment */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">2. Opportunity Assessment</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Opportunity Tier</p>
              <p className="text-lg font-bold">{discovery.opportunityScore.tier}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-600 dark:text-slate-400 text-sm mb-1">Reasoning</p>
              <p className="whitespace-pre-wrap text-sm">{discovery.opportunityScore.reasoning}</p>
            </div>
          </div>
        </div>

        {/* Section 3: Dynamic Personas */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">3. Dynamic Personas ({discovery.personas.length})</h3>
          <div className="space-y-6">
            {discovery.personas.map((persona, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-semibold text-lg">{persona.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{persona.jobTitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-600 dark:text-slate-400">Buying Power: <span className="font-semibold capitalize">{persona.buyingPower}</span></p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">Decision Speed: <span className="font-semibold capitalize">{persona.decisionSpeed}</span></p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-1">Primary Pain</p>
                    <p className="text-sm">{persona.primaryPain}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-1">Success Metric</p>
                    <p className="text-sm">{persona.successMetric}</p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-300 mb-2">Unmet Needs</p>
                  <ul className="text-sm space-y-1">
                    {persona.unmetNeeds.map((need, i) => (
                      <li key={i}>• {need}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Assumptions */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">4. Assumptions ({discovery.assumptions.length})</h3>
          <div className="space-y-4">
            {discovery.assumptions.slice(0, 6).map((assumption, i) => (
              <div key={i} className="p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold flex-1">{assumption.statement}</p>
                  <div className="flex gap-2 ml-2">
                    <span className={`px-2 py-1 text-xs rounded font-semibold ${
                      assumption.criticality === 'critical'
                        ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                        : 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
                    }`}>
                      {assumption.criticality}
                    </span>
                    <span className="px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
                      {assumption.confidence}% confident
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  <span className="font-semibold">Validate via:</span> {assumption.validationMethods.slice(0, 2).join(', ')}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {assumption.timeToValidate} • If wrong: {assumption.consequenceIfWrong}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Hypotheses */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">5. Hypotheses ({discovery.hypotheses.length})</h3>
          <div className="space-y-3">
            {discovery.hypotheses.map((hyp, i) => (
              <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded">
                <p className="font-semibold text-sm mb-1">{hyp.statement}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  🔬 {hyp.validationMethod}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Recommendations */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">6. Recommendations</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-3">MVP Scope</h4>
              <ul className="space-y-2">
                {discovery.recommendations.mvpScope.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-blue-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">First Features</h4>
              <ul className="space-y-2">
                {discovery.recommendations.firstFeatures.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-green-500">⭐</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Biggest Risks</h4>
              <ul className="space-y-2">
                {discovery.recommendations.risks.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-red-500">⚠️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section 7: Market Analysis */}
        <div className="card mb-6">
          <h3 className="text-2xl font-bold mb-4">7. Market Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg">
              <p className="text-sm opacity-90 mb-1">TAM (Total Addressable Market)</p>
              <p className="font-bold text-lg">{discovery.marketAnalysis.tam}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg">
              <p className="text-sm opacity-90 mb-1">SAM (Serviceable Addressable Market)</p>
              <p className="font-bold text-lg">{discovery.marketAnalysis.sam}</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-lg">
              <p className="text-sm opacity-90 mb-1">SOM (Serviceable Obtainable Market)</p>
              <p className="font-bold text-lg">{discovery.marketAnalysis.som}</p>
            </div>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex gap-4 justify-center mt-12">
          <a href="/" className="button-secondary">
            ← Analyze Another Idea
          </a>
          <button
            onClick={() => window.print()}
            className="button-primary"
          >
            🖨️ Print Report
          </button>
        </div>
      </section>
    </div>
  )
}
