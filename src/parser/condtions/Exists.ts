import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Exists extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  public getCondition(): object {
    return {
      [ElasticTokenEnum.EXISTS]: {
        field: this.getKey(),
      },
    };
  }
}
