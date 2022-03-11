import { DataTypeEnum } from './enum';
import { IParserCondition } from './interface';

export type ParserItem = {
  type: DataTypeEnum;
  conditions: IParserCondition;
};
