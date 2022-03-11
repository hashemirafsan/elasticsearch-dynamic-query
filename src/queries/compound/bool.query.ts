import { IBoolQuery } from './interface';

export class BoolQuery {
  private query: IBoolQuery = {};

  public setMustQuery(condition: object) {
    if (!this.query?.must) this.query.must = [];
    this.query.must.push(condition);
  }

  public setMustNotQuery(condition: object) {
    if (!this.query?.must_not) this.query.must_not = [];
    this.query.must_not.push(condition);
  }

  public setShouldQuery(condition: object) {
    if (!this.query?.should) this.query.should = [];
    this.query.should.push(condition);
  }

  public setFilterQuery(condition: object) {
    if (!this.query?.filter) this.query.filter = [];
    this.query.filter.push(condition);
  }

  public getQuery(): IBoolQuery {
    return this.query;
  }
}
