import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Label } from './Label'
import { Input } from './Input'

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Etiketin içinde görünecek metin.',
    },
    htmlFor: {
      control: 'text',
      description: "İlişkilendirilecek input elementinin ID'si.",
    },
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: 'Bu Bir Etikettir',
  },
}

export const WithInput: Story = {
  render: (args) => (
    <div className='flex flex-col space-y-2'>
      <Label {...args} htmlFor='email-input'>
        E-posta Adresiniz
      </Label>
      <Input id='email-input' type='email' placeholder='ornek@mail.com' />
    </div>
  ),
}
