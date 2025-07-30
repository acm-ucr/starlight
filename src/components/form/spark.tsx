"use client";

import { useState } from "react";
import Form from "@/components/form/form";
import { FIELDS, ATTRIBUTES } from "@/data/form/spark";
import { useSession } from "next-auth/react";
import { STATUSES } from "@/data/statuses";
import { schema } from "@/schemas/spark";
import { submit } from "@/utils/form";
import SparkLogo from "@/public/logos/spark.svg";

const Spark = () => {
  const { data: session } = useSession();

  const [spark, setSpark] = useState({
    ...ATTRIBUTES,
    firstName: session?.user.firstName || "",
    lastName: session?.user.lastName || "",
    email: session?.user.email || "",
    roles: session?.user.roles || {},
    form: "spark",
    team: "undefined",
  });

  if (!session?.user) return null;

  const onSubmit = async (
    setLoading: (value: boolean) => void,
    setState: (value: number) => void,
  ) => {
    console.log("Submitting:", spark);
    await submit({
      data: spark,
      schema,
      url: "/api/dashboard/spark",
      setLoading,
      setState,
    });
  };
  return (
    <Form
      fields={FIELDS}
      object={spark}
      setObject={setSpark}
      header="ACM SPARK APPLICATION"
      onSubmit={onSubmit}
      statuses={STATUSES}
      LOGO={SparkLogo}
    />
  );
};

export default Spark;
