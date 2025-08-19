import { z } from "zod";

const UserSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email format"),
});

export class User {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _email: string;

  constructor(id: string, name: string, email: string) {
    const validated = UserSchema.parse({ id, name, email });
    this._id = validated.id;
    this._name = validated.name;
    this._email = validated.email;
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

  static fromObject(data: unknown): User {
    const validated = UserSchema.parse(data);
    return new User(validated.id, validated.name, validated.email);
  }
}
