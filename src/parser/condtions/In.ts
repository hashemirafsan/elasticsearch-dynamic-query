import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class In extends Condition {
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
