export interface NoticeSummary {
  id: number;
  title: string;
  isImportant: boolean;
  viewCount: number;
  createdAt: string;
}

export interface NoticeDetail extends NoticeSummary {
  content: string;
}

export interface QnaPostSummary {
  id: number;
  inquirer: string;
  title: string;
  isAnswer: boolean;
  updatedAt: string;
}

export interface QnaPostDetail {
  id: number;
  inquirer: string;
  title: string;
  content: string;
  answer: string | null;
  answerAt: string | null;
  updatedAt: string;
}
