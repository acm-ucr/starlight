import Navigation from "./navigation";

type props = {
  children: React.ReactNode;
};
const Protected = ({ children }: props) => {
  return (
    <div className="flex h-screen">
      <Navigation />
      <div className="w-5/6">{children}</div>
    </div>
  );
};

export default Protected;
