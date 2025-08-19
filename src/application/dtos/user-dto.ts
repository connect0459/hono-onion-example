import { z } from "zod";
import { User } from "../../domain/entities/user";

// Request DTOs
export const CreateUserRequestSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});

export class CreateUserRequestDto {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;

  private constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  email(): string {
    return this._email;
  }

  static fromUnknown(data: unknown): CreateUserRequestDto {
    const validated = CreateUserRequestSchema.parse(data);
    return new CreateUserRequestDto(validated.id, validated.name, validated.email);
  }

  static isValid(data: unknown): data is z.infer<typeof CreateUserRequestSchema> {
    return CreateUserRequestSchema.safeParse(data).success;
  }
}

export const UpdateUserRequestSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email format").optional(),
});

export class UpdateUserRequestDto {
  private readonly _name?: string;
  private readonly _email?: string;

  private constructor(name?: string, email?: string) {
    this._name = name;
    this._email = email;
  }

  name(): string | undefined {
    return this._name;
  }

  email(): string | undefined {
    return this._email;
  }

  static fromUnknown(data: unknown): UpdateUserRequestDto {
    const validated = UpdateUserRequestSchema.parse(data);
    return new UpdateUserRequestDto(validated.name, validated.email);
  }

  static isValid(data: unknown): data is z.infer<typeof UpdateUserRequestSchema> {
    return UpdateUserRequestSchema.safeParse(data).success;
  }
}

// Response DTOs
export class UserResponseDto {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  id(): string {
    return this._id;
  }

  name(): string {
    return this._name;
  }

  email(): string {
    return this._email;
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
    };
  }

  static fromUser(user: User): UserResponseDto {
    return new UserResponseDto(user.id(), user.name(), user.email());
  }
}

export class ErrorResponseDto {
  private readonly _error: string;

  constructor(error: string) {
    this._error = error;
  }

  error(): string {
    return this._error;
  }

  toJSON() {
    return {
      error: this._error,
    };
  }
}

export class MessageResponseDto {
  private readonly _message: string;

  constructor(message: string) {
    this._message = message;
  }

  message(): string {
    return this._message;
  }

  toJSON() {
    return {
      message: this._message,
    };
  }
}

export class UserListResponseDto {
  private readonly _users: UserResponseDto[];

  constructor(users: UserResponseDto[]) {
    this._users = users;
  }

  users(): UserResponseDto[] {
    return this._users;
  }

  toJSON() {
    return {
      users: this._users,
    };
  }

  static fromUsers(users: User[]): UserListResponseDto {
    const userDtos = users.map(user => UserResponseDto.fromUser(user));
    return new UserListResponseDto(userDtos);
  }
}

// Type exports
export type CreateUserRequestData = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequestData = z.infer<typeof UpdateUserRequestSchema>;
