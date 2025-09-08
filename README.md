# Resultfier

A TypeScript library implementing the Result pattern with an Object-Oriented
Programming approach and excellent type safety. Inspired by Rust's Result type,
this library provides a robust way to handle success and error cases in your
TypeScript applications.

## Features

- 🎯 **OOP Approach**: Clean, object-oriented API design
- 🔒 **Type Safe**: Full TypeScript support with strict type checking
- 🚀 **Runtime Agnostic**: Works in any JavaScript/TypeScript environment
- 📚 **Well Documented**: Comprehensive JSDoc documentation
- 🧪 **Tested**: Full test coverage for all functionality
- 📦 **JSR Ready**: Configured for deployment to JSR (JavaScript Registry)

## Installation

### From JSR (JavaScript Registry)

```bash
# Using Deno
deno add @vikoch/resultfier

# Using npm
npx jsr install @vikoch/resultfier
```

### From Source

```bash
git clone https://github.com/vikoch/resultfier.git
cd resultfier
```

## Quick Start

```typescript
import { err, isErr, isOk, ok } from "@vikoch/resultfier";

// Create success and error results
const successResult = ok(42);
const errorResult = err("Something went wrong");

// Check result types
if (isOk(successResult)) {
  console.log("Success:", successResult.unwrap()); // 42
}

if (isErr(errorResult)) {
  console.log("Error:", errorResult.unwrapErr()); // "Something went wrong"
}
```

## API Reference

### Core Types

- `Result<T, E>` - Union type of `Ok<T> | Err<E>`
- `Ok<T>` - Success variant containing a value of type T
- `Err<E>` - Error variant containing an error of type E
- `AsyncResult<T, E>` - Promise-wrapped Result (`Promise<Result<T, E>>`)

### Constructor Functions

- `ok<T>(value: T): Ok<T>` - Create a success result
- `err<E>(error: E): Err<E>` - Create an error result

### Type Guards

- `isOk<T, E>(result: Result<T, E>): result is Ok<T>` - Check if result is Ok
- `isErr<T, E>(result: Result<T, E>): result is Err<E>` - Check if result is Err

### Core Methods

All Result instances have these methods:

#### `map<U>(fn: (value: T) => U): Result<U, E>`

Transform the contained value if the result is Ok, otherwise return the Err
unchanged.

```typescript
const result = ok(5);
const doubled = result.map((x) => x * 2); // Ok(10)
```

#### `mapErr<F>(fn: (error: E) => F): Result<T, F>`

Transform the contained error if the result is Err, otherwise return the Ok
unchanged.

```typescript
const result = err("network error");
const enhanced = result.mapErr((e) => `Enhanced: ${e}`); // Err("Enhanced: network error")
```

#### `unwrap(): T`

Extract the contained value. Throws an error if the result is Err.

```typescript
const result = ok(42);
const value = result.unwrap(); // 42

const errorResult = err("oops");
// errorResult.unwrap(); // Throws error
```

#### `unwrapErr(): E`

Extract the contained error. Throws an error if the result is Ok.

```typescript
const result = err("network error");
const error = result.unwrapErr(); // "network error"

const successResult = ok(42);
// successResult.unwrapErr(); // Throws error
```

#### `unwrapOr(defaultValue: T): T`

Extract the contained value or return a default if the result is Err.

```typescript
const result = ok(42);
result.unwrapOr(0); // 42

const errorResult = err("oops");
errorResult.unwrapOr(0); // 0
```

#### `unwrapOrElse(fn: (error: E) => T): T`

Extract the contained value or compute a fallback using the error if the result
is Err.

```typescript
const result = ok(42);
result.unwrapOrElse((e) => `Fallback: ${e}`); // 42

const errorResult = err("oops");
errorResult.unwrapOrElse((e) => `Fallback: ${e}`); // "Fallback: oops"
```

#### `andThen<U>(fn: (value: T) => Result<U, E>): Result<U, E>`

Chain operations. If the result is Ok, apply the function; otherwise return the
Err unchanged.

```typescript
const result = ok(5);
const chained = result.andThen((x) => {
  if (x > 3) {
    return ok(`Large: ${x}`);
  } else {
    return err("Too small");
  }
}); // Ok("Large: 5")
```

#### `contains(value: T): boolean`

Check if the result is Ok and contains the specified value.

```typescript
const result = ok(42);
result.contains(42); // true
result.contains(100); // false
```

#### `containsErr(error: E): boolean`

Check if the result is Err and contains the specified error.

```typescript
const result = err("network error");
result.containsErr("network error"); // true
result.containsErr("other error"); // false
```

## Advanced Usage

### Error Handling Patterns

```typescript
import { err, ok } from "@vikoch/resultfier";

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return err("Division by zero");
  }
  return ok(a / b);
}

function processDivision(a: number, b: number): Result<string, string> {
  return divide(a, b)
    .map((result) => `Result: ${result}`)
    .mapErr((error) => `Calculation failed: ${error}`);
}

// Usage
const result = processDivision(10, 2);
if (result.isOk) {
  console.log(result.unwrap()); // "Result: 5"
} else {
  console.log(result.unwrapErr()); // "Calculation failed: Division by zero"
}
```

### Async Operations

```typescript
import { AsyncResult, err, ok } from "@vikoch/resultfier";

async function fetchUser(id: number): Promise<Result<User, string>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    if (!response.ok) {
      return err(`HTTP ${response.status}: ${response.statusText}`);
    }
    const user = await response.json();
    return ok(user);
  } catch (error) {
    return err(`Network error: ${error.message}`);
  }
}

// Usage
const userResult: AsyncResult<User, string> = fetchUser(123);
userResult.then((result) => {
  if (result.isOk) {
    console.log("User:", result.unwrap());
  } else {
    console.log("Error:", result.unwrapErr());
  }
});
```

### Pattern Matching

```typescript
import { err, ok } from "@vikoch/resultfier";

function handleResult<T, E>(result: Result<T, E>): string {
  if (result.isOk) {
    return `Success: ${result.unwrap()}`;
  } else {
    return `Error: ${result.unwrapErr()}`;
  }
}

// Usage
const success = ok(42);
const error = err("oops");

console.log(handleResult(success)); // "Success: 42"
console.log(handleResult(error)); // "Error: oops"
```

## Development

### Prerequisites

- Deno 1.40+ (for development and testing)
- TypeScript knowledge

### Setup

```bash
# Clone the repository
git clone https://github.com/vikoch/resultfier.git
cd resultfier

# Run tests
deno task test

# Check types
deno task check

# Format code
deno task fmt

# Lint code
deno task lint
```

### Project Structure

```
resultfier/
├── core/           # Core implementation
│   ├── Result.ts   # Core Result types
│   ├── Ok.ts       # Success variant
│   ├── Err.ts      # Error variant
│   └── mod.ts      # Core exports
├── mod.ts          # Main library entry point
├── test.ts         # Test suite
├── deno.json       # Configuration
└── README.md       # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by Rust's Result type
- Built with modern TypeScript features
- Designed for developer experience and type safety
