import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Skeleton } from './Skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: "İskelete ek Tailwind class'ları ekler.",
    },
  },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Default: Story = {
  args: {
    className: 'h-4 w-64',
  },
}

export const CardSkeletonExample: Story = {
  name: 'Card Skeleton (Example)',
  render: () => (
    <div className='flex flex-col space-y-3 p-4 border rounded-md max-w-sm'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
      <Skeleton className='h-12 w-full' />
      <div className='flex justify-end pt-2'>
        <Skeleton className='h-8 w-[100px]' />
      </div>
    </div>
  ),
}

export const AvatarAndTextSkeleton: Story = {
  name: 'Avatar & Text (Example)',
  render: () => (
    <div className='flex items-center space-x-4 p-4 border rounded-md max-w-sm'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[250px]' />
        <Skeleton className='h-4 w-[200px]' />
      </div>
    </div>
  ),
}
