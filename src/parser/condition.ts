import { ElasticTokenEnum } from './enum';

export abstract class Condition {
  private readonly key: string;
  private readonly value: any;

  constructor(key: string, value: any) {
    this.key = key;
    this.value = value;
  }

  /* This is a method that is abstract and returns an object. */
  abstract getCondition(): object;

  /**
   * Return the key of the current node
   * @returns The key of the object.
   */
  public getKey() {
    return this.key;
  }

  /**
   * Return the value of the variable
   * @returns The value of the question.
   */
  public getValue() {
    return this.value;
  }
}
