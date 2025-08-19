import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});

export class User {
  public readonly id: string;
  public readonly name: string;
  public readonly email: string;

  constructor(id: string, name: string, email: string) {
    const validated = UserSchema.parse({ id, name, email });
    this.id = validated.id;
    this.name = validated.name;
    this.email = validated.email;
  }

  static fromObject(data: unknown): User {
    const validated = UserSchema.parse(data);
    return new User(validated.id, validated.name, validated.email);
  }
}
