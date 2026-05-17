'use client'

import React from 'react'
import type { Page } from '@/payload-types'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import AnimateOnScroll from '../../components/AnimateOnScroll'
import { cn } from '@/utilities/ui'

type SplitContainerProps = {
  backgroundColor?: string | null
  verticalPadding?: 'sm' | 'md' | 'lg' | 'xl' | null
  columnsCount?: string | null
  gap?: 'sm' | 'md' | 'lg' | 'xl' | null
  columns?: Page['layout']
  enableAnimation?: boolean | null
  className?: string
  id?: string | null
}

const paddingMap: Record<string, string> = {
  sm: 'py-8',
  md: 'py-12',
  lg: 'py-20',
  xl: 'py-28',
}

const gapMap: Record<string, string> = {
  sm: 'gap-4',
  md: 'gap-8',
  lg: 'gap-12',
  xl: 'gap-16',
}

export const SplitContainerBlock: React.FC<SplitContainerProps> = ({
  backgroundColor,
  verticalPadding = 'lg',
  columnsCount = '1',
  gap = 'lg',
  columns,
  enableAnimation = false,
  className,
}) => {
  if (!columns || columns.length === 0) return null

  const cols = parseInt(columnsCount || '1', 10)
  // Build grid classes: 1 col on mobile, 2‑4 cols on desktop
  const gridCols = ['', 'md:grid-cols-2', 'md:grid-cols-3', 'md:grid-cols-4']
  const colClass = gridCols[Math.min(cols, 4)] || 'md:grid-cols-1'

  const paddingClass = paddingMap[verticalPadding || 'lg']
  const gapClass = gapMap[gap || 'lg']

  return (
    <section
      className={cn(paddingClass, className)}
      style={{
        backgroundColor: backgroundColor || 'var(--bg-body)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${colClass} ${gapClass}`}>
          {columns.map((block, index) =>
            enableAnimation ? (
              <AnimateOnScroll key={block.id || index} preset="fadeUp" delay={index * 0.1}>
                <RenderBlocks blocks={[block]} />
              </AnimateOnScroll>
            ) : (
              <RenderBlocks key={block.id || index} blocks={[block]} />
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default SplitContainerBlock
