type keys = "admin" | "create" | "spark" | "forge" | "das";

export const ATTRIBUTES: Record<keys, string[]> = {
  admin: ["firstName", "lastName", "email", "discord", "affiliation"],
  create: ["firstName", "lastName", "email", "discord", "portfolioLink"],
  spark: ["firstName", "lastName", "email", "discord", "pastProjects"],
  forge: ["firstName", "lastName", "email", "discord", "pastProjects"],
  das: ["firstName", "lastName", "email", "discord", "pastProjects"],
};

interface auth {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  POST: {};
  GET: {
    admins: string[];
  };
  PUT: {
    admins: string[];
  };
  DELETE: {
    admins: string[];
  };
}

export const AUTH: auth = {
  POST: {},
  GET: {
    admins: ["1"],
  },
  PUT: {
    admins: ["1"],
  },
  DELETE: {
    admins: ["1"],
  },
};
