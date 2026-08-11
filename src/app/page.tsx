'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { generateIntelligentArtifacts } from '@/lib/generation/intelligent-generator'
import { Button } from '@/components/UI/Button'
import { Card } from '@/components/UI/Card'
import { Badge } from '@/components/UI/Badge'
import { Input } from '@/components/UI/Input'

const categories = [
  { label: 'SaaS', value: 'saas', emoji: '☁️' },
  { label: 'Mobile App', value: 'mobile_app', emoji: '📱' },
  { label: 'Web App', value: 'web_app', emoji: '🌐' },
  { label: 'Marketplace', value: 'marketplace', emoji: '🛒' },
  { label: 'B2C App', value: 'b2c_app', emoji: '👥' },
  { label: 'Hardware', value: 'hardware', emoji: '⚙️' },
  { label: 'AI Tool', value: 'ai_tool', emoji: '🤖' },
  { label: 'Fintech', value: 'fintech', emoji: '💰' },
  { label: 'Healthcare', value: 'healthcare', emoji: '🏥' },
  { label: 'EdTech', value: 'edtech', emoji: '📚' },
  { label: 'Gaming', value: 'gaming', emoji: '🎮' },
  { label: 'Social Network', value: 'social', emoji: '💬' },
  { label: 'Service', value: 'service', emoji: '🔧' },
  { label: 'Community', value: 'community', emoji: '🤝' },
]

const categoryMap: Record<string, string> = Object.fromEntries(
  categories.map(c => [c.label, c.value])
)

const artifacts = [
  { icon: '📋', title: 'Product Canvas', description: 'Business model overview with key elements' },
  { icon: '📄', title: 'PRD', description: 'Comprehensive product requirements document' },
  { icon: '🎯', title: 'GTM Strategy', description: 'Go-to-market plan with positioning' },
  { icon: '⭐', title: 'Features', description: 'Detailed feature specifications' },
  { icon: '✅', title: 'Validation Plan', description: 'Customer discovery strategy' },
  { icon: '🏆', title: 'Competitive Analysis', description: 'Real competitor insights' },
  { icon: '🎤', title: 'Pitch Deck', description: 'Investor presentation outline' },
]

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Manager at Startup',
    text: 'This tool saved me 20 hours of research and documentation work. The PRD quality is impressive.',
  },
  {
    name: 'James Wilson',
    role: 'Founder & CEO',
    text: 'Finally, a tool that understands product development. Generated artifacts I\'d present to investors.',
  },
  {
    name: 'Maria Rodriguez',
    role: 'Business Analyst',
    text: 'The competitive analysis alone is worth using this. Incredibly insightful for different markets.',
  },
]

const sampleProblems = [
  {
    title: 'Remote Team Collaboration',
    description: 'Teams struggle with asynchronous collaboration, scattered communication, and lack of context when working across time zones.',
    category: 'SaaS',
  },
  {
    title: 'AI Code Assistant',
    description: 'Developers spend too much time on boilerplate code and repetitive tasks. They need an AI tool that understands their codebase context.',
    category: 'AI Tool',
  },
  {
    title: 'Fitness Marketplace',
    description: 'Fitness professionals are underutilized. We want to create a marketplace connecting certified trainers with people seeking personalized fitness guidance.',
    category: 'Marketplace',
  },
  {
    title: 'Mental Health Mobile App',
    description: 'Young adults struggle with anxiety and depression but avoid seeking help. A mobile app offering accessible mental health support could help.',
    category: 'Mobile App',
  },
  {
    title: 'Fintech Investment Platform',
    description: 'Millennial investors want to invest fractional shares in diversified portfolios with low fees and social trading features.',
    category: 'Fintech',
  },
]

export default function Home() {
  const router = useRouter()
  const [problemStatement, setProblemStatement] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!problemStatement.trim() || !category) {
      alert('Please fill in all fields')
      return
    }

    setLoading(true)

    try {
      const categoryKey = categoryMap[category]

      const generatedContent = generateIntelligentArtifacts({
        problemStatement,
        category: categoryKey as any,
      })

      const artifacts = {
        canvas: { content: generatedContent.canvas, editedAt: new Date().toISOString() },
        prd: { content: generatedContent.prd, editedAt: new Date().toISOString() },
        gtm: { content: generatedContent.gtm, editedAt: new Date().toISOString() },
        features: { content: generatedContent.features, editedAt: new Date().toISOString() },
        validation: { content: generatedContent.validation, editedAt: new Date().toISOString() },
        competitive: { content: generatedContent.competitive, editedAt: new Date().toISOString() },
        metrics: { content: generatedContent.metrics, editedAt: new Date().toISOString() },
      }

      const generation = {
        id: `gen_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        problemStatement,
        category: categoryKey,
        artifacts,
        isBookmarked: false,
        projectName: problemStatement.substring(0, 50),
      }

      localStorage.setItem('latestGeneration', JSON.stringify(generation))
      router.push('/results')
    } catch (error) {
      console.error('Generation failed:', error)
      alert('Failed to generate artifacts')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative px-4 py-20 md:py-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-200 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="max-w-5xl mx-auto text-center">
          <Badge variant="info" className="mx-auto mb-6">
            ✨ Generate 7 Professional Artifacts in Seconds
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Build Your Product{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              In Seconds
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get professional product artifacts instantly. No sign-ups, no APIs, completely offline. Turn your idea into a complete product strategy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" variant="primary" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
              Get Started Free
            </Button>
            <Button size="lg" variant="secondary">
              View Examples
            </Button>
          </div>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span>✓ 100% Free</span>
            <span>✓ No Sign-up</span>
            <span>✓ Works Offline</span>
            <span>✓ Your Data, Your Control</span>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Describe Your Product Idea</h2>
              <p className="text-gray-600 dark:text-gray-400">We'll generate a complete product strategy in seconds</p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-8">
              {/* Problem Statement */}
              <Input
                isTextarea={true}
                label="What problem are you solving?"
                placeholder="e.g., Developers waste hours writing boilerplate code. We want to build an AI tool that generates production-ready code from natural language..."
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                rows={5}
              />

              {/* Category Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Choose Your Product Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() => setCategory(cat.label)}
                      className={`
                        p-3 rounded-lg border-2 transition-all duration-200 flex flex-col items-center gap-1
                        ${
                          category === cat.label
                            ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }
                      `}
                    >
                      <span className="text-2xl">{cat.emoji}</span>
                      <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  isLoading={loading}
                  fullWidth={false}
                  disabled={loading || !problemStatement.trim() || !category}
                >
                  {loading ? 'Generating...' : 'Generate All 7 Artifacts'}
                </Button>
              </div>

              {/* Sample Problems */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Try a sample problem:</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sampleProblems.slice(0, 3).map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setProblemStatement(sample.description)
                        setCategory(sample.category)
                      }}
                      className="p-4 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all text-left"
                    >
                      <p className="font-medium text-gray-900 dark:text-white text-sm mb-1">{sample.title}</p>
                      <Badge size="sm" variant="info">{sample.category}</Badge>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16 md:py-24 bg-gray-100/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">7 Professional Artifacts</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Everything you need to launch your product</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {artifacts.map((artifact, idx) => (
              <Card key={idx} variant="default" isHoverable={true}>
                <div className="text-4xl mb-4">{artifact.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{artifact.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{artifact.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Three simple steps to complete product strategy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Describe Your Idea', description: 'Tell us your product concept and target category' },
              { step: '2', title: 'AI Generates', description: 'Our system creates 7 comprehensive artifacts instantly' },
              { step: '3', title: 'Use & Iterate', description: 'Edit, download, and share your product strategy' },
            ].map((item, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 ml-16">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 py-16 md:py-24 bg-gray-100/50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Loved by Product Builders</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">See what users think about the AI Product Copilot</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} variant="default">
                <div className="mb-4">
                  <div className="text-cyan-400 text-lg">★★★★★</div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                  <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Ready to Build?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Start generating your product strategy right now. It only takes 2 seconds.</p>
          <Button size="lg" variant="primary" onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}>
            Create Your Strategy
          </Button>
        </div>
      </section>
    </div>
  )
}
