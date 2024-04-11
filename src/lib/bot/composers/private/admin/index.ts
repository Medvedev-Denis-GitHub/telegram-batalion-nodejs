import { Router } from '@grammyjs/router';
import { PrivateContext, UserFlow } from '../../../types';
import { AnswersStorage, QuestionStorage, SettingsStorage } from '../../../../../app';
import { needSendChatLinkMw } from '../middlewares/needSendChatLinkMw';
import { messageTextHandler } from '../handlers/messageTextHandler';

const saveChatLink = (ctx: PrivateContext) => {
  const message = ctx.message?.text;
  if (!message) return ctx.reply('Отправьте ссылку текстом.');

  SettingsStorage.saveChatLink(message);
  ctx.session.flow = UserFlow.NONE;

  return ctx.reply('Ссылка сохранена.');
}

const saveQuestion = (ctx: PrivateContext) => {
  const message = ctx.message?.text;
  if (!message) return ctx.reply('Отправьте вопрос текстом.');

  QuestionStorage.save(message);
  return ctx.reply('Вопрос сохранён. Отправьте следующий ВОПРОС или нажмите /start.');
}

const saveAnswer = (ctx: PrivateContext) => {
  const message = ctx.message?.text;
  if (!message) return ctx.reply('Отправьте ОТВЕТ текстом.');

  AnswersStorage.save(message);
  return ctx.reply('Ответ сохранён. Отправьте следующий ОТВЕТ или нажмите /start.');
}

export const flowRouter = new Router<PrivateContext>(ctx => ctx.session.flow);

flowRouter.route(UserFlow.NONE).on('message:text', needSendChatLinkMw, messageTextHandler);
flowRouter.route(UserFlow.SEND_CHAT_LINK, saveChatLink);
flowRouter.route(UserFlow.SEND_QUESTION, saveQuestion);
flowRouter.route(UserFlow.SEND_ANSWER, saveAnswer);
