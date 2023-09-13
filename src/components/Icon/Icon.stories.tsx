import { Meta, StoryObj } from '@storybook/react';
import Icon from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Component/Icon',
  component: Icon,
  argTypes: {
    size: {
      defaultValue: 16,
      control: { type: 'range', min: 8, max: 30 }
    },
    color: {
      control: { type: 'color' }
    }
  },
  decorators: [
    (Story) => (
      <div className="flex h-[30px] w-[30px] items-center justify-center bg-neutral-100">
        <Story />
      </div>
    )
  ]
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  render: (args) => <Icon {...args} />
};