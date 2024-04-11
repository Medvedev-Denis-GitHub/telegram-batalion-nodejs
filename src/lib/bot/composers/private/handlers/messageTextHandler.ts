import { PrivateContext } from '../../../types';
import { AnswersStorage, QuestionStorage } from '../../../../../app';

export async function messageTextHandler(ctx: PrivateContext) {
  const answer = AnswersStorage.getRandomAnswer();
  const question = QuestionStorage.getRandomQuestion();

  ctx.session.completedQuestions += 1;

  await ctx.reply(answer);
  return ctx.reply(question);
}
