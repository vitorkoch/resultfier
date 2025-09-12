import { type Result, ResultBase } from "./result";

/**
 * Represents a successful result containing a value.
 */
export class Ok<T> extends ResultBase<T, never> {
  readonly _tag = "ok" as const;
  readonly isOk = true;
  readonly isErr = false;

  constructor(readonly value: T) {
    super();
  }

  /**
   * Maps the contained value using the provided function.
   * Since this is `Ok`, the function is always applied.
   */
  map<U>(fn: (value: T) => U): Ok<U> {
    return new Ok(fn(this.value));
  }

  /**
   * Maps the error type, but since this is `Ok`, it's a no-op.
   */
  mapErr<F>(_fn: (error: never) => F): Ok<T> {
    return this;
  }

  /**
   * Returns the contained value.
   */
  unwrap(): T {
    return this.value;
  }

  /**
   * Throws an error since this is Ok, not Err.
   */
  unwrapErr(): never {
    throw new Error(`Called unwrapErr() on an Ok value: ${this.value}`);
  }

  /**
   * Returns the contained value, ignoring the default.
   */
  unwrapOr(_defaultValue: T): T {
    return this.value;
  }

  /**
   * Returns the contained value, ignoring the fallback function.
   */
  unwrapOrElse(_fn: (error: never) => T): T {
    return this.value;
  }

  /**
   * Applies the function to the contained value and returns the result.
   */
  andThen<U>(fn: (value: T) => Result<U, never>): Result<U, never> {
    return fn(this.value);
  }

  /**
   * Checks if the contained value matches the provided value.
   */
  contains(value: T): boolean {
    return this.value === value;
  }

  /**
   * Always returns false since this is `Ok`, not `Err`.
   */
   override containsErr(_error: never): false {
    return false;
  }
}

/**
 * Creates a new `Ok` result with the given value.
 */
export function ok<T>(value: T): Ok<T> {
  return new Ok(value);
}

/**
 * Type guard to check if a result is `Ok`.
 * @deprecated use `.isOk` instead
 */
export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result.isOk;
}
