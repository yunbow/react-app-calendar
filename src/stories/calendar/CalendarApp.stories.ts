import type { Meta, StoryObj } from '@storybook/react';
import { CalendarApp } from '../../features/calendar/CalendarApp';

const meta = {
  title: 'Features/Calendar/CalendarApp',
  component: CalendarApp,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CalendarApp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};