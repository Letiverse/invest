import type { Meta, StoryObj } from '@storybook/react'
import { Slide09_Revenue1 } from '@/components/slides/Slide09_Revenue1'

const meta: Meta<typeof Slide09_Revenue1> = {
  title: 'Slides/09 Revenue Model 1',
  component: Slide09_Revenue1,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide09_Revenue1>
export const Default: Story = {}
