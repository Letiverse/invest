import type { Meta, StoryObj } from '@storybook/react'
import { Slide13_Hosts } from '@/components/slides/Slide13_Hosts'

const meta: Meta<typeof Slide13_Hosts> = {
  title: 'Slides/13 Hosts',
  component: Slide13_Hosts,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide13_Hosts>
export const Default: Story = {}
