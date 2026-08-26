import type { Meta, StoryObj } from '@storybook/react'
import { Slide06_MarketSize } from '@/components/slides/Slide06_MarketSize'

const meta: Meta<typeof Slide06_MarketSize> = {
  title: 'Slides/06 Market Size',
  component: Slide06_MarketSize,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide06_MarketSize>
export const Default: Story = {}
