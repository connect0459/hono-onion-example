import { Context } from "hono";
import { ZodError } from "zod";
import {
  DomainException,
  UserNotFoundException,
  ValidationException,
  DuplicateUserException,
} from "../../domain/exceptions/user-exceptions";
import { ProblemDetailsDto } from "../../application/dtos/problem-details.dto";

export class ExceptionHandler {
  static handle(error: Error, c: Context): Response {
    // Get request path for instance field
    const instance = c.req.url;

    if (error instanceof UserNotFoundException) {
      const problemDetails = ProblemDetailsDto.notFound(error.detail(), instance);
      return c.json(problemDetails, 404, {
        "Content-Type": "application/problem+json",
      });
    }

    if (error instanceof ValidationException) {
      const problemDetails = ProblemDetailsDto.validationError(error.detail(), instance);
      return c.json(problemDetails, 400, {
        "Content-Type": "application/problem+json",
      });
    }

    if (error instanceof DuplicateUserException) {
      const problemDetails = ProblemDetailsDto.conflict(error.detail(), instance);
      return c.json(problemDetails, 409, {
        "Content-Type": "application/problem+json",
      });
    }

    if (error instanceof ZodError) {
      const detail = error.issues
        .map(issue => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");
      const problemDetails = ProblemDetailsDto.validationError(
        `Validation failed: ${detail}`,
        instance
      );
      return c.json(problemDetails, 400, {
        "Content-Type": "application/problem+json",
      });
    }

    if (error instanceof DomainException) {
      const problemDetails = new ProblemDetailsDto(
        error.type(),
        error.message,
        error.statusCode(),
        error.detail(),
        instance
      );
      return c.json(problemDetails, error.statusCode() as 400 | 401 | 403 | 404 | 409 | 422 | 500, {
        "Content-Type": "application/problem+json",
      });
    }

    // Generic error fallback
    const problemDetails = ProblemDetailsDto.internalError(
      "An unexpected error occurred",
      instance
    );
    return c.json(problemDetails, 500, {
      "Content-Type": "application/problem+json",
    });
  }

  static async middleware(c: Context, next: () => Promise<void>) {
    try {
      await next();
    } catch (error) {
      return ExceptionHandler.handle(error as Error, c);
    }
  }
}
