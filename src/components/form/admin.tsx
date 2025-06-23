"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/admin";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/admin";
import { submit } from "@/utils/form";
import StarlightLogo from "@/public/logos/starlight.svg";

const Admin = () => {
  const { data: session } = useSession();

  const [admin, setAdmin] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "admin",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    console.log("Submitting:", admin);
    await submit({
      data: admin,
      schema,
      url: "/api/dashboard/admin",
      setLoading,
      setState,
    });
  };

  return (
    <Form
      fields={FIELDS}
      object={admin}
      setObject={setAdmin}
      header="ADMIN PORTAL REQUEST"
      onSubmit={onSubmit}
      statuses={STATUSES}
      LOGO={StarlightLogo}
    />
  );
};

export default Admin;
