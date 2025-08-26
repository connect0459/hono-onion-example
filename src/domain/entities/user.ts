import { z } from "zod";

const UserSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});

export type User = {
  readonly id: string;
  readonly name: string;
  readonly email: string;
};

export const createUser = (id: string, name: string, email: string): User => {
  const validated = UserSchema.parse({ id, name, email });
  return {
    id: validated.id,
    name: validated.name,
    email: validated.email,
  };
};

export const createUserFromObject = (data: unknown): User => {
  const validated = UserSchema.parse(data);
  return {
    id: validated.id,
    name: validated.name,
    email: validated.email,
  };
};
