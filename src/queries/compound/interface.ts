import { ElasticOccurEnum } from './enum';

export interface IBoolQuery {
  [ElasticOccurEnum.MUST]?: any[];
  [ElasticOccurEnum.MUST_NOT]?: any[];
  [ElasticOccurEnum.SHOULD]?: any[];
  [ElasticOccurEnum.FILTER]?: any[];
}
