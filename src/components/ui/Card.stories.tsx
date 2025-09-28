import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card, CardHeader, CardContent } from './Card'

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
}
export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className='w-80'>
      <CardHeader>
        <h3 className='font-bold'>Kart Başlığı</h3>
      </CardHeader>
      <CardContent>
        <p>Bu bir örnek kart içeriğidir.</p>
      </CardContent>
    </Card>
  ),
}
