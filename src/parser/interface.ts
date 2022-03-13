import { DataTypeEnum } from './enum';
/* This is a type definition for a range condition. */
export interface IRangeCondition {
  $lt?: string | number;
  $lte?: string | number;
  $gt?: string | number;
  $gte?: string | number;
}

/* It's a type definition for parser condition. */
export interface IParserCondition extends IRangeCondition {
  $eq?: any;
  $neq?: any;
  $in?: string[] | number[];
  $nin?: string[] | number[];
  $like?: any;
  $nlike?: any;
  $exists?: boolean;
  $regex?: string;
  $between?: IRangeCondition;
}

/* It's a type definition for a parser item. */
export interface IParserItem {
  type: DataTypeEnum;
  conditions: IParserCondition;
  $or?: boolean;
}

/* It's a type definition for a command. */
export interface Command {
  [T: string]: IParserItem;
}
