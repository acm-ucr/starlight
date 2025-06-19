"use client";
import Error from "@/components/error";

interface ErrorProps {
  error: Error;
}

const InternalError = ({ error }: ErrorProps) => {
  let parsed = {
    code: 90205,
    name: error.name,
    message: error.message,
    dev: undefined as string | undefined,
  };

  parsed = JSON.parse(error.message);

  return (
    <Error
      code={parsed.code}
      name={parsed.name}
      message={parsed.message}
      dev={parsed.dev}
    />
  );
};

export default InternalError;
