// RFC9457 Problem Details for HTTP APIs
export class ProblemDetailsDto {
  public readonly type: string;
  public readonly title: string;
  public readonly status: number;
  public readonly detail?: string;
  public readonly instance?: string;

  constructor(type: string, title: string, status: number, detail?: string, instance?: string) {
    this.type = type;
    this.title = title;
    this.status = status;
    this.detail = detail;
    this.instance = instance;
  }

  static notFound(detail?: string, instance?: string): ProblemDetailsDto {
    return new ProblemDetailsDto(
      "https://example.com/probs/not-found",
      "Not Found",
      404,
      detail,
      instance
    );
  }

  static validationError(detail?: string, instance?: string): ProblemDetailsDto {
    return new ProblemDetailsDto(
      "https://example.com/probs/validation-error",
      "Validation Error",
      400,
      detail,
      instance
    );
  }

  static conflict(detail?: string, instance?: string): ProblemDetailsDto {
    return new ProblemDetailsDto(
      "https://example.com/probs/conflict",
      "Conflict",
      409,
      detail,
      instance
    );
  }

  static internalError(detail?: string, instance?: string): ProblemDetailsDto {
    return new ProblemDetailsDto(
      "https://example.com/probs/internal-error",
      "Internal Server Error",
      500,
      detail,
      instance
    );
  }

  static badRequest(detail?: string, instance?: string): ProblemDetailsDto {
    return new ProblemDetailsDto(
      "https://example.com/probs/bad-request",
      "Bad Request",
      400,
      detail,
      instance
    );
  }
}
