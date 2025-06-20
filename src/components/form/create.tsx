"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/create";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/create";
import { submit } from "@/utils/form";
import CreateLogo from "@/public/logos/create.svg";

const Create = () => {
  const { data: session } = useSession();

  const [create, setCreate] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "create",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    console.log("Submitting:", create);
    await submit({
      data: create,
      schema,
      url: "/api/placeholder/create",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={create}
      setObject={setCreate}
      header="ACM CREATE APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
      LOGO={CreateLogo}
    />
  );
};

export default Create;
