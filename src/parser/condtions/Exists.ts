import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Exists extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  /**
   * It returns an object that represents the condition that the field exists.
   * @returns The condition object.
   */
  public getCondition(): object {
    return {
      [ElasticTokenEnum.EXISTS]: {
        field: this.getKey(),
      },
    };
  }
}
