import type { Meta, StoryObj } from '@storybook/react'
import { Slide05_Charity } from '@/components/slides/Slide05_Charity'

const meta: Meta<typeof Slide05_Charity> = {
  title: 'Slides/05 Charity Tour',
  component: Slide05_Charity,
  parameters: { layout: 'fullscreen', backgrounds: { default: 'dark' } },
}

export default meta
type Story = StoryObj<typeof Slide05_Charity>
export const Default: Story = {}
