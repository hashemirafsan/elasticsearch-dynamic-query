import { Condition } from '../condition';

export class Or extends Condition {
  constructor(key: string, value: any) {
    super(key, value);
  }

  /**
   * It returns an object that represents the condition that will be used in the query.
   * @returns The condition object.
   */
  public getCondition(): object {
    return this.getValue().getCondition();
  }
}
