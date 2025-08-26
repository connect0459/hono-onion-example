import { z } from "zod";
import { User } from "../../domain/entities/user";

// Request DTOs
const CreateUserRequestSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});

export type CreateUserRequestDto = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};

export const createUserRequestFromUnknown = (data: unknown): CreateUserRequestDto => {
  const validated = CreateUserRequestSchema.parse(data);
  return {
    id: validated.id,
    name: validated.name,
    email: validated.email,
  };
};

export const isValidCreateUserRequest = (
  data: unknown
): data is z.infer<typeof CreateUserRequestSchema> => {
  return CreateUserRequestSchema.safeParse(data).success;
};

const UpdateUserRequestSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.email("Invalid email format").optional(),
});

export type UpdateUserRequestDto = {
  readonly name?: string;
  readonly email?: string;
};

export const updateUserRequestFromUnknown = (data: unknown): UpdateUserRequestDto => {
  const validated = UpdateUserRequestSchema.parse(data);
  return {
    name: validated.name,
    email: validated.email,
  };
};

export const isValidUpdateUserRequest = (
  data: unknown
): data is z.infer<typeof UpdateUserRequestSchema> => {
  return UpdateUserRequestSchema.safeParse(data).success;
};

// Response DTOs
export type UserResponseDto = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};

export const createUserResponse = (id: string, name: string, email: string): UserResponseDto => ({
  id,
  name,
  email,
});

export const userResponseFromUser = (user: User): UserResponseDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
});

export type MessageResponseDto = {
  readonly message: string;
};

export const createMessageResponse = (message: string): MessageResponseDto => ({
  message,
});

export type UserListResponseDto = {
  readonly users: UserResponseDto[];
};

export const createUserListResponse = (users: UserResponseDto[]): UserListResponseDto => ({
  users,
});

export const userListResponseFromUsers = (users: User[]): UserListResponseDto => {
  const userDtos = users.map(user => userResponseFromUser(user));
  return createUserListResponse(userDtos);
};

// Type exports
export type CreateUserRequestData = z.infer<typeof CreateUserRequestSchema>;
export type UpdateUserRequestData = z.infer<typeof UpdateUserRequestSchema>;
