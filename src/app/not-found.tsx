"use client";
import Error from "@/components/error";

const NotFoundError = () => {
  return (
    <Error
      code={404}
      name="Page Not Found"
      message="The page you are looking for does not seem to exist."
    />
  );
};

export default NotFoundError;
