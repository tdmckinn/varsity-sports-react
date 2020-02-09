import * as React from 'react'

import './styles/SectionHeader.scss'

interface SectionHeaderProps {
  title: string
  className?: string
}

const SectionHeader = ({ title }: SectionHeaderProps) => (
  <h1 className="vsf-section-header title">{title}</h1>
)

export default SectionHeader
