import type { Meta, StoryObj } from '@storybook/react'
import { Slide02_AIShift } from '@/components/slides/Slide02_AIShift'

const meta: Meta<typeof Slide02_AIShift> = {
  title: 'Slides/02 AI Shift',
  component: Slide02_AIShift,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide02_AIShift>
export const Default: Story = {}
