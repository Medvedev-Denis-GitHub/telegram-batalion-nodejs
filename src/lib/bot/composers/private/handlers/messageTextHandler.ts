import { PrivateContext } from '../../../types';
import { QuestionStorage } from '../../../../../app';

export async function messageTextHandler(ctx: PrivateContext) {
  const question = QuestionStorage.getRandomQuestion();

  ctx.session.completedQuestions += 1;
  return ctx.reply(question);
}
