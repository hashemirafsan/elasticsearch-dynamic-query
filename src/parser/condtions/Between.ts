import { Condition } from '../condition';
import { ElasticTokenEnum } from '../enum';
import { IRangeCondition } from '../interface';

interface IBetweenCondtion {
  lt?: any;
  gt?: any;
  lte?: any;
  gte?: any;
}

export class Between extends Condition {
  private conditions: IBetweenCondtion = {};

  constructor(key: string, value: any) {
    super(key, value);

    this.setCondition();
  }

  /**
   * It sets the condition for the filter.
   */
  private setCondition() {
    const value = this.getValue();

    if (value?.$lt) {
      this.conditions.lt = value.$lt;
    }

    if (value?.$gt) {
      this.conditions.gt = value.$gt;
    }

    if (value?.$lte) {
      this.conditions.lte = value.$lte;
    }

    if (value?.$gte) {
      this.conditions.gte = value.$gte;
    }
  }

  /**
   * It returns the condition object for the range query.
   * @returns The condition object.
   */
  public getCondition(): object {
    return {
      [ElasticTokenEnum.RANGE]: {
        [this.getKey()]: this.conditions,
      },
    };
  }
}
