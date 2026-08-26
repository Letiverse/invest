import type { Meta, StoryObj } from '@storybook/react'
import { Slide16_Financials } from '@/components/slides/Slide16_Financials'

const meta: Meta<typeof Slide16_Financials> = {
  title: 'Slides/16 Financials',
  component: Slide16_Financials,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide16_Financials>
export const Default: Story = {}
