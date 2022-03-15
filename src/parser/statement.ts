import { DataTypeError } from '../exceptions/DataTypeError';
import { EmptyConditionError } from '../exceptions/EmptyConditionError';
import { UnknownConditionError } from '../exceptions/UnknownConditionError';
import { Condition } from './condition';
import { Or } from './condtions/Or';
import { Between, Eq, Exists, Gt, Gte, In, Like, Lt, Lte, Neq, NotIn, NotLike, Regex } from './condtions/_index';
import { DataTypeEnum } from './enum';
import { IParserCondition, IParserItem } from './interface';

export class Statement {
  private key: string;
  private data: IParserItem;
  private condtions: Condition[] = [];

  constructor(key: string, data: IParserItem) {
    this.key = key;
    this.data = data;

    this.build();
  }

  /**
   * Get the key of the current node
   * @returns The key of the object.
   */
  public getKey(): string {
    return this.key;
  }

  /**
   * Get the type of the data
   * @returns The type of the question.
   */
  public getType(): DataTypeEnum {
    return this.data.type;
  }

  /**
   * Get the conditions of the current state
   * @returns The getConditions method returns the condtions array.
   */
  public getConditions() {
    return this.condtions;
  }

  /**
   * For each key in the conditions object, check the key and call the appropriate function
   */
  private build(): void {
    const conditionKVs = Object.keys(this.data.conditions);
    if (! conditionKVs.length) {
        throw new EmptyConditionError(`${this.getKey()} has no valid conditions!`)
    }

    conditionKVs.forEach((conditionKey) => {
      switch (conditionKey) {
        case '$eq':
          this.setEqCondition();
          break;
        case '$neq':
          this.setNotEqCondition();
          break;
        case '$like':
          this.setLikeCondition();
          break;
        case '$nlike':
          this.setNotLikeCondition();
          break;
        case '$in':
          this.setInCondition();
          break;
        case '$nin':
          this.setNotInCondition();
          break;
        case '$lt':
          this.setLtCondition();
          break;
        case '$lte':
          this.setLteCondition();
          break;
        case '$gt':
          this.setGtCondition();
          break;
        case '$gte':
          this.setGteCondition();
          break;
        case '$between':
          this.setBetweenCondition();
          break;
        case '$exists':
          this.setExistsCondition();
          break;
        case '$regex':
          this.setRegexCondition();
          break;
        case '$or':
          this.setOrCondition();
          break;  
        default:
          throw new UnknownConditionError(`${conditionKey} is not valid conditional operator under ${this.getKey()}!`);
      }
    });
  }

  /**
   * It returns an Eq object with the key and data.
   * @param {any} [data] - The data to be used in the condition.
   * @returns An instance of the Eq class.
   */
  private getEqCondition(data?: any) {
      return new Eq(this.getKey(), data);
  }
  
  /**
   * If the data type is ID or Number, then add an Eq condition to the conditions array. If the data
   * type is Text, then add a Like condition to the conditions array
   */
  private setEqCondition() {
    if ([DataTypeEnum.ID, DataTypeEnum.NUMBER, DataTypeEnum.BOOLEAN].includes(this.getType())) {
      this.setCondition(this.getEqCondition(this.data.conditions.$eq));
    }

    if (this.getType() === DataTypeEnum.TEXT) {
      this.setLikeCondition(this.data.conditions.$eq);
    }
  }

  /**
   * It creates a new instance of the Neq class.
   * @param {any} [data] - The data to compare to.
   * @returns A Neq object.
   */
  private getNotEqCondition(data?: any) {
    return new Neq(this.getKey(), data);
  }

  /**
   * If the data type is ID or Number, then add a new Neq condition to the conditions array. If the
   * data type is Text, then add a new NotLike condition to the conditions array
   */
  private setNotEqCondition() {
    if ([DataTypeEnum.ID, DataTypeEnum.NUMBER, DataTypeEnum.BOOLEAN].includes(this.getType())) {
      this.condtions.push(new Neq(this.getKey(), this.data.conditions.$neq));
    }

    if (this.getType() === DataTypeEnum.TEXT) {
      this.setNotLikeCondition(this.data.conditions.$neq);
    }
  }

  /**
   * It creates a Like object with the key and data.
   * @param {any} data - The data to be used in the LIKE condition.
   * @returns The Like object.
   */
  private getLikeCondition(data: any) {
    return new Like(this.getKey(), data);
  }

  /**
   * It adds a new condition to the list of conditions.
   * @param {IParserCondition} [data] - The data object that is passed to the condition.
   */
  private setLikeCondition(data?: IParserCondition) {
    const like = this.getLikeCondition(data ?? this.data.conditions.$like);
    this.setCondition(like);
  }

  /**
   * It creates a NotLike condition.
   * @param {any} data - The data to be compared with the column value.
   * @returns The NotLike class.
   */
  private getNotLikeCondition(data: any) {
    return new NotLike(this.getKey(), data);
  }

  /**
   * It adds a not like condition to the list of conditions.
   * @param {IParserCondition} [data] - The data object that is passed to the condition.
   */
  private setNotLikeCondition(data?: IParserCondition) {
    const notLike = this.getNotLikeCondition(data ?? this.data.conditions.$nlike);
    this.setCondition(notLike);
  }
 
  /**
   * Given a data object, return a new In condition
   * @param {any} data - any
   * @returns An instance of the In class.
   */
  private getInCondition(data: any) {
    return new In(this.getKey(), data);
  }

  /**
   * It adds a new condition to the conditions array.
   */
  private setInCondition() {
    if (this.getType() !== DataTypeEnum.ARRAY || ! Array.isArray(this.data.conditions.$in)) {
        throw new DataTypeError(`field:${this.getKey()} data type should by array!`)
    }
    const inCondition = this.getInCondition(this.data.conditions.$in);
    this.setCondition(inCondition);
  }

  /**
   * It creates a NotIn condition.
   * @param {any} data - any
   * @returns A NotIn object.
   */
  private getNotInCondition(data: any) {
    return new NotIn(this.getKey(), data);
  }

  /**
   * It adds a NotIn condition to the conditions array.
   */
  private setNotInCondition() {
    const notIn = this.getNotInCondition(this.data.conditions.$nin);
    this.setCondition(notIn);
  }

  /**
   * It creates a Lt object.
   * @param {any} data - The data to be compared with the key.
   * @returns An Lt object.
   */
  private getLtCondition(data: any) {
    return new Lt(this.getKey(), data);
  }

  /**
   * It sets the  condition.
   */
  private setLtCondition() {
    const lt = this.getLtCondition(this.data.conditions.$lt);
    this.setCondition(lt);
  }

  /**
   * It creates a new Lte object.
   * @param {any} data - The data to be compared against.
   * @returns The Lte class.
   */
  private getLteCondition(data: any) {
    return new Lte(this.getKey(), data);
  }

  /**
   * It adds a new condition to the list of conditions.
   */
  private setLteCondition() {
    const lte = this.getLteCondition(this.data.conditions.$lte)
    this.setCondition(lte);
  }

  /**
   * It creates a new Gt object.
   * @param {any} data - The data to compare to.
   * @returns The Gt class.
   */
  private getGtCondition(data: any) {
    return new Gt(this.getKey(), data);
  }

  /**
   * It adds a greater than condition to the list of conditions.
   */
  private setGtCondition() {
    const gt = this.getGtCondition(this.data.conditions.$gt)
    this.setCondition(gt);
  }

  /**
   * It creates a new Gte object.
   * @param {any} data - The data to be compared against.
   * @returns The Gte class.
   */
  private getGteCondition(data: any) {
    return new Gte(this.getKey(), data);
  }

  /**
   * It adds a greater than or equal to condition to the list of conditions.
   */
  private setGteCondition() {
    const gte = this.getGteCondition(this.data.conditions.$gte)
    this.setCondition(gte);
  }

  /**
   * It returns a Between object.
   * @param {any} data - The data to be used in the condition.
   * @returns An instance of the Between class.
   */
  private getBetweenCondition(data: any) {
    return new Between(this.getKey(), data)
  }

  /**
   * It adds a Between condition to the conditions array.
   */
  private setBetweenCondition() {
    const between = this.getBetweenCondition(this.data.conditions.$between);
    this.setCondition(between);
  }

  /**
   * Given a data object, return a condition that checks if the key exists in the data object
   * @param {any} data - The data to be used in the condition.
   * @returns An Exists object.
   */
  private getExistsCondition(data: any) {
    return new Exists(this.getKey(), data)
  }

  /**
   * It sets the exists condition.
   */
  private setExistsCondition() {
    const exists = this.getExistsCondition(this.data.conditions.$exists);
    this.setCondition(exists);
  }

  /**
   * Add a condition to the list of conditions
   * @param {any} data - any
   */
  private setCondition(data: any) {
    this.condtions.push(data);
  }

  /**
   * If the field is not a text field, throw an error. Otherwise, add a new Regex condition to the
   * conditions array
   */
  private setRegexCondition() {
    if (this.getType() !== DataTypeEnum.TEXT) {
      throw new Error('Regex can perform only TEXT and Keywords field!');
    }

    this.condtions.push(new Regex(this.getKey(), this.data.conditions.$regex));
  }

  /**
   * It creates an Or condition.
   * @param {any} data - The data to be used in the condition.
   * @returns An Or object.
   */
  private getOrCondition(data: any) {
      return new Or(this.getKey(), data);
  }

  /**
   * - If the field has no conditions, throw an error.
   * - If the field has a condition, set the condition.
   * - If the field has an or condition, set the or condition
   */
  private setOrCondition() {
    const conditionKVs = Object.keys(this.data.conditions.$or ?? []);
    if (! conditionKVs.length) {
        throw new EmptyConditionError(`${this.getKey()} has no valid conditions!`)
    }

    conditionKVs.forEach((conditionKey) => {
      let condition = null;

      if (conditionKey === '$eq') {
        if ([DataTypeEnum.ID, DataTypeEnum.NUMBER, DataTypeEnum.BOOLEAN].includes(this.getType())) {
            condition = this.getEqCondition(this.data.conditions.$or?.$eq)
        }
    
        if (this.getType() === DataTypeEnum.TEXT) {
            condition = this.getLikeCondition(this.data.conditions.$or?.$eq)
        }
      }

      if (conditionKey === '$neq') {
        if ([DataTypeEnum.ID, DataTypeEnum.NUMBER, DataTypeEnum.BOOLEAN].includes(this.getType())) {
            condition = this.getNotEqCondition(this.data.conditions.$or?.$eq)
        }
    
        if (this.getType() === DataTypeEnum.TEXT) {
            condition = this.getNotLikeCondition(this.data.conditions.$or?.$eq);
        }
      }

      if (conditionKey === '$like') {
        condition = this.getLikeCondition(this.data.conditions.$or?.$like)
      }

      if (conditionKey === '$nlike') {
        condition = this.getNotLikeCondition(this.data.conditions.$or?.$nlike)
      }

      if (conditionKey === '$in') {
        if (this.getType() !== DataTypeEnum.ARRAY || ! Array.isArray(this.data.conditions.$or?.$in)) {
            throw new DataTypeError(`field:${this.getKey()} data type should by array!`)
        }
        condition = this.getInCondition(this.data.conditions.$or?.$in)
      }

      if (conditionKey === '$nin') {
        if (this.getType() !== DataTypeEnum.ARRAY || ! Array.isArray(this.data.conditions.$or?.$in)) {
            throw new DataTypeError(`field:${this.getKey()} data type should by array!`)
        }
        condition = this.getNotInCondition(this.data.conditions.$or?.$nin)
      }

      if (conditionKey === '$lt') {
          condition = this.getLtCondition(this.data.conditions.$or?.$lt);
      }

      if (conditionKey === '$lte') {
        condition = this.getLteCondition(this.data.conditions.$or?.$lte); 
      }

      if (conditionKey === '$gt') {
        condition = this.getGtCondition(this.data.conditions.$or?.$gt);
      }

      if (conditionKey === '$gte') {
        condition = this.getGteCondition(this.data.conditions.$or?.$gte);
      }

      if (conditionKey === '$between') {
        condition = this.getBetweenCondition(this.data.conditions.$or?.$between);
      }

      this.setCondition(this.getOrCondition(condition));
    });
  }
}
