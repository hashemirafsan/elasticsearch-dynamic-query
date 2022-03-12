import { Eq } from '../../parser/condtions/Eq';
import { In } from '../../parser/condtions/In';
import { Like } from '../../parser/condtions/Like';
import { Lt } from '../../parser/condtions/Lt';
import { Neq } from '../../parser/condtions/Neq';
import { NotIn } from '../../parser/condtions/NotIn';
import { NotLike } from '../../parser/condtions/NotLike';
import { Statement } from '../../parser/statement';
import { BoolQuery } from './bool.query';
import { CompoundQueryType } from './enum';
import { IBoolQuery } from './interface';

export class CompoundQuery {
  private statements: Statement[] = [];
  private type: CompoundQueryType;

  constructor(statements: Statement[], type: CompoundQueryType = CompoundQueryType.BOOL) {
    this.statements = statements;
    this.type = type;
  }

  private boolBuildQuery(): IBoolQuery {
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
      });
    });

    return boolQuery.getQuery();
  }

  public build(): IBoolQuery | null {
    switch (this.type) {
      case CompoundQueryType.BOOL:
        return this.boolBuildQuery();
      default:
        return null;
    }
  }
}
