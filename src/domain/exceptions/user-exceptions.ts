// Base Exception Class
export abstract class DomainException extends Error {
  public abstract readonly statusCode: number;
  public abstract readonly type: string;
  private readonly _timestamp: string;
  private readonly _detail?: string;

  constructor(message: string, detail?: string) {
    super(message);
    this.name = this.constructor.name;
    this._timestamp = new Date().toISOString();
    this._detail = detail;
    Error.captureStackTrace(this, this.constructor);
  }

  timestamp(): string {
    return this._timestamp;
  }

  detail(): string | undefined {
    return this._detail;
  }
}

// Specific Exception Classes
export class UserNotFoundException extends DomainException {
  public readonly statusCode = 404;
  public readonly type = "https://example.com/probs/user-not-found";
  private readonly _userId: string;

  constructor(userId: string) {
    super("User not found", `User with ID '${userId}' was not found in the system.`);
    this._userId = userId;
  }

  userId(): string {
    return this._userId;
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
  private readonly _field: string;
  private readonly _value: string;

  constructor(field: string, value: string) {
    super("User already exists", `A user with ${field} '${value}' already exists.`);
    this._field = field;
    this._value = value;
  }

  field(): string {
    return this._field;
  }

  value(): string {
    return this._value;
  }
}
