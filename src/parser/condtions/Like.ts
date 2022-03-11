import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Like extends Condition {
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
