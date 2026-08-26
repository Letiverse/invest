import type { Meta, StoryObj } from '@storybook/react'
import { Slide10_Holoconnects } from '@/components/slides/Slide10_Holoconnects'

const meta: Meta<typeof Slide10_Holoconnects> = {
  title: 'Slides/10 Holoconnects',
  component: Slide10_Holoconnects,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide10_Holoconnects>
export const Default: Story = {}
