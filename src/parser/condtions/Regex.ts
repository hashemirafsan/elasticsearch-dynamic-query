import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';

export class Regex extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

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
