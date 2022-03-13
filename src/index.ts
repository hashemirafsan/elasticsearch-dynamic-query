import { Parser } from './parser';
import { Command } from './parser/interface';
import { CompoundQuery } from './queries/compound';
import { CompoundQueryType } from './queries/compound/enum';

export class ElasticSearchDynamicQuery {
  private readonly command: Command;

  constructor(command: Command) {
    this.command = command;
  }

  /**
   * It takes a string and returns a list of statements
   * @returns The result of the parseStatements method.
   */
  private parseStatements() {
    const parser = new Parser(this.command);
    parser.parse();
    return parser.getStatements();
  }

  /**
   * It parses a list of statements and returns a CompoundQuery
   * @returns A CompoundQuery object.
   */
  public compoundQuery(type: CompoundQueryType = CompoundQueryType.BOOL) {
    return new CompoundQuery(this.parseStatements(), type);
  }
}
