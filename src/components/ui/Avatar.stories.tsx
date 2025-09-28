import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],

  argTypes: {
    fallback: {
      control: 'text',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  args: {
    fallback: 'AK',
  },
}

export const SingleInitial: Story = {
  args: {
    fallback: 'G',
  },
}

export const LongFallback: Story = {
  args: {
    fallback: 'UZUN',
  },
}
