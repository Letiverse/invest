import type { Meta, StoryObj } from '@storybook/react'
import { Slide03_SpatialWeb } from '@/components/slides/Slide03_SpatialWeb'

const meta: Meta<typeof Slide03_SpatialWeb> = {
  title: 'Slides/03 Spatial Web',
  component: Slide03_SpatialWeb,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide03_SpatialWeb>
export const Default: Story = {}
