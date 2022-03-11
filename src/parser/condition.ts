import { ElasticTokenEnum } from './enum';

export abstract class Condition {
  private readonly key: string;
  private readonly value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }

  abstract getCondition(): object;

  public getKey() {
    return this.key;
  }

  public getValue() {
    return this.value;
  }
}
