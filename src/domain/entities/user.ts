export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string
  ) {
    if (!name.trim()) {
      throw new Error("Name is required");
    }

    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
