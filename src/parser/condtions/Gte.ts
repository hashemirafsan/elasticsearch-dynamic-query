import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Gte extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  public getCondition(): object {
    return {
      [ElasticTokenEnum.RANGE]: {
        [this.getKey()]: {
          gte: this.getValue(),
        }
      },
    };
  }
}
