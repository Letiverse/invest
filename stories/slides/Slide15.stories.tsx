import type { Meta, StoryObj } from '@storybook/react'
import { Slide15_Projections } from '@/components/slides/Slide15_Projections'

const meta: Meta<typeof Slide15_Projections> = {
  title: 'Slides/15 Projections',
  component: Slide15_Projections,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide15_Projections>
export const Default: Story = {}
