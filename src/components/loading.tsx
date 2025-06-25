import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-starlight-blue-primary text-3xl font-bold">
        Loading...
      </p>
      <Loader className="text-starlight-blue-primary animate-spin" />
    </div>
  );
};

export default Loading;
