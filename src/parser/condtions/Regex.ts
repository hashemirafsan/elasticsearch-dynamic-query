import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Regex extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  /**
   * It returns an object that represents the condition that will be used in the query.
   * @returns The condition object.
   */
  public getCondition(): object {
    return {
      [ElasticTokenEnum.REGEXP]: {
        [this.getKey()]: {
          value: this.getValue(),
          flags: 'ALL',
        },
      },
    };
  }
}
