// Base Exception Class
export abstract class DomainException extends Error {
  public abstract readonly statusCode: number;
  public abstract readonly type: string;
  public readonly timestamp: string;

  constructor(
    message: string,
    public readonly detail?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.timestamp = new Date().toISOString();
    Error.captureStackTrace(this, this.constructor);
  }
}

// Specific Exception Classes
export class UserNotFoundException extends DomainException {
  public readonly statusCode = 404;
  public readonly type = "https://example.com/probs/user-not-found";

  constructor(userId: string) {
    super("User not found", `User with ID '${userId}' was not found in the system.`);
  }
}

export class ValidationException extends DomainException {
  public readonly statusCode = 400;
  public readonly type = "https://example.com/probs/validation-error";

  constructor(message: string, detail?: string) {
    super(message, detail);
  }
}

export class DuplicateUserException extends DomainException {
  public readonly statusCode = 409;
  public readonly type = "https://example.com/probs/duplicate-user";

  constructor(field: string, value: string) {
    super("User already exists", `A user with ${field} '${value}' already exists.`);
  }
}
