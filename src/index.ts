import { Parser } from './parser';
import { Command } from './parser/interface';
import { CompoundQuery } from './queries/compound';

export class ElasticSearchQueryBuilder {
  private readonly command: Command = {};

  constructor(command: Command) {
    this.command = command;
  }

  private parseStatements() {
    const parser = new Parser(this.command);
    return parser.parse();
  }

  public compoundQuery() {
    return new CompoundQuery(this.parseStatements());
  }
}
