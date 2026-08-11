'use client'

import React from 'react'
import { Persona } from '@/lib/generation/templates/personas'

interface PersonaCardProps {
  persona: Persona
  isHighlighted?: boolean
}

export function PersonaCard({ persona, isHighlighted = false }: PersonaCardProps) {
  const getTypeColor = (type: 'primary' | 'secondary' | 'tertiary') => {
    switch (type) {
      case 'primary':
        return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950/30'
      case 'secondary':
        return 'border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950/30'
      case 'tertiary':
        return 'border-l-4 border-gray-400 bg-gray-50 dark:bg-gray-950/30'
    }
  }

  const getTypeLabel = (type: 'primary' | 'secondary' | 'tertiary') => {
    switch (type) {
      case 'primary':
        return 'Primary User'
      case 'secondary':
        return 'Secondary User'
      case 'tertiary':
        return 'Tertiary User'
    }
  }

  const getTypeIcon = (type: 'primary' | 'secondary' | 'tertiary') => {
    switch (type) {
      case 'primary':
        return '⭐'
      case 'secondary':
        return '◆'
      case 'tertiary':
        return '○'
    }
  }

  return (
    <div
      className={`
        rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200
        ${getTypeColor(persona.type)}
        p-6 space-y-4
        ${isHighlighted ? 'ring-2 ring-blue-400 dark:ring-blue-500' : ''}
      `}
    >
      {/* Header: Name, Role, Type Badge */}
      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {persona.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {persona.role}
            </p>
          </div>
          <div className="flex-shrink-0 ml-2">
            <span
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                ${
                  persona.type === 'primary'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                    : persona.type === 'secondary'
                    ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                }
              `}
            >
              {getTypeIcon(persona.type)} {getTypeLabel(persona.type)}
            </span>
          </div>
        </div>
      </div>

      {/* Goal Statement */}
      <div className="bg-white dark:bg-gray-800/50 rounded p-3 border border-gray-200 dark:border-gray-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          🎯 Primary Goal
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {persona.goal}
        </p>
      </div>

      {/* Job Context */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800/50 rounded p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Department
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
            {persona.jobContext.department}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800/50 rounded p-3 border border-gray-200 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Team Size
          </p>
          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">
            {persona.jobContext.teamSize}
          </p>
        </div>
      </div>

      {/* Budget Authority */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded p-3 border border-green-200 dark:border-green-800">
        <p className="text-xs font-semibold text-green-700 dark:text-green-400 uppercase tracking-wider mb-1">
          💰 Budget Authority
        </p>
        <p className="text-sm font-bold text-green-900 dark:text-green-200">
          {persona.jobContext.budgetAuthority}
        </p>
        {persona.jobContext.reportingTo && (
          <p className="text-xs text-green-700 dark:text-green-400 mt-1">
            Reports to: {persona.jobContext.reportingTo}
          </p>
        )}
      </div>

      {/* Pain Points */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <span>🚫</span> Key Pain Points
        </p>
        <ul className="space-y-2">
          {persona.painPoints.map((point, idx) => (
            <li
              key={idx}
              className="text-sm bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded p-2"
            >
              <p className="font-medium text-red-800 dark:text-red-300">
                {idx + 1}. {point.title}
              </p>
              <p className="text-xs text-red-700 dark:text-red-400 mt-1">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Success Metrics */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <span>✅</span> Success Metrics
        </p>
        <ul className="space-y-1">
          {persona.successMetrics.map((metric, idx) => (
            <li
              key={idx}
              className="text-sm text-green-700 dark:text-green-400 flex items-start gap-2"
            >
              <span className="text-green-500 mt-1">▸</span>
              <span>{metric}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Objections/Concerns */}
      <div>
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-1">
          <span>⚠️</span> Typical Objections
        </p>
        <ul className="space-y-1">
          {persona.objections.map((objection, idx) => (
            <li
              key={idx}
              className="text-sm text-amber-700 dark:text-amber-400 flex items-start gap-2"
            >
              <span className="text-amber-500 mt-1">▸</span>
              <span>"{objection}"</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
