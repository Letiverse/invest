import type { Meta, StoryObj } from '@storybook/react'
import { Slide14_EMV } from '@/components/slides/Slide14_EMV'

const meta: Meta<typeof Slide14_EMV> = {
  title: 'Slides/14 Earned Media Value',
  component: Slide14_EMV,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide14_EMV>
export const Default: Story = {}
