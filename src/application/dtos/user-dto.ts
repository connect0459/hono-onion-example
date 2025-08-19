import { z } from "zod";
import { User } from "../../domain/entities/user";

// Request DTOs
export const CreateUserRequestSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});

export class CreateUserRequestDto {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  private constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
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
  public readonly name?: string;
  public readonly email?: string;

  private constructor(name?: string, email?: string) {
    this.name = name;
    this.email = email;
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
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  static fromUser(user: User): UserResponseDto {
    return new UserResponseDto(user.id, user.name, user.email);
  }
}

export class ErrorResponseDto {
  public readonly error: string;

  constructor(error: string) {
    this.error = error;
  }
}

export class MessageResponseDto {
  public readonly message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export class UserListResponseDto {
  public readonly users: UserResponseDto[];

  constructor(users: UserResponseDto[]) {
    this.users = users;
  }

  static fromUsers(users: User[]): UserListResponseDto {
    const userDtos = users.map(user => UserResponseDto.fromUser(user));
    return new UserListResponseDto(userDtos);
  }
}

// Type exports
export type CreateUserRequestData = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequestData = z.infer<typeof UpdateUserRequestSchema>;
