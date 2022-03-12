import { Command } from './interface';
import { Statement } from './statement';
import { ParserItem } from './type';

export class Parser {
  private command: Command = {};

  constructor(command: Command) {
    this.command = command;
  }

  /**
   * It takes the command object and parses it into a list of statements
   * @param {object} [root] - The root object that the command is being parsed under.
   * @returns An array of Statement objects.
   */
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

  /**
   * Check if the given key is reserved
   * @param {string} key - The name of the parameter.
   * @returns The method returns a boolean value.
   */
  private isReservedKey(key: string): boolean {
    return ['$and', '$or'].indexOf(key) > -1;
  }
}
