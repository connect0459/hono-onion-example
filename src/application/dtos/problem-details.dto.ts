// RFC9457 Problem Details for HTTP APIs
export class ProblemDetailsDto {
  private readonly _type: string;
  private readonly _title: string;
  private readonly _status: number;
  private readonly _detail?: string;
  private readonly _instance?: string;

  constructor(type: string, title: string, status: number, detail?: string, instance?: string) {
    this._type = type;
    this._title = title;
    this._status = status;
    this._detail = detail;
    this._instance = instance;
  }

  type(): string {
    return this._type;
  }

  title(): string {
    return this._title;
  }

  status(): number {
    return this._status;
  }

  detail(): string | undefined {
    return this._detail;
  }

  instance(): string | undefined {
    return this._instance;
  }

  toJSON() {
    return {
      type: this._type,
      title: this._title,
      status: this._status,
      detail: this._detail,
      instance: this._instance,
    };
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
