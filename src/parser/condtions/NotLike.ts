import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class NotLike extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  public getCondition(): object {
    return {
      [ElasticTokenEnum.MATCH]: {
        [this.getKey()]: this.getValue(),
      },
    };
  }
}
