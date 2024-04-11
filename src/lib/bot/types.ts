import { ChatTypeContext, Context, SessionFlavor } from 'grammy';

export enum UserFlow {
  NONE = 'none',
  SEND_CHAT_LINK = 'send_chat_link',
  SEND_ANSWER = 'send_answer',
  SEND_QUESTION = 'send_question',
}

export interface PrivateSessionData {
  completedQuestions: number;

  flow: UserFlow;
}

export type PrivateContext = ChatTypeContext<Context, 'private'> &
  SessionFlavor<PrivateSessionData>;