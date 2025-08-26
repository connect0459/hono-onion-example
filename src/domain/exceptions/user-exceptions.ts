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

export const createUserNotFoundException = (userId: string): Error => {
  const error = new Error("User not found");
  Object.assign(error, {
    name: "UserNotFoundException",
    timestamp: new Date().toISOString(),
    detail: `User with ID '${userId}' was not found in the system.`,
    statusCode: 404,
    type: "https://example.com/probs/user-not-found",
    userId,
  });
  return error;
};

export const createValidationException = (
  message: string,
  detail?: string
): Error => {
  const error = new Error(message);
  Object.assign(error, {
    name: "ValidationException",
    timestamp: new Date().toISOString(),
    detail,
    statusCode: 400,
    type: "https://example.com/probs/validation-error",
  });
  return error;
};

export const createDuplicateUserException = (
  field: string,
  value: string
): Error => {
  const error = new Error("User already exists");
  Object.assign(error, {
    name: "DuplicateUserException",
    timestamp: new Date().toISOString(),
    detail: `A user with ${field} '${value}' already exists.`,
    statusCode: 409,
    type: "https://example.com/probs/duplicate-user",
    field,
    value,
  });
  return error;
};
