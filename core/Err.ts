import type { Result } from "./Result.ts";

export class Err<E> {
  readonly _tag = "err";
  error: E;

  constructor(error: E) {
    this.error = error;
  }
}

export function err<E>(e: E): Err<E> {
  return new Err(e);
}

export function isErr<T, E>(result: Result<T, E>): result is Err<E> {
  return result._tag === "err";
}
