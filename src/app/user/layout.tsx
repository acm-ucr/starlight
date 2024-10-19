import Navigation from "@/components/global/navigation";

interface props {
  children: React.ReactElement;
}

const Layout = ({ children }: props) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
