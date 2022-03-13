import { Command, IParserItem } from './interface';
import { Statement } from './statement';

export class Parser {
  private command: Command = {};
  private statements: Statement[] = [];

  constructor(command: Command) {
    this.command = command;
  }

  /**
   * Get the statements in this block
   * @returns The array of statements.
   */
  public getStatements(): Statement[] {
      return this.statements;
  }

  /**
   * It parses the command object and creates a Statement object for each command.
   */
  public parse() {
    Object.keys(this.command).forEach((key: string) => {
      if (this.isReservedKey(key)) throw new Error('Reserved key is used as command!');

      if (!this.validate(this.command[key])) throw new Error('Command Item is not valid!');

      this.statements.push(new Statement(key, this.command[key]));
    });
  }

  /**
   * It checks if the data object has the type and conditions properties.
   * @param {IParserItem} data - The data to be validated.
   * @returns A boolean value.
   */
  private validate(data: IParserItem): boolean {
    return data.hasOwnProperty('type') && data.hasOwnProperty('conditions');
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
