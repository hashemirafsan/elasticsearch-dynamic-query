import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Lt extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  /**
   * It returns a condition object that can be used in a query.
   * @returns The condition object.
   */
  public getCondition(): object {
    return {
      [ElasticTokenEnum.RANGE]: {
        [this.getKey()]: {
          lt: this.getValue(),
        },
      },
    };
  }
}
