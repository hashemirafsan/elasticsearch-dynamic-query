import { ParserItem } from './type';

export interface IParserCondition {
  $eq?: any;
  $neq?: any;
  $in?: string[] | number[];
  $nin?: string[] | number[];
  $like?: any;
  $nlike?: any;
  $lt?: string | number;
  $lte?: string | number;
  $gt?: string | number;
  $gte?: string | number;
  $between?: {
    $lt?: string | number;
    $lte?: string | number;
    $gt?: string | number;
    $gte?: string | number;
  }
}

export interface Command {
  [T: string]: ParserItem;
}
