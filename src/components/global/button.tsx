interface props {
  children: React.ReactNode;
}

const Button = ({ children }: props) => {
  return <div className="bg-starlight-blue text-white">{children}</div>;
};

export default Button;
