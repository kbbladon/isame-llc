'use client'

import React from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { SearchIcon } from 'lucide-react'

// Same helpers used in the main Header (copied for consistency)
const getLinkHref = (linkItem: any): string => {
  if (!linkItem) return '#'
  if (typeof linkItem === 'string') return linkItem
  if (linkItem.link && typeof linkItem.link === 'string') return linkItem.link
  if (linkItem.type === 'reference' && linkItem.reference?.value?.slug)
    return `/${linkItem.reference.value.slug}`
  if (linkItem.type === 'custom' && linkItem.url) return linkItem.url
  if (linkItem.type === 'internal' && linkItem.reference?.slug) return `/${linkItem.reference.slug}`
  if (linkItem.type === 'external' && linkItem.url) return linkItem.url
  return '#'
}

const getLinkLabel = (linkItem: any): string => {
  if (!linkItem) return 'Link'
  if (typeof linkItem === 'string') return linkItem
  if (linkItem.label) return linkItem.label
  if (linkItem.link && typeof linkItem.link === 'string') return linkItem.link
  return 'Link'
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map((item, i) => {
        const href = getLinkHref(item)
        const label = getLinkLabel(item)
        const newTab = item?.newTab || false

        return (
          <Link
            key={i}
            href={href}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
            className="text-sm font-semibold uppercase tracking-wider text-white hover:text-yellow-400 transition-colors whitespace-nowrap"
          >
            {label}
          </Link>
        )
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  )
}
