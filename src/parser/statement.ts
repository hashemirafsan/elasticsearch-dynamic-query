import { Condition } from './condition';
import { Eq } from './condtions/Eq';
import { In } from './condtions/In';
import { Like } from './condtions/Like';
import { Lt } from './condtions/Lt';
import { Neq } from './condtions/Neq';
import { NotIn } from './condtions/NotIn';
import { NotLike } from './condtions/NotLike';
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

  public getKey(): string {
    return this.key;
  }

  public getType(): DataTypeEnum {
    return this.data.type;
  }

  public getConditions() {
    return this.condtions;
  }

  private build() {
    Object.keys(this.data.conditions).forEach((key) => {
      switch (key) {
          case '$eq':
              this.setEqCondition()
              break;
          case '$neq':
              this.setNotEqCondition();
              break;
          case '$like':
              this.setLikeCondition();
              break;
          case '$nlike':
              this.setNotLikeCondition()
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
          default:
              break;
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

  private setInCondition() {
      this.condtions.push(new In(this.getKey(), this.data.conditions.$in));
  }

  private setNotInCondition() {
      this.condtions.push(new NotIn(this.getKey(), this.data.conditions.$nin));
  }

  private setLtCondition() {
      this.condtions.push(new Lt(this.getKey(), this.data.conditions.$lt));
  }
}
