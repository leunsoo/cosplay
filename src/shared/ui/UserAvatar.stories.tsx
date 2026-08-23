// Storybook이 meta/Story 타입을 이 프레임워크(Next.js + Vite) 조합에 맞게 추론하도록 가져온다.
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// 스토리를 작성할 대상 컴포넌트를 가져온다.
import { UserAvatar } from './UserAvatar';

// meta는 이 파일에 있는 모든 스토리가 공통으로 물려받는 설정이다.
const meta = {
  // 좌측 사이드바에 표시될 경로. 실제 폴더 구조(shared/ui)를 그대로 반영했다.
  title: 'shared/ui/UserAvatar',
  // 이 스토리 파일이 다루는 대상 컴포넌트.
  component: UserAvatar,
  // 캔버스 중앙에 컴포넌트를 정렬해서 보여준다 (기본값은 좌측 상단 정렬).
  parameters: { layout: 'centered' },
  // 이 태그가 있으면 Storybook이 아래 스토리들을 기반으로 Docs(자동 문서) 탭을 생성해준다.
  tags: ['autodocs'],
  // 하단 Controls 패널에서 각 prop을 어떤 입력 UI로 조작할지 정의한다.
  argTypes: {
    // size는 드롭다운(select)으로 조작하고, 선택 가능한 값은 이 4개뿐이라고 명시한다.
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    // shape도 드롭다운으로, SHAPE_MAP에 실제로 존재하는 두 값(circle/rectangle)만 나열한다.
    shape: { control: 'select', options: ['circle', 'rectangle'] },
  },
  // 이 파일의 모든 스토리가 공유하는 기본 props. 각 Story는 이 값을 물려받고 필요한 부분만 덮어쓴다.
  args: {
    // 기본값을 "이미지 없음" 상태로 둬서, Default 스토리가 곧 fallback 상태를 보여주게 한다.
    avatarUrl: null,
  },
  // meta 객체가 Meta<typeof UserAvatar> 타입 형태를 만족하는지 컴파일 타임에 검사한다.
} satisfies Meta<typeof UserAvatar>;

// Storybook은 이 default export를 보고서야 이 파일을 "스토리 파일"로 인식한다.
export default meta;
// 이 파일 안의 모든 Story가 공유할 타입 별칭. meta의 타입 정보를 그대로 물려받는다.
type Story = StoryObj<typeof meta>;

// 가장 기본 상태. args를 따로 안 줬으니 meta.args(avatarUrl: null)를 그대로 쓴다 → fallback 아이콘이 보인다.
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

export const WithInitial: Story = {
  args: { name: '김철수' },
};
