import { Context } from "hono";
import { ZodError } from "zod";
import {
  DomainException,
  UserNotFoundException,
  ValidationException,
  DuplicateUserException,
} from "../../domain/exceptions/user-exceptions";
import {
  createNotFoundProblem,
  createValidationErrorProblem,
  createConflictProblem,
  createProblemDetails,
  createInternalErrorProblem,
} from "../../application/dtos/problem-details.dto";

const isUserNotFoundException = (error: unknown): error is UserNotFoundException =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  error.name === "UserNotFoundException";

const isValidationException = (error: unknown): error is ValidationException =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  error.name === "ValidationException";

const isDuplicateUserException = (error: unknown): error is DuplicateUserException =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  error.name === "DuplicateUserException";

const isDomainException = (error: unknown): error is DomainException =>
  typeof error === "object" &&
  error !== null &&
  "name" in error &&
  "statusCode" in error &&
  "type" in error;

export const handleException = (error: Error, c: Context): Response => {
  // Get request path for instance field
  const instance = c.req.url;

  // For functional domain exceptions thrown as Error objects with additional properties
  const errorObj = error as any;

  if (isUserNotFoundException(errorObj)) {
    const problemDetails = createNotFoundProblem(errorObj.detail, instance);
    return c.json(problemDetails, 404, {
      "Content-Type": "application/problem+json",
    });
  }

  if (isValidationException(errorObj)) {
    const problemDetails = createValidationErrorProblem(errorObj.detail, instance);
    return c.json(problemDetails, 400, {
      "Content-Type": "application/problem+json",
    });
  }

  if (isDuplicateUserException(errorObj)) {
    const problemDetails = createConflictProblem(errorObj.detail, instance);
    return c.json(problemDetails, 409, {
      "Content-Type": "application/problem+json",
    });
  }

  if (error instanceof ZodError) {
    const detail = error.issues
      .map(issue => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");
    const problemDetails = createValidationErrorProblem(`Validation failed: ${detail}`, instance);
    return c.json(problemDetails, 400, {
      "Content-Type": "application/problem+json",
    });
  }

  if (isDomainException(errorObj)) {
    const problemDetails = createProblemDetails(
      errorObj.type,
      errorObj.message,
      errorObj.statusCode,
      errorObj.detail,
      instance
    );
    return c.json(problemDetails, errorObj.statusCode as 400 | 401 | 403 | 404 | 409 | 422 | 500, {
      "Content-Type": "application/problem+json",
    });
  }

  // Generic error fallback
  const problemDetails = createInternalErrorProblem("An unexpected error occurred", instance);
  return c.json(problemDetails, 500, {
    "Content-Type": "application/problem+json",
  });
};

export const exceptionMiddleware = async (c: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (error) {
    return handleException(error as Error, c);
  }
};
