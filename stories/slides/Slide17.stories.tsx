import type { Meta, StoryObj } from '@storybook/react'
import { Slide17_Risk } from '@/components/slides/Slide17_Risk'

const meta: Meta<typeof Slide17_Risk> = {
  title: 'Slides/17 Risk & Moats',
  component: Slide17_Risk,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide17_Risk>
export const Default: Story = {}
