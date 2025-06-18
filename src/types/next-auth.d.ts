import "next-auth";

declare module "next-auth" {
  interface User {
    firstName?: string;
    lastName?: string;
    roles?: {
      member: number;
      programDirector?: number;
      sparkLead?: number;
      createLead?: number;
      forgeLead?: number;
      dasLead?: number;
    };
  }

  interface Session {
    user: User;
  }
}
