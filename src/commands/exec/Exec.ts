import Action from '../../models/Action';
import Microservice from '../../models/Microservice';
import * as utils from '../../utils';

/**
 *
 */
export default abstract class Exec {
  protected dockerImage: string;
  protected microservice: Microservice;
  protected _arguments: any;
  protected environmentVariables: any;
  protected dockerServiceId: string;
  protected action: Action;

  /**
   *
   * @param {string} dockerImage
   * @param {Microservice} microservice
   * @param {Object} _arguments
   * @param {Object} environmentVariables
   */
  protected constructor(dockerImage: string, microservice: Microservice, _arguments: any, environmentVariables: any) {
    this.dockerImage = dockerImage;
    this.microservice = microservice;
    this._arguments = _arguments;
    this.environmentVariables = environmentVariables;
    this.dockerServiceId = null;
    this.action = null;
  }

  /**
   * Sets a {@link Action}'s default arguments.
   */
  protected setDefaultArguments(): void {
    for (let i = 0; i < this.action.arguments.length; i += 1) {
      const argument = this.action.arguments[i];
      if (!this._arguments[argument.name]) {
        if (argument.default !== null) {
          if (typeof argument.default === 'object') {
            this._arguments[argument.name] = JSON.stringify(argument.default);
          } else {
            this._arguments[argument.name] = argument.default + '';
          }
        }
      }
    }
  }

  /**
   * Sets a {@link Microservice}'s default {@link EnvironmentVariable}s and variables from the system environment variables.
   */
  protected setDefaultEnvironmentVariables(): void {
    for (let i = 0; i < this.microservice.environmentVariables.length; i += 1) {
      const environmentVariable = this.microservice.environmentVariables[i];
      if (!this.environmentVariables[environmentVariable.name]) {
        if (environmentVariable.default !== null) {
          this.environmentVariables[environmentVariable.name] = environmentVariable.default;
        }
      }
    }

    for (let i = 0; i < this.microservice.environmentVariables.length; i += 1) {
      const environmentVariable = this.microservice.environmentVariables[i];
      if (process.env[environmentVariable.name]) {
        this.environmentVariables[environmentVariable.name] = process.env[environmentVariable.name];
      }
    }
  }

  /**
   * Cast the types of the arguments. Everything comes in as a string so it's important to convert to given type.
   */
  protected castTypes(): void {
    const argumentList = Object.keys(this._arguments);
    for (let i = 0; i < argumentList.length; i += 1) {
      const argument = this.action.getArgument(argumentList[i]);
      this._arguments[argument.name] = utils.typeCast[argument.type](this._arguments[argument.name]);
    }
  }

  /**
   * Formats an object of environment variables to a `-e KEY='val'` style.
   *
   * @return {String} The formatted string
   * @private
   */
  protected formatEnvironmentVariables(): string {
    let result = '';
    const keys = Object.keys(this.environmentVariables);
    for (let i = 0; i < keys.length; i += 1) {
      result += ` -e ${keys[i]}="${this.environmentVariables[keys[i]]}"`;
    }
    return result;
  }

  public abstract async exec(action): Promise<void>;
}
