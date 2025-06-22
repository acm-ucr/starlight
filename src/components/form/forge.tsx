"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/forge";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/forge";
import { submit } from "@/utils/form";
import ForgeLogo from "@/public/logos/forge.svg";

const Forge = () => {
  const { data: session } = useSession();

  const [forge, setForge] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "forge",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    console.log("Submitting:", forge);
    await submit({
      data: forge,
      schema,
      url: "/api/dashboard/forge",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={forge}
      setObject={setForge}
      header="ACM FORGE APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
      LOGO={ForgeLogo}
    />
  );
};

export default Forge;
