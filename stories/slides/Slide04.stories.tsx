import type { Meta, StoryObj } from '@storybook/react'
import { Slide04_BestTwin } from '@/components/slides/Slide04_BestTwin'

const meta: Meta<typeof Slide04_BestTwin> = {
  title: 'Slides/04 Best Twin',
  component: Slide04_BestTwin,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide04_BestTwin>
export const Default: Story = {}
