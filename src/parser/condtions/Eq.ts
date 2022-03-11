import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Eq extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  public getCondition(): object {
    return {
      [ElasticTokenEnum.TERM]: {
        [this.getKey()]: this.getValue(),
      },
    };
  }
}
