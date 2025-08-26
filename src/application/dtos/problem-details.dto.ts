// RFC9457 Problem Details for HTTP APIs
export type ProblemDetailsDto = {
  readonly type: string;
  readonly title: string;
  readonly status: number;
  readonly detail?: string;
  readonly instance?: string;
};

export const createProblemDetails = (
  type: string,
  title: string,
  status: number,
  detail?: string,
  instance?: string
): ProblemDetailsDto => ({
  type,
  title,
  status,
  detail,
  instance,
});

export const createNotFoundProblem = (detail?: string, instance?: string): ProblemDetailsDto =>
  createProblemDetails(
    "https://example.com/probs/not-found",
    "Not Found",
    404,
    detail,
    instance
  );

export const createValidationErrorProblem = (detail?: string, instance?: string): ProblemDetailsDto =>
  createProblemDetails(
    "https://example.com/probs/validation-error",
    "Validation Error",
    400,
    detail,
    instance
  );

export const createConflictProblem = (detail?: string, instance?: string): ProblemDetailsDto =>
  createProblemDetails(
    "https://example.com/probs/conflict",
    "Conflict",
    409,
    detail,
    instance
  );

export const createInternalErrorProblem = (detail?: string, instance?: string): ProblemDetailsDto =>
  createProblemDetails(
    "https://example.com/probs/internal-error",
    "Internal Server Error",
    500,
    detail,
    instance
  );

export const createBadRequestProblem = (detail?: string, instance?: string): ProblemDetailsDto =>
  createProblemDetails(
    "https://example.com/probs/bad-request",
    "Bad Request",
    400,
    detail,
    instance
  );
