type props = {
  children: React.ReactNode;
};

const Protected = ({ children }: props) => {
  return (
    <div className="flex h-screen flex-col">
      <div>{children}</div>
    </div>
  );
};

export default Protected;
