import { type Result, ResultBase } from "./Result.ts";

/**
 * Represents an error result containing an error value.
 */
export class Err<E> extends ResultBase<never, E> {
  readonly _tag = "err" as const;
  readonly isOk = false;
  readonly isErr = true;

  constructor(readonly error: E) {
    super();
  }

  /**
   * Maps the value type, but since this is Err, it's a no-op.
   */
  map<U>(_fn: (value: never) => U): Err<E> {
    return this;
  }

  /**
   * Maps the contained error using the provided function.
   * Since this is Err, the function is always applied.
   */
  mapErr<F>(fn: (error: E) => F): Err<F> {
    return new Err(fn(this.error));
  }

  /**
   * Throws an error since this is Err, not Ok.
   */
  unwrap(): never {
    throw new Error(`Called unwrap() on an Err value: ${this.error}`);
  }

  /**
   * Returns the contained error.
   */
  unwrapErr(): E {
    return this.error;
  }

  /**
   * Returns the provided default value since this is Err.
   */
  unwrapOr<T>(defaultValue: T): T {
    return defaultValue;
  }

  /**
   * Computes and returns the fallback value using the provided function.
   */
  unwrapOrElse<T>(fn: (error: E) => T): T {
    return fn(this.error);
  }

  /**
   * Returns this Err unchanged since there's no value to chain.
   */
  andThen<U>(_fn: (value: never) => Result<U, E>): Err<E> {
    return this;
  }

  /**
   * Always returns false since this is Err, not Ok.
   */
  contains(_value: never): boolean {
    return false;
  }

  /**
   * Checks if the contained error matches the provided error.
   */
  containsErr(error: E): boolean {
    return this.error === error;
  }
}

/**
 * Creates a new Err result with the given error.
 */
export function err<E>(error: E): Err<E> {
  return new Err(error);
}

/**
 * Type guard to check if a result is Err.
 */
export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result.isErr;
}
