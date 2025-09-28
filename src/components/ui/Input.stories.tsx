import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Lütfen adınızı girin...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Şifrenizi girin...',
  },
}

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Bu alan kullanılamaz',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    type: 'text',
    defaultValue: 'Önceden doldurulmuş veri',
  },
}
