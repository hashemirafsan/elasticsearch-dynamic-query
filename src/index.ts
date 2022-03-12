import { Parser } from './parser';
import { Command } from './parser/interface';
import { CompoundQuery } from './queries/compound';

export class ElasticSearchQueryBuilder {
  private readonly command: Command = {};

  constructor(command: Command) {
    this.command = command;
  }

  /**
   * It takes a string and returns a list of statements
   * @returns The result of the parseStatements method.
   */
  private parseStatements() {
    const parser = new Parser(this.command);
    return parser.parse();
  }

  /**
   * It parses a list of statements and returns a CompoundQuery
   * @returns A CompoundQuery object.
   */
  public compoundQuery() {
    return new CompoundQuery(this.parseStatements());
  }
}
