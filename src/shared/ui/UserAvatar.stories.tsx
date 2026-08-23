import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { UserAvatar } from './UserAvatar';

const meta = {
  title: 'shared/ui/UserAvatar',
  component: UserAvatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['circle', 'rectangle'] },
  },
  args: {
    avatarUrl: null,
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const Large: Story = {
  args: { size: 'lg' },
};

export const Circle: Story = {
  args: { shape: 'circle' },
};

export const Rectangle: Story = {
  args: { shape: 'rectangle' },
};

// name이 있으면 아이콘 대신 이니셜 텍스트로 fallback한다 (이미지 없음/실패 공통).
export const WithInitial: Story = {
  args: { name: '김철수' },
};
