import type { Result } from "./Result.ts";

export class Ok<T> {
  readonly _tag = "ok";
  value: T;

  constructor(value: T) {
    this.value = value;
  }
}

export function ok<T>(t: T): Ok<T> {
  return new Ok(t);
}

export function isOk<T, E>(result: Result<T, E>): result is Ok<T> {
  return result._tag === "ok";
}
