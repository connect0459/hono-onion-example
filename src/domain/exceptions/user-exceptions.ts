export type DomainException = {
  readonly name: string;
  readonly message: string;
  readonly timestamp: string;
  readonly detail?: string;
  readonly statusCode: number;
  readonly type: string;
};

export type UserNotFoundException = DomainException & {
  readonly name: "UserNotFoundException";
  readonly userId: string;
};

export type ValidationException = DomainException & {
  readonly name: "ValidationException";
};

export type DuplicateUserException = DomainException & {
  readonly name: "DuplicateUserException";
  readonly field: string;
  readonly value: string;
};

export const createUserNotFoundException = (userId: string): UserNotFoundException => ({
  name: "UserNotFoundException",
  message: "User not found",
  timestamp: new Date().toISOString(),
  detail: `User with ID '${userId}' was not found in the system.`,
  statusCode: 404,
  type: "https://example.com/probs/user-not-found",
  userId,
});

export const createValidationException = (
  message: string,
  detail?: string
): ValidationException => ({
  name: "ValidationException",
  message,
  timestamp: new Date().toISOString(),
  detail,
  statusCode: 400,
  type: "https://example.com/probs/validation-error",
});

export const createDuplicateUserException = (
  field: string,
  value: string
): DuplicateUserException => ({
  name: "DuplicateUserException",
  message: "User already exists",
  timestamp: new Date().toISOString(),
  detail: `A user with ${field} '${value}' already exists.`,
  statusCode: 409,
  type: "https://example.com/probs/duplicate-user",
  field,
  value,
});
