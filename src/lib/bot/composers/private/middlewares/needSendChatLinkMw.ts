import { PrivateContext } from '../../../types';
import { NextFunction } from 'grammy';
import { ADMIN_USERNAME, questionsLimit } from '../../../constants';
import { SettingsStorage } from '../../../../../app';

export async function needSendChatLinkMw(ctx: PrivateContext, next: NextFunction) {
  if (ctx.session.completedQuestions < questionsLimit) return next();

  const chatLink = SettingsStorage.getChatLink();
  if (!chatLink) {
    return ctx.reply(`Ссылка для всупления в чат не указана. Обратитесь к @${ADMIN_USERNAME}`, {
      link_preview_options: { is_disabled: false },
    });
  }

  ctx.session.completedQuestions = 0;
  return ctx.reply(chatLink);
}