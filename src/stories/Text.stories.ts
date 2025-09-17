import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../components';

const meta = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'body', 'caption'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'muted'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
};

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'This is body text',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary colored text',
  },
};

export const Muted: Story = {
  args: {
    color: 'muted',
    children: 'Muted text',
  },
};