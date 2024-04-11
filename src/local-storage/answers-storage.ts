import fs from 'fs';
import { resolve } from 'path';

export interface AnswersStorageData {
  answers: string[],
}

export class AnswersStorageManager {
  private readonly filename = 'answers-storage.json';
  private readonly filePath = resolve(process.cwd(), `data/${this.filename}`);

  constructor() {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(
        `data/${this.filename}`, JSON.stringify({ answers: [] }), 'utf8');
    }
  }

  save(question: string): void {
    const instance = this.get();

    instance.answers.push(question);
    fs.writeFileSync(this.filePath, JSON.stringify(instance));
  }

  getRandomAnswer(): string {
    const answer = this.get().answers;
    const answerIndex = Math.floor(Math.random() * answer.length);

    return answer[answerIndex];
  }

  private get(): AnswersStorageData {
    return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'));
  }
}
