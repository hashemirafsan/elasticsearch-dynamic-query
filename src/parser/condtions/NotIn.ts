import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class NotIn extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  public getCondition(): object {
    return {
      [ElasticTokenEnum.TERMS]: {
        [this.getKey()]: this.getValue(),
      },
    };
  }
}
