import type { Meta, StoryObj } from '@storybook/react'
import { Slide11_Phases } from '@/components/slides/Slide11_Phases'

const meta: Meta<typeof Slide11_Phases> = {
  title: 'Slides/11 Phases',
  component: Slide11_Phases,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide11_Phases>
export const Default: Story = {}
