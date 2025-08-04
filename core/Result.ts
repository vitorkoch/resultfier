import type { Err } from "./Err.ts";
import type { Ok } from "./Ok.ts";

export type Result<T, E> = Ok<T> | Err<E>;

export type AsyncResult<T, E> = Promise<Result<T, E>>;
