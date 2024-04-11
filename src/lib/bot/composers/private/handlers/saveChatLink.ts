import { PrivateContext } from '../../../types';
import { SettingsStorage } from '../../../../../app';

export function saveChatLink(ctx: PrivateContext) {
  const link = ctx.message!.text!.split(' ')[1];

  if (!link || !link.length) {
    return ctx.reply('Инструкция команды setChatLink:\n<code>/setChatLink *ссылка*</code>', {
      parse_mode: 'HTML',
    })
  }

  SettingsStorage.saveChatLink(link);
  return ctx.reply(`Ссылка сохранена. Предпросмотр:\n${link}`);
}