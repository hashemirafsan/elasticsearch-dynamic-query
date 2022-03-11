import { Command } from './interface';
import { Statement } from './statement';
import { ParserItem } from './type';

export class Parser {
  private command: Command = {};

  constructor(command: Command) {
    this.command = command;
  }

  public parse(root?: object): Statement[] {
    const statements: Statement[] = [];

    Object.keys(this.command).forEach((key: string) => {
      if (root && this.isReservedKey(key)) throw new Error('Reserved key is used under conditions!');

      if (!this.validate(this.command[key])) throw new Error('Command Item is not valid!');

      statements.push(new Statement(key, this.command[key]));
    });

    return statements;
  }

  private validate(data: ParserItem): boolean {
    return true;
  }

  private isReservedKey(key: string): boolean {
    return ['$and', '$or'].indexOf(key) > -1;
  }
}
