import { DataTypeError } from '../exceptions/DataTypeError';
import { EmptyConditionError } from '../exceptions/EmptyConditionError';
import { UnknownConditionError } from '../exceptions/UnknownConditionError';
import { Condition } from './condition';
import { Between, Eq, Exists, Gt, Gte, In, Like, Lt, Lte, Neq, NotIn, NotLike, Regex } from './condtions/_index';
import { DataTypeEnum } from './enum';
import { IParserCondition } from './interface';
import { ParserItem } from './type';

export class Statement {
  private key: string;
  private data: ParserItem;
  private condtions: Condition[] = [];

  constructor(key: string, data: ParserItem) {
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
  private build() {
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
        default:
          throw new UnknownConditionError(`${conditionKey} is not valid conditional operator under ${this.getKey()}!`);
      }
    });
  }

  /**
   * If the data type is ID or Number, then add an Eq condition to the conditions array. If the data
   * type is Text, then add a Like condition to the conditions array
   */
  private setEqCondition() {
    if (this.getType() === DataTypeEnum.ID || this.getType() === DataTypeEnum.NUMBER) {
      this.condtions.push(new Eq(this.getKey(), this.data.conditions.$eq));
    }

    if (this.getType() === DataTypeEnum.TEXT) {
      this.setLikeCondition(this.data.conditions.$eq);
    }
  }

  /**
   * If the data type is ID or Number, then add a new Neq condition to the conditions array. If the
   * data type is Text, then add a new NotLike condition to the conditions array
   */
  private setNotEqCondition() {
    if (this.getType() === DataTypeEnum.ID || this.getType() === DataTypeEnum.NUMBER) {
      this.condtions.push(new Neq(this.getKey(), this.data.conditions.$neq));
    }

    if (this.getType() === DataTypeEnum.TEXT) {
      this.setNotLikeCondition(this.data.conditions.$neq);
    }
  }

  /**
   * It adds a new condition to the list of conditions.
   * @param {IParserCondition} [data] - The data object that is passed to the condition.
   */
  private setLikeCondition(data?: IParserCondition) {
    this.condtions.push(new Like(this.getKey(), data ?? this.data.conditions.$like));
  }

  /**
   * It adds a not like condition to the list of conditions.
   * @param {IParserCondition} [data] - The data object that is passed to the condition.
   */
  private setNotLikeCondition(data?: IParserCondition) {
    this.condtions.push(new NotLike(this.getKey(), data ?? this.data.conditions.$nlike));
  }

  /**
   * It adds a new condition to the conditions array.
   */
  private setInCondition() {
    if (this.getType() !== DataTypeEnum.ARRAY || ! Array.isArray(this.data.conditions.$in)) {
        throw new DataTypeError(`field:${this.getKey()} data type should by array!`)
    }
    this.condtions.push(new In(this.getKey(), this.data.conditions.$in));
  }

  /**
   * It adds a NotIn condition to the conditions array.
   */
  private setNotInCondition() {
    this.condtions.push(new NotIn(this.getKey(), this.data.conditions.$nin));
  }

  /**
   * It sets the  condition.
   */
  private setLtCondition() {
    this.condtions.push(new Lt(this.getKey(), this.data.conditions.$lt));
  }

  /**
   * It adds a new condition to the list of conditions.
   */
  private setLteCondition() {
    this.condtions.push(new Lte(this.getKey(), this.data.conditions.$lte));
  }

  /**
   * It adds a greater than condition to the list of conditions.
   */
  private setGtCondition() {
    this.condtions.push(new Gt(this.getKey(), this.data.conditions.$gt));
  }

  /**
   * It adds a greater than or equal to condition to the list of conditions.
   */
  private setGteCondition() {
    this.condtions.push(new Gte(this.getKey(), this.data.conditions.$gte));
  }

  /**
   * It adds a Between condition to the conditions array.
   */
  private setBetweenCondition() {
    this.condtions.push(new Between(this.getKey(), this.data.conditions.$between));
  }

  /**
   * It sets the exists condition.
   */
  private setExistsCondition() {
    this.condtions.push(new Exists(this.getKey(), this.data.conditions.$exists));
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
}
