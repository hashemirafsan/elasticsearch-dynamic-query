import { ParserItem } from './type';


export interface IRangeCondition {
    $lt?: string | number;
    $lte?: string | number;
    $gt?: string | number;
    $gte?: string | number;
}
export interface IParserCondition extends IRangeCondition {
  $eq?: any;
  $neq?: any;
  $in?: string[] | number[];
  $nin?: string[] | number[];
  $like?: any;
  $nlike?: any;
  $between?: IRangeCondition
}

export interface Command {
  [T: string]: ParserItem;
}
