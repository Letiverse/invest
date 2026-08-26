import type { Meta, StoryObj } from '@storybook/react'
import { Slide12_Ecommerce } from '@/components/slides/Slide12_Ecommerce'

const meta: Meta<typeof Slide12_Ecommerce> = {
  title: 'Slides/12 Ecommerce',
  component: Slide12_Ecommerce,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide12_Ecommerce>
export const Default: Story = {}
