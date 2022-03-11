import { Condition } from './condition';
import { Eq } from './condtions/Eq';
import { Like } from './condtions/Like';
import { Neq } from './condtions/Neq';
import { NotLike } from './condtions/NotLike';
import { DataTypeEnum } from './enum';
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
      if (key === '$eq') {
        if (this.getType() === DataTypeEnum.ID || this.getType() === DataTypeEnum.NUMBER) {
          this.condtions.push(new Eq(this.getKey(), this.data.conditions.$eq));
        }

        if (this.getType() === DataTypeEnum.TEXT) {
          this.condtions.push(new Like(this.getKey(), this.data.conditions.$eq));
        }
      }

      if (key === '$neq') {
          if (this.getType() === DataTypeEnum.ID || this.getType() === DataTypeEnum.NUMBER) {
            this.condtions.push(new Neq(this.getKey(), this.data.conditions.$neq));
          }
  
          if (this.getType() === DataTypeEnum.TEXT) {
            this.condtions.push(new NotLike(this.getKey(), this.data.conditions.$neq));
          }
      }

      if (key === '$like') {
        this.condtions.push(new Like(this.getKey(), this.data.conditions.$like));
      }

      if (key === '$nlike') {
        this.condtions.push(new NotLike(this.getKey(), this.data.conditions.$nlike));
      }
    });
  }
}
