import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Lte extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  public getCondition(): object {
    return {
      [ElasticTokenEnum.RANGE]: {
        [this.getKey()]: {
          lte: this.getValue(),
        }
      },
    };
  }
}
