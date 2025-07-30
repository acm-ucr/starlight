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
    admin: string[];
  };
  PUT: {
    admin: string[];
  };
  DELETE: {
    admin: string[];
  };
}

export const AUTH: auth = {
  POST: {},
  GET: {
    admin: ["1"],
  },
  PUT: {
    admin: ["1"],
  },
  DELETE: {
    admin: ["1"],
  },
};
