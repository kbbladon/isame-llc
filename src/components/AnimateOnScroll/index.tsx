'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

type Preset = 'fadeUp' | 'fadeIn' | 'zoomIn' | 'slideLeft' | 'slideRight'

const presets: Record<Preset, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  zoomIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
}

type AnimateOnScrollProps = {
  children: React.ReactNode
  preset?: Preset
  delay?: number
  duration?: number
  className?: string
}

export default function AnimateOnScroll({
  children,
  preset = 'fadeUp',
  delay = 0,
  duration = 0.5,
  className,
}: AnimateOnScrollProps) {
  const variants = presets[preset]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
