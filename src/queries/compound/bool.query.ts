import { IBoolQuery } from './interface';

export class BoolQuery {
  private query: IBoolQuery = {};

  /**
   * It adds a condition to the query.
   * @param {object} condition - object
   */
  public setMustQuery(condition: object) {
    if (!this.query?.must) this.query.must = [];
    this.query.must.push(condition);
  }

  /**
   * It adds a condition to the must_not array of the query object.
   * @param {object} condition - The condition to add to the must_not array.
   */
  public setMustNotQuery(condition: object) {
    if (!this.query?.must_not) this.query.must_not = [];
    this.query.must_not.push(condition);
  }

  /**
   * It adds a condition to the query.
   * @param {object} condition - The condition to be added to the query.
   */
  public setShouldQuery(condition: object) {
    if (!this.query?.should) this.query.should = [];
    this.query.should.push(condition);
  }

  /**
   * It adds a filter to the query.
   * @param {object} condition - object
   */
  public setFilterQuery(condition: object) {
    if (!this.query?.filter) this.query.filter = [];
    this.query.filter.push(condition);
  }

  /**
   * It returns the query object.
   * @returns The query object.
   */
  public getQuery(): IBoolQuery {
    return this.query;
  }
}
