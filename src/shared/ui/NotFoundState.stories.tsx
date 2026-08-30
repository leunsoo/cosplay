// Storybook이 meta/Story 타입을 이 프레임워크(Next.js + Vite) 조합에 맞게 추론하도록 가져온다.
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

// 스토리를 작성할 대상 컴포넌트를 가져온다.
import { NotFoundState } from './NotFoundState';

// meta는 이 파일에 있는 모든 스토리가 공통으로 물려받는 설정이다.
const meta = {
  // 좌측 사이드바에 표시될 경로. 실제 폴더 구조(shared/ui)를 그대로 반영했다.
  title: 'shared/ui/NotFoundState',
  // 이 스토리 파일이 다루는 대상 컴포넌트.
  component: NotFoundState,
  // 캔버스 중앙에 컴포넌트를 정렬해서 보여준다 (기본값은 좌측 상단 정렬).
  parameters: { layout: 'centered' },
  // 이 태그가 있으면 Storybook이 아래 스토리들을 기반으로 Docs(자동 문서) 탭을 생성해준다.
  tags: ['autodocs'],
  // 하단 Controls 패널에서 각 prop을 어떤 입력 UI로 조작할지 정의한다.
  argTypes: {
    // icon은 ICON_MAP에 실제로 존재하는 키만 드롭다운으로 고를 수 있게 제한한다.
    icon: { control: 'select', options: [undefined, 'product'] },
  },
  // 이 파일의 모든 스토리가 공유하는 기본 props. 각 Story는 이 값을 물려받고 필요한 부분만 덮어쓴다.
  args: {
    title: '요청하신 내용을 찾을 수 없습니다.',
    backHref: '#',
  },
  // meta 객체가 Meta<typeof NotFoundState> 타입 형태를 만족하는지 컴파일 타임에 검사한다.
} satisfies Meta<typeof NotFoundState>;

// Storybook은 이 default export를 보고서야 이 파일을 "스토리 파일"로 인식한다.
export default meta;
// 이 파일 안의 모든 Story가 공유할 타입 별칭. meta의 타입 정보를 그대로 물려받는다.
type Story = StoryObj<typeof meta>;

// 가장 기본 상태. 아이콘 없이 문구 + 돌아가기 링크만 있는, 어디서나 쓸 수 있는 형태.
export const Default: Story = {};

// 특정 도메인(상품)에 맞는 아이콘을 지정한 경우.
export const WithIcon: Story = {
  args: {
    icon: 'product',
    title: '존재하지 않는 상품입니다.',
  },
};

// 안내 문구를 한 줄 더 붙이고 싶을 때.
export const WithDescription: Story = {
  args: {
    icon: 'product',
    title: '존재하지 않는 상품입니다.',
    description: '삭제되었거나 잘못된 링크일 수 있습니다.',
  },
};

// 돌아가기 링크의 라벨을 상황에 맞게 바꾼 경우.
export const CustomBackLabel: Story = {
  args: {
    title: '게시글을 찾을 수 없습니다',
    backLabel: '게시판으로 돌아가기',
  },
};
