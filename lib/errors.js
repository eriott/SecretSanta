/**
 * Represents Errors which can be extended by inheritance.
 *
 * Usage:
 * @example
 * class SomeCustomError extends ExtendableError {
 *   constructor(message) {
 *     super(message, SomeCustomError);
 *   }
 * }
 *
 * Or use classic JavaScript way instead:
 * @example
 * function SomeCustomError(message) {
 *   this.name = 'SomeCustomError';
 *   this.message = message;
 * }
 * SomeCustomError.prototype = Error.prototype;
 */
export class ExtendableError extends Error {
  /**
   * Creates new Error which can be extended by inheritance.
   * @param message Error message.
   * @param clazz Self class reference needed to setup proper inheritance.
   */
  constructor(message, clazz, err) {
    super(message);
    this.message = message;
    this.name = clazz.name;
    if (clazz) {
      this.__proto__ = clazz.prototype;
    }
    if (err) {
      this.cause = err;
      this.stack = err.stack;
    } else if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export class AuthError extends ExtendableError {
  constructor(code) {
    super(`Authorization failed with error code ${code}`, AuthError);
  }
}

export class HttpError extends ExtendableError {
  constructor(code) {
    super(`Request failed with http error ${code}`, HttpError);
  }
}
