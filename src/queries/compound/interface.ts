import { ElasticOccurEnum } from './enum';

/* Defining the structure of the object. */
export interface IBoolQuery {
  [ElasticOccurEnum.MUST]?: any[];
  [ElasticOccurEnum.MUST_NOT]?: any[];
  [ElasticOccurEnum.SHOULD]?: any[];
  [ElasticOccurEnum.FILTER]?: any[];
}
