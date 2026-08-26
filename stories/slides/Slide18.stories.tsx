import type { Meta, StoryObj } from '@storybook/react'
import { Slide18_CTA } from '@/components/slides/Slide18_CTA'

const meta: Meta<typeof Slide18_CTA> = {
  title: 'Slides/18 CTA',
  component: Slide18_CTA,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
}

export default meta
type Story = StoryObj<typeof Slide18_CTA>

export const Default: Story = {}
