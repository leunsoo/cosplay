import type { NoticeSummaryDTO, NoticeDetailDTO } from './schema/noticeSchema';
import type { QnaPostSummaryDTO, QnaPostDetailDTO } from './schema/qnaSchema';
import type {
  NoticeSummary,
  NoticeDetail,
  QnaPostSummary,
  QnaPostDetail,
} from './types';

export function mapNoticeSummaryDTO(dto: NoticeSummaryDTO): NoticeSummary {
  return {
    id: dto.id,
    title: dto.title,
    isImportant: dto.isImportant,
    viewCount: dto.viewCount,
    createdAt: dto.createdAt,
  };
}

export function mapNoticeDetailDTO(dto: NoticeDetailDTO): NoticeDetail {
  return {
    ...mapNoticeSummaryDTO(dto),
    content: dto.content,
  };
}

export function mapQnaPostSummaryDTO(dto: QnaPostSummaryDTO): QnaPostSummary {
  return {
    id: dto.id,
    inquirer: dto.inquirer,
    title: dto.title,
    isAnswer: dto.isAnswer,
    updatedAt: dto.updatedAt,
  };
}

export function mapQnaPostDetailDTO(dto: QnaPostDetailDTO): QnaPostDetail {
  return {
    id: dto.id,
    inquirer: dto.inquirer,
    title: dto.title,
    content: dto.content,
    answer: dto.answer,
    answerAt: dto.answerAt,
    updatedAt: dto.updatedAt,
  };
}
