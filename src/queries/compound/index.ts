import { Or } from '../../parser/condtions/Or';
import { Between, Eq, Exists, Gt, Gte, In, Like, Lt, Lte, Neq, NotIn, NotLike, Regex } from '../../parser/condtions/_index';
import { Statement } from '../../parser/statement';
import { BoolQuery } from './bool.query';
import { CompoundQueryType } from './enum';

export class CompoundQuery {
  private statements: Statement[] = [];
  private type: CompoundQueryType;

  constructor(statements: Statement[], type: CompoundQueryType = CompoundQueryType.BOOL) {
    this.statements = statements;
    this.type = type;
  }

  /**
   * It builds a query for Elasticsearch.
   * @returns The query that will be used to search the index.
   */
  private boolBuildQuery() {
    const boolQuery = new BoolQuery();

    this.statements.forEach((statement) => {
      const conditions = statement.getConditions();
      conditions.forEach((condition) => {
        if (condition instanceof Eq) boolQuery.setMustQuery(condition.getCondition());

        if (condition instanceof Like) boolQuery.setMustQuery(condition.getCondition());

        if (condition instanceof Neq) boolQuery.setMustNotQuery(condition.getCondition());

        if (condition instanceof NotLike) boolQuery.setMustNotQuery(condition.getCondition());

        if (condition instanceof In) boolQuery.setMustQuery(condition.getCondition());

        if (condition instanceof NotIn) boolQuery.setMustNotQuery(condition.getCondition());

        if (condition instanceof Lt) boolQuery.setFilterQuery(condition.getCondition());

        if (condition instanceof Lte) boolQuery.setFilterQuery(condition.getCondition());

        if (condition instanceof Gt) boolQuery.setFilterQuery(condition.getCondition());

        if (condition instanceof Gte) boolQuery.setFilterQuery(condition.getCondition());

        if (condition instanceof Between) boolQuery.setFilterQuery(condition.getCondition());

        if (condition instanceof Exists) {
          condition.getValue()
            ? boolQuery.setMustQuery(condition.getCondition())
            : boolQuery.setMustNotQuery(condition.getCondition());
        }

        // TODO: this is not working
        if (condition instanceof Regex) boolQuery.setFilterQuery(condition.getCondition());

        if (condition instanceof Or) boolQuery.setShouldQuery(condition.getCondition());
      });
    });

    return {
      bool: boolQuery.getQuery(),
    };
  }

  /**
   * It builds a query for the bool query type.
   * @returns A boolean query.
   */
  public build() {
    switch (this.type) {
      case CompoundQueryType.BOOL:
        return this.boolBuildQuery();
      default:
        return null;
    }
  }
}
