// Storybook이 meta/Story 타입을 이 프레임워크(Next.js + Vite) 조합에 맞게 추론하도록 가져온다.
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// 스토리를 작성할 대상 컴포넌트를 가져온다.
import { ErrorState } from './ErrorState';

// meta는 이 파일에 있는 모든 스토리가 공통으로 물려받는 설정이다.
const meta = {
  // 좌측 사이드바에 표시될 경로. 실제 폴더 구조(shared/ui)를 그대로 반영했다.
  title: 'shared/ui/ErrorState',
  // 이 스토리 파일이 다루는 대상 컴포넌트.
  component: ErrorState,
  // 캔버스 중앙에 컴포넌트를 정렬해서 보여준다 (기본값은 좌측 상단 정렬).
  parameters: { layout: 'centered' },
  // 이 태그가 있으면 Storybook이 아래 스토리들을 기반으로 Docs(자동 문서) 탭을 생성해준다.
  tags: ['autodocs'],
  // 하단 Controls 패널에서 각 prop을 어떤 입력 UI로 조작할지 정의한다.
  argTypes: {
    // icon은 ICON_MAP에 실제로 존재하는 키만 드롭다운으로 고를 수 있게 제한한다.
    icon: { control: 'select', options: [undefined, 'error', 'network'] },
  },
  // meta 객체가 Meta<typeof ErrorState> 타입 형태를 만족하는지 컴파일 타임에 검사한다.
} satisfies Meta<typeof ErrorState>;

// Storybook은 이 default export를 보고서야 이 파일을 "스토리 파일"로 인식한다.
export default meta;
// 이 파일 안의 모든 Story가 공유할 타입 별칭. meta의 타입 정보를 그대로 물려받는다.
type Story = StoryObj<typeof meta>;

// 가장 기본 상태. 아이콘도, 재시도/돌아가기 버튼도 없이 문구만 — 페이지 안 작은 영역에 끼워 넣을 때.
export const Default: Story = {};

// 아이콘까지 포함한, 페이지 전체를 대체하는 형태(Next.js error.tsx에서 주로 쓰는 모양).
export const WithIcon: Story = {
  args: {
    icon: 'error',
    message: '상품 정보를 불러오지 못했습니다.',
  },
};

// 네트워크 문제임을 아이콘으로 구분해서 보여주고 싶을 때.
export const NetworkIcon: Story = {
  args: {
    icon: 'network',
    message: '네트워크 연결을 확인해주세요.',
  },
};

// 재시도 버튼만 있는 경우 — 목록으로 못 돌아가고 그 자리에서 다시 시도해야 하는 상황.
export const WithRetry: Story = {
  args: {
    icon: 'error',
    message: '판매자 정보를 불러오는데 실패했습니다.',
    onRetry: () => alert('다시 시도'),
  },
};

// 재시도 + 돌아가기 버튼이 모두 있는, 가장 완전한 형태.
export const Full: Story = {
  args: {
    icon: 'error',
    message: '상품 정보를 불러오지 못했습니다.',
    description: '잠시 후 다시 시도해주세요.',
    onRetry: () => alert('다시 시도'),
    backHref: '#',
  },
};
