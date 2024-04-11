import { PrivateContext, UserFlow } from '../../../types';
import { Menu } from '@grammyjs/menu';

export const AdminMenu = new Menu<PrivateContext>('adminMenu')
  .text('Добавить ссылку на вступление', (ctx: PrivateContext) => {
    ctx.session.flow = UserFlow.SEND_CHAT_LINK;
    return ctx.reply('Отправьте новую ссылку.');
  })
  .row()
  .text('Добавить вопросы', (ctx: PrivateContext) => {
    ctx.session.flow = UserFlow.SEND_QUESTION;
    return ctx.reply('Отправьте новую вопрос.');
  })
  .text('Добавить ответ', (ctx: PrivateContext) => {
    ctx.session.flow = UserFlow.SEND_ANSWER;
    return ctx.reply('Отправьте новый ответ.');
  })
  .row()
  .text('Выйти', (ctx: PrivateContext) => {
    ctx.session.flow = UserFlow.NONE;
    return ctx.deleteMessage();
  });