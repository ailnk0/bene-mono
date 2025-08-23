import type { Meta, StoryObj } from '@storybook/react-vite';
import { Mail } from 'lucide-react';
import { fn } from 'storybook/test';

import { Button } from '@workspace/ui/components/button';

const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: { control: 'text', description: 'Button' },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
    disabled: { control: 'boolean' },
    asChild: { control: 'boolean' },
    onClick: { action: 'clicked', type: 'function' },
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/* 기본 */
export const Default: Story = {
  args: { variant: 'default', children: 'Button' },
};

/* 변형(Variant) */
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Outline' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Ghost' },
};

export const Link: Story = {
  args: { variant: 'link', children: 'Link' },
};

/* 크기(Size) */
export const Small: Story = {
  args: { size: 'sm', children: 'Small' },
};

export const Large: Story = {
  args: { size: 'lg', children: 'Large' },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: <Mail className="h-4 w-4" />,
    'aria-label': 'Mail',
  },
};

/* 아이콘 + 텍스트 */
export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <span className="inline-flex items-center gap-2">
        <Mail key="icon" className="h-4 w-4" />
        Send Email
      </span>
    </Button>
  ),
};

/* asChild 예시 (a 태그 등으로 감싸기) */
export const AsChildLink: Story = {
  args: {
    asChild: true,
  },
  render: (args) => (
    <Button {...args}>
      <a href="/#" rel="noreferrer" className="no-underline">
        Visit
      </a>
    </Button>
  ),
};
