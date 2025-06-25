import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    roles: {
      [key: string]: string;
    };
  }

  interface Session {
    user: User;
  }
}
