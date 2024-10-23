type props = {
  children: React.ReactNode;
};

const Protected = ({ children }: props) => {
  return (
    <div className="flex h-screen flex-col">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default Protected;
