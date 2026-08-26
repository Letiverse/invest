import type { Meta, StoryObj } from '@storybook/react'
import { Slide07_BackwardsModel } from '@/components/slides/Slide07_BackwardsModel'

const meta: Meta<typeof Slide07_BackwardsModel> = {
  title: 'Slides/07 Backwards Model',
  component: Slide07_BackwardsModel,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide07_BackwardsModel>
export const Default: Story = {}
