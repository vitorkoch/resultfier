import type { Err } from "./err";
import type { Ok } from "./ok";

/**
 * Represents a Result type that can either be a success (`Ok`) or an error (`Err`).
 * This is an abstract base class that provides common functionality for both variants.
 */
export abstract class ResultBase<T, E> {
  /**
   * Type guard to check if the result is an `Ok` variant.
   */
  abstract readonly isOk: boolean;

  /**
   * Type guard to check if the result is an `Err` variant.
   */
  abstract readonly isErr: boolean;

  /**
   * Maps a `Result<T, E>` to `Result<U, E>` by applying a function to a contained `Ok` value,
   * leaving an `Err` value untouched.
   */
  abstract map<U>(fn: (value: T) => U): Result<U, E>;

  /**
   * Maps a `Result<T, E>` to `Result<T, F>` by applying a function to a contained `Err` value,
   * leaving an `Ok` value untouched.
   */
  abstract mapErr<F>(fn: (error: E) => F): Result<T, F>;

  /**
   * Returns the contained `Ok` value, consuming the self value.
   * Throws an error if the result is `Err`.
   */
  abstract unwrap(): T;

  /**
   * Returns the contained `Err` value, consuming the self value.
   * Throws an error if the result is Ok.
   */
  abstract unwrapErr(): E;

  /**
   * Returns the contained `Ok` value or a provided default.
   */
  abstract unwrapOr(defaultValue: T): T;

  /**
   * Returns the contained `Ok` value or computes it from a closure.
   */
  abstract unwrapOrElse(fn: (error: E) => T): T;

  /**
   * Calls the provided function with the contained value and returns the result.
   * If the result is `Err`, the function is not called and the `Err` is returned.
   */
  abstract andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>;

  /**
   * Returns true if the result is `Ok` and the value inside of it matches a predicate.
   */
  abstract contains(value: T): boolean;

  /**
   * Returns true if the result is `Err` and the error inside of it matches a predicate.
   */
  abstract containsErr(error: E): boolean;
}

/**
 * Type alias for a `Result` that can be either `Ok<T>` or `Err<E>`.
 */
export type Result<T, E> = Ok<T> | Err<E>;

/**
 * Type alias for an async `Result` (Promise-wrapped `Result`).
 */
export type AsyncResult<T, E> = Promise<Result<T, E>>;
