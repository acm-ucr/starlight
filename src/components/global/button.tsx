interface props {
  children: React.ReactNode;
}

const Button = ({ children }: props) => {
  return (
    <div className="rounded-sm bg-starlight-blue text-center text-white">
      {children}
    </div>
  );
};

export default Button;
