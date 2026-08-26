import type { Meta, StoryObj } from '@storybook/react'
import { Slide08_Benefits } from '@/components/slides/Slide08_Benefits'

const meta: Meta<typeof Slide08_Benefits> = {
  title: 'Slides/08 Benefits',
  component: Slide08_Benefits,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide08_Benefits>
export const Default: Story = {}
