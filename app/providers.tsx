'use client'

import React from 'react'
import ErrorBoundary from '@/components/ErrorBoundary'
import Breadcrumbs from '@/components/Breadcrumbs'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Breadcrumbs />
        {children}
      </div>
    </ErrorBoundary>
  )
}
