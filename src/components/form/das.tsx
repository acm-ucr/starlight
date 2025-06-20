"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/das";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/das";
import { submit } from "@/utils/form";
import DASLogo from "@/public/logos/das.svg";

const DAS = () => {
  const { data: session } = useSession();

  const [das, setDas] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "das",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    console.log("Submitting:", das);
    await submit({
      data: das,
      schema,
      url: "/api/placeholder/das",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={das}
      setObject={setDas}
      header="ACM DAS APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
      LOGO={DASLogo}
    />
  );
};

export default DAS;
