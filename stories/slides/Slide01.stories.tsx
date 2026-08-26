import type { Meta, StoryObj } from '@storybook/react'
import { Slide01_Hero } from '@/components/slides/Slide01_Hero'

const meta: Meta<typeof Slide01_Hero> = {
  title: 'Slides/01 Hero',
  component: Slide01_Hero,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
}

export default meta
type Story = StoryObj<typeof Slide01_Hero>

export const Default: Story = {}
